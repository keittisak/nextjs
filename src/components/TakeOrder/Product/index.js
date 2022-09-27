import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";

import { useSelector, useDispatch } from 'react-redux'
import { addDetail, selectDetail } from "features/order/orderSlice";

function Product({name, price, image}) {
  const dispatch = useDispatch()

  return (
    <Card onClick={() => { dispatch(addDetail({name, price, image})) }}>
     <SoftBox position="relative" p={2} pb={1} display="flex" justifyContent="center">
        <CardMedia
          src={ image ?? `/images/food-default.png`}
          component="img"
          sx={{
            maxWidth: "100%",
            height: "100px",
            margin: 0,
            // boxShadow: ({ boxShadows: { md } }) => md,
            // objectFit: "cover",
            // objectPosition: "center",
          }}
        />
     </SoftBox>
     <SoftBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <SoftTypography variant="h6" fontWeight="bold" textTransform="capitalize" className="fontKanit">
            {name}
        </SoftTypography>
        {/* <Divider style={{margin:'8px 0'}} /> */}
        <SoftTypography variant="h5" color={'success'} fontWeight="bold" textGradient>
            {price}
        </SoftTypography>
     </SoftBox>
     
      
    </Card>
  );
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
};

export default Product;
