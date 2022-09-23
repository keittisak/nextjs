// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

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
import { useCallback, useEffect, useState } from "react";

const Restaurant = () => {
    const restaurant = useSelector(selectRestaurant);
    const dispatch = useDispatch()
    const handleSetTabValue = (event, newValue) => dispatch(setRestaurant(newValue));
    const [devices, setDevice] = useState([]);

    const [fullscreen, setFullScreen] = useState(false);

    const openFullscreen = () => {
        setFullScreen(!fullscreen);
        const elem = document.documentElement;
        if( !fullscreen ){
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
        }else{
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }

    }

    const fetchDevice = useCallback(async () => {
        const response = await fetch('/api/get-printer');
        const json = await response.json();
        setDevice(json);
    },[]);

    useEffect(() => {
        fetchDevice();
    },[fetchDevice])
    
    return (
        <SoftBox py={2} px={2}>
            <Grid container spacing={3} alignItems="center">
                <Grid item md={6}>
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
                <Grid item md={6}>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                        <SoftTypography variant="button" color="text">*device: {devices.length}</SoftTypography>
                        <SoftButton iconOnly circular size="large" color="dark" variant="text"
                            onClick={openFullscreen}
                        >
                            <Icon>{fullscreen ? 'fullscreen_exit' : 'fullscreen'}</Icon>
                        </SoftButton>
                    </SoftBox>
                    
                </Grid>
            </Grid>
        </SoftBox>
    )
}

export default Restaurant;