// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// @mui icons
import LiquorIcon from '@mui/icons-material/Liquor';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Divider from "@mui/material/Divider";

import { useSelector, useDispatch } from 'react-redux'
import { selectRestaurant, setRestaurant } from "features/restaurant/restaurantSlice";

const Restaurant = () => {
    const restaurant = useSelector(selectRestaurant);
    const dispatch = useDispatch()
    const handleSetTabValue = (event, newValue) => dispatch(setRestaurant(newValue));
    
    return (
        <SoftBox py={2} px={2}>
            <Grid container spacing={3} alignItems="center">
            {/* <Grid item>
                <SoftBox height="100%" mt={0.5} lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                        SoftPOS
                    </SoftTypography>
              </SoftBox>
            </Grid> */}
            <Grid item>
                <AppBar position="static">
                <Tabs
                    orientation={'horizontal'}
                    value={restaurant}
                    onChange={handleSetTabValue}
                    sx={{ background: "transparent" }}
                >
                    <Tab className="fontKanit" label="ร้านอาหาร" icon={<RestaurantIcon />} style={{marginRight:'1rem', paddingRight:'1rem', paddingLeft:'1rem'}} />
                    <Tab className="fontKanit" label="ร้านเครื่องดื่ม" icon={<LiquorIcon />} style={{paddingRight:'1rem', paddingLeft:'1rem'}} />
                </Tabs>
                </AppBar>
            </Grid>
            </Grid>
        </SoftBox>
    )
}

export default Restaurant;