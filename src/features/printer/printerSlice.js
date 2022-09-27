import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  client: null,
  server: null,
}

export const printerSlice = createSlice({
  name: 'printer',
  initialState,
  reducers: {
    setPrinterClient: (state, action) => {
      state.client = action.payload
    },
    setPrinterServer: (state, action) => {
      state.server = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPrinterClient, setPrinterServer  } = printerSlice.actions
export const selectPrinterClient =  (state) => state.printer.client
export const selectPrinterServer =  (state) => state.printer.server

export default printerSlice.reducer