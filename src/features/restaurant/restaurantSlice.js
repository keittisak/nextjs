import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions
export const selectRestaurant =  (state) => state.restaurant.value

export default restaurantSlice.reducer