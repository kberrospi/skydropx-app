import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Shipments, ShipmentSend, ShipmentState } from '../../interface';
import { skydropxApi } from '../../pages/api';

const initialState: ShipmentState = {
  data: {
    data:{},
    included: []
  },
  status: 'idle',
  error: null
}

const newShipment = createAsyncThunk(
  'shipments/postShipment',
  async (datos: ShipmentSend) => {
    const { data } = await skydropxApi.post<Shipments>('/shipments', datos);
      return data
  }
)

const shipmentSlice = createSlice({
  name:'shipments',
  initialState,
  reducers:{
    getShipment: (state, action: PayloadAction<Shipments>) => {
      state.status = 'idle'
      state.data = action.payload
    },

    reset: () => initialState
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(newShipment.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(newShipment.fulfilled, (state, action) => {

        state.status = 'succeeded'
        state.data = action.payload
        
      })
  },
});

const { actions, reducer } = shipmentSlice

export default {
  reducer,
  actions,
  newShipment
}