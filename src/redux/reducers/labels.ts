import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LabelSend, LabelState } from '../../interface';
import { skydropxApi } from '../../pages/api';
import { LabelsProps } from '../../interface/labels';


const initialState: LabelState = {
  data: {
    data:{}
  },
  status: 'idle',
  error: undefined
}

const newLabels = createAsyncThunk(
  'labels/postLabel',
  async (datos: LabelSend) => {
    const { data } = await skydropxApi.post<LabelsProps>('/labels', datos);
      return data
  }
);

const labelSlice = createSlice({
  name:'shipments',
  initialState,
  reducers:{
    resetLabel: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(newLabels.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(newLabels.fulfilled, (state, action) => {

        state.status = 'succeeded'
        state.data = action.payload
        
      })
      .addCase(newLabels.rejected, (state, action) => {
        state.status = 'failed',
        state.error = action.error.message
        //state.error = action.payload
        
      })
  },
});

const { actions, reducer } = labelSlice

export default {
  reducer,
  actions,
  newLabels
}