import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { labelSlice, shipmentSlice } from './reducers'

export function makeStore() {
  return configureStore({
    reducer: { 
      shipment: shipmentSlice.reducer,
      label: labelSlice.reducer
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store