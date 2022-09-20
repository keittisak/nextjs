// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import SoftBox from "components/SoftBox";

import Layout from "./Layout";
import Order from "./Order";
import Product from "./Product";
import RestaurantComponent from "./Restaurant";

//Data
import productListData from "components/TakeOrder/data/productListData";

import { useSelector, useDispatch } from 'react-redux'
import { selectRestaurant } from "features/restaurant/restaurantSlice";

const TakeOrder = () => {
    const dispatch = useDispatch()
    const restaurant = useSelector(selectRestaurant);

    return (
      <Layout>

          <Grid container spacing={1} height="100%">
            <Grid item md={4} height='100%' overflow={'hidden'}>
              <Order/>
            </Grid>
            <Grid item md={8} height='100%' pb={5} overflow={'hidden'}>
              <RestaurantComponent/>
              <SoftBox px={2} pb={5} sx={{
                height:'100%',
                overflow: 'auto',
                // overflowY: 'scroll'
              }}>
                <Grid container spacing={3}>
                  { productListData[restaurant]['products'].map((item,idx) => {
                    return (
                      <Grid item md={3} key={idx}>
                        <Product name={item.name} price={item.price} image={item.image} />
                      </Grid>
                    );
                  })}
                </Grid>
              </SoftBox>
            </Grid>
          </Grid>

      </Layout>
    );
}

export default TakeOrder;