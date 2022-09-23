import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  details: [],
  total: 0,
  vat: 0,
  netTotal: 0,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addDetail: (state, action) => {
        let quantity = 1;
        const itemIdx = state.details.findIndex(item => item.name === action.payload.name);
        if( itemIdx >= 0 ){
            state.details[itemIdx].quantity += 1;
        }else{
            state.details = [...state.details, {...action.payload, ...{quantity:quantity}}]
        }    
        state.total += action.payload.price;
        // state.vat = parseFloat(((state.total * 7)/107).toFixed(2));
        state.netTotal = parseFloat((state.total+state.vat).toFixed(2));

    },
    removeDetail: (state, action) => {
        const details = state.details;
        const itemIdx = state.details.findIndex(item => item.name == action.payload.name);
        const quantity = details[itemIdx].quantity;
        const price = details[itemIdx].price;
        if( quantity > 1 ){
          details[itemIdx].quantity -= 1;
        }else{
          details.splice(itemIdx,1);
        }
        // state.details = details;
        state.total -= price;
        // state.vat = parseFloat(((state.total * 7)/107).toFixed(2));
        state.netTotal = parseFloat((state.total+state.vat).toFixed(2));
    },
    clearOrder: (state) => {
      state.details = []
      state.total = 0
      state.vat = 0
      state.netTotal = 0
    }
  },
})



// Action creators are generated for each case reducer function
export const { addDetail, removeDetail, clearOrder } = orderSlice.actions
export const selectDetail = (state) => state.order.details
export const selectTotal = (state) => state.order.total
export const selectVat = (state) => state.order.vat
export const selectNetTotal = (state) => state.order.netTotal

export default orderSlice.reducer