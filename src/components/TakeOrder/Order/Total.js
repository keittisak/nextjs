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
                mb={1.5}
            >
                <SoftTypography variant="button" color="text" fontWeight="medium">
                    Subtotal
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                {orderTotal}
                </SoftTypography>

            </SoftBox>
            <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <SoftTypography variant="button" color="text" fontWeight="medium">
                    Tax (7%)
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                    {orderVat}
                </SoftTypography>

            </SoftBox>
            <Divider />
            <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <SoftTypography variant="button" color="dark" fontWeight="medium">
                    Total
                </SoftTypography>
                <SoftTypography variant="button" color="dark" fontWeight="bold">
                    {orderNetTotal}
                </SoftTypography>
            </SoftBox>
        </>
    )
}

export default Total;