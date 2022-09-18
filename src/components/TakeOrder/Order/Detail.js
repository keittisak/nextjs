import React from "react";
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";
import Grid from "@mui/material/Grid";

import { useSelector, useDispatch } from 'react-redux'
import { removeDetail } from "features/order/orderSlice";

const Detail = (prop) => {
    const { name, price, quantity, image } = prop.item;
    const dispatch = useDispatch()

    return (
        <SoftBox
            component="li"
            display="flex"
            alignItems="center"
            bgColor="grey-100"
            borderRadius="lg"
            p={2}
            mb={0.5}
            mt={2}
            // sx={{height:"80px", overflowY:"hidden"}}
            >
            <SoftBox mr={2}>
                <SoftAvatar src={ image ?? `/images/food-default.png`} alt="" variant="rounded" shadow="xl" size="lg" 
                    sx={{
                        height:"100%",
                        // width: "100%",
                    }} 
                />
            </SoftBox>
            <SoftBox width="100%">
                <Grid container>
                    
                    <Grid item xs={12} md={5} textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="center"
                    >
                    <SoftTypography variant="button" fontWeight="bold" className="fontKanit" textAlign="left">
                        {name}
                    </SoftTypography>
                    <SoftTypography  variant="button" color={'success'} fontWeight="bold" textGradient>
                        + {price*quantity}
                    </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={5} textAlign="center">
                    <SoftTypography variant="button" fontWeight="bold">
                        {quantity}
                    </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={2} textAlign="right">
                    <SoftButton 
                        variant="gradient" 
                        color={'error'} 
                        size="small" 
                        iconOnly 
                        circular
                        onClick={() => {dispatch(removeDetail({name,total:price*quantity}))}}
                    >
                        <Icon>delete</Icon>
                    </SoftButton>
                    </Grid>
                </Grid>
            </SoftBox>
        </SoftBox>
    )
}

export default Detail;