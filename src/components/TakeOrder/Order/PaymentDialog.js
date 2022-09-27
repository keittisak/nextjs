import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import LoadingButton from '@mui/lab/LoadingButton';


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

import { useSelector, useDispatch } from 'react-redux'
import { selectDetail, selectNetTotal, clearOrder } from "features/order/orderSlice";
import { EscPos } from '@tillpos/xml-escpos-helper';
import { getBorderCharacters, table } from 'table';
import { resolve } from 'styled-jsx/css';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  const [countDown, setCountDown] = React.useState(180);

  React.useEffect(()=>{
    let counter = countDown;
    const interval = setInterval(() => {
      counter -= 1;
      setCountDown(counter);
      if( counter == 0){
        clearInterval(interval);
      }
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <SoftBox
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'red',
            borderRadius: 0,
            borderBottomLeftRadius: '1rem',
            padding: '1rem',
          }}
          style={{
            width:'110px',
            height:'65px',
            color:'white',
            fontSize:'1.5rem'
          }}
        >
          <SoftTypography variant="h4" fontWeight="medium" textTransform="capitalize" color="white" mr={0.5} sx={{display:'inline-block'}}>
            {countDown}
          </SoftTypography>
          <CloseIcon />
        </SoftBox>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const PaymentDialog = ({device}) => {
  const dispatch = useDispatch()
  const orderNetTotal = useSelector(selectNetTotal);
  const orderDetails = useSelector(selectDetail);
  const [open, setOpen] = React.useState(false);
  const [payment, setPayment] = React.useState(null);

  const handleClickPayment = (event, value) => setPayment(value);

  const handleClickOpen = () => {
    if(orderNetTotal <= 0) return false;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handlePaymentSuccess = async () => {
    handelPrint();
    setOpen(false);
    dispatch(clearOrder());
    setPayment(null);
  }

  const handelPrint = async () => {
    const d = new Date();
    const template =  `<?xml version="1.0" encoding="UTF-8"?>
      <document>
        <align mode="center">
          <bold>
            <text-line size="1:0">{{title}}</text-line>
          </bold>
        </align>  
        <line-feed />
        <align mode="center">
          <text-line size="0:0">  {{{tax}}}</text-line>
          <text-line size="0:0">  {{{phone}}}</text-line>
        </align>
        <line-feed />
        <align mode="center">
          <text-line>{{tableData}}</text-line>
        </align>
        <line-feed/>
        <align mode="center">
          <text-line>{{tableSumary}}</text-line>
        </align>
        <line-feed/>
        <paper-cut/>
      </document>`;
      const tableData = await setTableData();
      const tableSumary = await setTableSumary();
      const input = {
        title:'Food Take Home',
        phone:'Tel: 0123456789',
        tax:'POS#001 TAX#'+d.getTime(),
        thankyouNote: '',
        tableData,
        tableSumary
      };

      const buffer = EscPos.getBufferFromTemplate(template, input);
      if( device == null){ alert('Not connect printer device!'); return null; }
      device.transferOut(1, buffer).catch(error => { console.log(error) })
  }

  const setTableSumary = () => {
    let paymentElement = 'Cash';
      if( payment == 'truemoney'){
          paymentElement = 'Truemoney Wallet'
      }else if( payment == 'prompay'){
          paymentElement = 'Prompt Pay'
      }
    const versions = [
      ['Total', parseFloat(orderNetTotal).toFixed(2)],
      [paymentElement, parseFloat(orderNetTotal).toFixed(2)]
    ]
    const data = table(versions, {
      columnDefault: {
        width: 30
      },
      columns:{
        0: {
          width: 20,
          alignment: 'left'
        },
        1: {
            width: 10,
            alignment: 'right'
        },
      },
      border: getBorderCharacters(`void`),
      drawHorizontalLine: () => {
        return false;
      },
    });
    return data;
  }

  const setTableData = async () => {
    const versions = orderDetails.map(item => {
      return [item.quantity, item.name, parseFloat(item.price*item.quantity).toFixed(2)]
    });
    const data = table(versions, {
      border: getBorderCharacters(`void`),
      columnDefault: {
        width: 80
      },
      columns:{
        0: {
          width: 1,
          alignment: 'left'
        },
        1: {
            width: 30,
            alignment: 'center'
        },
        2: {
            width: 10,
            alignment: 'right'
        },
      },
      drawHorizontalLine: () => {
        return false;
      },
    });
    return data;
  }

  return (
    <div>
      <SoftButton variant="contained" color={'success'} size="large" sx={{width:"100%",fontSize:'1.5rem'}} className="fontKanit"
        onClick={handleClickOpen}
      >
                PAY {parseFloat(orderNetTotal).toFixed(2)}
      </SoftButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={'md'}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <SoftTypography variant="h2" fontWeight="bold" textTransform="capitalize" className="fontKanit" display="initial" mr={2}>
              Payment
          </SoftTypography>
          <SoftBox borderRadius="md" display="inline-block" bgColor="success" px={1} mt={1}>
              <SoftTypography variant="h2" fontWeight="bold" textTransform="capitalize" color="white">
              ฿ {orderNetTotal}
              </SoftTypography>
          </SoftBox>
          
        </BootstrapDialogTitle>
        <DialogContent >
            <SoftBox pt={4} pb={2} px={2}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item md={4}>
                        <Card 
                          sx={{
                            height:'100px', 
                            display:'flex', 
                            justifyContent:'center', 
                            alignItems:'center', border: "1px solid lavenderblush", borderRadius: "0.75rem"
                          }}
                          style={ (payment=='cash') ? {borderColor:"#cb0c9f", borderWidth:'medium'} : {} }
                          onClick={(e) => handleClickPayment(e,'cash')}
                          
                        >
                            <SoftBox p={2} mx={3} display="flex" justifyContent="center">
                                <SoftButton variant="contained" color={'warning'} size="medium" iconOnly circular>
                                    <SoftTypography variant="h6" fontWeight="bold" color="white" textTransform="capitalize">
                                        ฿
                                    </SoftTypography>
                                </SoftButton>
                            </SoftBox>
                            <SoftBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
                                <SoftTypography variant="h6" fontWeight="bold" textTransform="capitalize" className="fontKanit">
                                    Cash
                                </SoftTypography>
                            </SoftBox>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card 
                          sx={{
                            height:'100px', 
                            display:'flex', 
                            justifyContent:'center', 
                            alignItems:'center',border: "1px solid lavenderblush",borderRadius: "0.75rem" 
                          }}
                          style={ (payment=='truemoney') ? {borderColor:"#cb0c9f", borderWidth:'medium'} : {} }
                          onClick={(e) => handleClickPayment(e,'truemoney')}
                        >
                            <SoftBox p={2} mx={3} display="flex" justifyContent="center">
                            <CardMedia
                                    src="images/truemoney-wallet-logo.png"
                                    component="img"
                                    sx={{
                                        width: "100%",
                                        margin: 0,
                                        borderRadius:'0'
                                    }}
                                />
                            </SoftBox>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card 
                          sx={{
                            height:'100px', 
                            display:'flex', 
                            justifyContent:'center', 
                            alignItems:'center',
                            border: "1px solid lavenderblush",borderRadius: "0.75rem" 
                          }}
                          style={ (payment=='prompay') ? {borderColor:"#cb0c9f", borderWidth:'medium'} : {} }
                          onClick={(e) => handleClickPayment(e,'prompay')} 
                        >
                            <SoftBox p={2} mx={3} display="flex" justifyContent="center">
                                <CardMedia
                                    src="images/prompt-pay-logo.svg"
                                    component="img"
                                    sx={{
                                        width: "100%",
                                        margin: 0,
                                        borderRadius:'0'
                                    }}
                                />
                            </SoftBox>
                        </Card>
                    </Grid>
                </Grid>
            </SoftBox>
            <SoftBox position="relative" height="260px" px={2}>
                <SoftBox
                    display="flex"
                    height="100%"
                    py={2}
                    px={2}
                    borderRadius="lg"
                    bgColor="primary"
                    variant="gradient"
                    >
                        <Grid container spacing={2}>
                            <Grid item md={4}>
                                <SoftBox height="100%">
                                    <SoftTypography color="white" variant="h4" fontWeight="bold" textTransform="capitalize" className="fontKanit">
                                        { (payment == 'prompay') && 'พร้อมเพย์'}
                                        {(payment == 'truemoney') && 'ทรูมันนี่วอลเล็ท'}
                                        {(payment == 'cash') && 'ชำระเงินสด'}
                                    </SoftTypography>
                                    <SoftBox height="80%" mt={1} display="flex" alignItems="center" justifyContent="center"
                                        bgColor="white"
                                        borderRadius="md"
                                        style={
                                          (payment == 'cash' || payment == null) ? {display:'none'} : {}
                                        }
                                    >
                                        <CardMedia
                                            src="images/scan-qrcode.png"
                                            component="img"
                                            sx={{
                                                width: "100px",
                                                margin: 0,
                                                borderRadius:'0'
                                            }}
                                        />
                                    </SoftBox>
                                    
                                </SoftBox>
                            </Grid>
                            <Grid item md={8} className={ (payment == 'cash' || payment == null) ? 'd-none': ''}>
                                <SoftBox justifyContent="center" textAlign="center">
                                    <SoftTypography mb={1} color="white" variant="h5" fontWeight="bold" textTransform="capitalize" className="fontKanit">
                                        กรุณาสแกน QR code
                                    </SoftTypography>
                                    <CardMedia
                                        src="images/qrcode.jpg"
                                        component="img"
                                        sx={{
                                            width: "200px",
                                            margin: 0,
                                            borderRadius:'0',
                                            margin: "0 auto"
                                        }}
                                    />
                                </SoftBox>
                                
                            </Grid>
                        </Grid>
                </SoftBox>
            </SoftBox>
        </DialogContent>
        <DialogActions>
          {
            (orderNetTotal > 0)
              ? <Button autoFocus onClick={handlePaymentSuccess}>paymented</Button>
              : <LoadingButton loading variant="text">paymented</LoadingButton>
          }
          

        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

PaymentDialog.displayName = 'PaymentDialog'

export default PaymentDialog;
