import React, { useEffect, useRef, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Detail from "./Detail";
import Total from "./Total";
import Payment from "./Payment";

import { useSelector, useDispatch } from 'react-redux';
import { selectDetail, selectTotal, selectVat, selectNetTotal } from "features/order/orderSlice";

import ScrollableFeed from 'react-scrollable-feed'

let device = null;


const Order = () => {
    const dispatch = useDispatch();
    const orderDetails = useSelector(selectDetail);
    const [screenWidth, setScreenWidth] = useState(800);

    const setup = (device) => {
        return device.open()
        .then(() => device.selectConfiguration(1))
        .then(() => device.claimInterface(0))
    }

    useEffect(() => {
        setScreenWidth(screen.width)
    },[]);
    
    const connectDeivce = () => {
        if (device == null) {
            navigator.usb.requestDevice({ filters: [{ vendorId: 0x1fc9 }] })
            .then(selectedDevice => {
                device = selectedDevice;
                return setup(selectedDevice);
            })
            .then(() => console.log(device))
            .catch(error => console.log(error))
        }
    }

    return (
        <Card style={{height:'100%'}}>
            <SoftBox pt={2} px={2} position="relative" height="100%" width="100%">
                <SoftBox mb={2}>
                    <SoftTypography variant="h6" fontWeight="medium" onClick={connectDeivce}>
                        Food Take Home
                    </SoftTypography>
                </SoftBox>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0} pb={1} height={(screenWidth > 1098) ? '82%': '78%'} overflow={'auto'}>
                    <ScrollableFeed>
                        {
                            orderDetails.map((item,idx) => {
                                return (
                                    <Detail item={item} key={idx} />
                                )
                            })
                        }
                    </ScrollableFeed>
                </SoftBox>
                <SoftBox mb={0.5} position="absolute" bottom="0" width="90%">
                    <Total/>
                    <Payment device={device}/>
                </SoftBox>
            </SoftBox>
        </Card>
    )
}

export default Order;