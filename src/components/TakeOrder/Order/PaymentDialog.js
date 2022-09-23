import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import LoadingButton from '@mui/lab/LoadingButton';


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { borderRadius, padding } from '@mui/system';

import { useSelector, useDispatch } from 'react-redux'
import { selectDetail, selectNetTotal, clearOrder } from "features/order/orderSlice";


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
    setInterval(() => {
      setCountDown((countDown) => countDown -= 1);
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

const PaymentDialog = () => {
  const dispatch = useDispatch()
  const orderNetTotal = useSelector(selectNetTotal);
  const orderDetails = useSelector(selectDetail);
  const [open, setOpen] = React.useState(false);
  const [payment, setPayment] = React.useState(null);

  const handleClickPayment = (event,value) => {
    setPayment(value)
  };

  const handleClickOpen = () => {
    if(orderNetTotal <= 0) return false;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePaymentSuccess = async () => {
    dispatch(clearOrder());
    setPayment(null);
    const response = await fetch(`api/print?details=${JSON.stringify(orderDetails)}&total=${orderNetTotal}&payment=${payment}`);
    setOpen(false);
    
  }

  return (
    <div>
      <SoftButton variant="contained" color={'warning'} size="large" sx={{width:"100%"}} className="fontKanit"
        onClick={handleClickOpen}
      >
                ชำระเงิน
      </SoftButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={'lg'}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <SoftTypography variant="h2" fontWeight="bold" textTransform="capitalize" className="fontKanit">
              การชำระเงิน
          </SoftTypography>
          <SoftBox borderRadius="md" display="inline-block" bgColor="primary" px={1} mt={1}>
              <SoftTypography variant="h2" fontWeight="bold" textTransform="capitalize" color="white">
              ฿ {orderNetTotal}
              </SoftTypography>
          </SoftBox>
          
        </BootstrapDialogTitle>
        <DialogContent >
            <SoftBox pt={4} pb={4} px={2}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item md={4}>
                        <Card 
                          sx={{
                            height:'120px', 
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
                                    เงินสด
                                </SoftTypography>
                            </SoftBox>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card 
                          sx={{
                            height:'120px', 
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
                            height:'120px', 
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
            <SoftBox position="relative" height="280px" px={2}>
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
              ? <Button autoFocus onClick={handlePaymentSuccess}>ชำระเงินสำเร็จ</Button>
              : <LoadingButton loading variant="text">ชำระเงินสำเร็จ</LoadingButton>
          }
          

        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

PaymentDialog.displayName = 'PaymentDialog'

export default PaymentDialog;
