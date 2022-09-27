// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Divider from "@mui/material/Divider";


import { useSelector, useDispatch } from 'react-redux'
import { selectRestaurant } from "features/restaurant/restaurantSlice";
import { selectDetail, selectTotal, selectVat, selectNetTotal } from "features/order/orderSlice";

const Total = () => {
    const dispatch = useDispatch()
    const orderDetails = useSelector(selectDetail);
    const orderVat = useSelector(selectVat);
    const orderTotal = useSelector(selectTotal);
    const orderNetTotal = useSelector(selectNetTotal);
    const restaurant = useSelector(selectRestaurant);

    return (
        <>
            <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <SoftTypography variant="button" color="text" fontWeight="bold">
                    Subtotal
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                {parseFloat(orderTotal).toFixed(2)}
                </SoftTypography>

            </SoftBox>
            <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <SoftTypography variant="button" color="text" fontWeight="bold">
                    Vat
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                    {parseFloat(orderVat).toFixed(2)}
                </SoftTypography>

            </SoftBox>
            <Divider style={{margin:'.2rem'}} />
            <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <SoftTypography variant="button" color="dark" fontWeight="bold">
                    Total
                </SoftTypography>
                <SoftTypography variant="button" color="dark" fontWeight="bold">
                    {parseFloat(orderNetTotal).toFixed(2)}
                </SoftTypography>
            </SoftBox>
        </>
    )
}

export default Total;