import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice';
import restaurantSlice from 'features/restaurant/restaurantSlice';
import orderSlice from 'features/order/orderSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    restaurant: restaurantSlice,
    order: orderSlice
  },
})