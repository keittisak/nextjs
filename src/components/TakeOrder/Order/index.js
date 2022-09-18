import React, { useEffect, useRef } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Detail from "./Detail";
import Total from "./Total";
import Payment from "./Payment";

import { useSelector, useDispatch } from 'react-redux';
import { selectDetail, selectTotal, selectVat, selectNetTotal } from "features/order/orderSlice";

import ScrollableFeed from 'react-scrollable-feed'


const Order = () => {
    const dispatch = useDispatch();
    const orderDetails = useSelector(selectDetail);

    return (
        <Card style={{height:'100%'}}>
            <SoftBox pt={2} px={2} position="relative" height="100%" width="100%">
                <SoftBox mb={0.5}>
                    <SoftTypography variant="h6" fontWeight="medium">
                        My Order
                    </SoftTypography>
                </SoftBox>
                <SoftBox>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                        Take out
                    </SoftTypography>
                </SoftBox>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0} pb={1} height='430px'>
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
                    <Payment/>
                </SoftBox>
            </SoftBox>
        </Card>
    )
}

export default Order;