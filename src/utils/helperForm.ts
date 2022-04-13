import { FormEvent } from 'react';
import { NextRouter } from 'next/router';
import { AppDispatch } from '../redux/store';
import { dataSendShipment } from './data-post';
import { shipmentSlice } from '../redux/reducers';
import { DataForm, Shipments } from '../interface';
import Swal from 'sweetalert2'

export const propsPopup = {
  width:'24rem',
  customClass:{
    popup:'popup-modal'
  }
}

export const validateEmpties = <T>(datos: T) => {

  const array = Object.values(datos)
  return array.includes('') || array.includes(0)

}

export const handleSubmit = async(
  e: FormEvent, 
  values: DataForm,  
  dispatch: AppDispatch, 
) =>{
  
  e.preventDefault();
  const isEmpty = validateEmpties(values);
  if( isEmpty ){ 
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor llena todos los campos',
      ...propsPopup
    })
  }
  
  const { newShipment } = shipmentSlice;
  const { from, to, ...parcelRest } = values
  const { address_from, address_to, parcels } = dataSendShipment;
  const { distance_unit, mass_unit } = parcels[0]

  parcelRest.height = parseInt(parcelRest.height+'')
  parcelRest.width = parseInt(parcelRest.width+'')
  parcelRest.length = parseInt(parcelRest.length+'')
  parcelRest.weight = parseInt(parcelRest.weight+'')

  const newParcel = {
    ...parcelRest,
    distance_unit, 
    mass_unit
  }

  address_from.zip = from;
  address_to.zip = to;
  parcels[0] = newParcel;

  dispatch(newShipment(dataSendShipment));

}

export const toServices = (data: Shipments, router: NextRouter) => {

  if( !data.data?.relationships?.rates.data.length){
    return Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: 'No tenemos servicios disponibles para esta zona o hubo en error al generar la solicitud, por favor intenta nuevamente',
      ...propsPopup
    })
  }

  router.push(`/${data.data?.id}`)
}

export const 
formInit = {
  from: '',
  to: '',
  weight:0,
  height:0,
  width:0,
  length:0
}