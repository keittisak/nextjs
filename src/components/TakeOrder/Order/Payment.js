import React from "react";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

import PaymentDialog from "./PaymentDialog";

import { useSelector } from 'react-redux'
import { selectTotal } from "features/order/orderSlice";

const Payment = ({device}) => {
    const orderTotal = useSelector(selectTotal);
    
    return (
        <SoftBox
            // display="flex"
            // justifyContent="space-between"
            alignItems="center"
            style={{margin:'20px auto'}}
            >
            <PaymentDialog device={device} />
        </SoftBox>
    )
}

export default Payment;