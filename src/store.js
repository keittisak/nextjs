import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import restaurantSlice from 'features/restaurant/restaurantSlice';
import orderSlice from 'features/order/orderSlice';
import printerSlice from 'features/printer/printerSlice';

export const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    order: orderSlice,
    printer: printerSlice
  },
})