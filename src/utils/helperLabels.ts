import Swal from 'sweetalert2';
import { LabelsProps } from '../interface';
import { labelSlice } from '../redux/reducers';
import { AppDispatch } from '../redux/store';
import { propsPopup } from './helperForm';
import { NextRouter } from 'next/router';

export const msgError = (msg: string | undefined) => (
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: `${msg}. Por favor intenta con otro servicio`,
    ...propsPopup
  })
)

export const creatingLabel = async( idRate: number, dispatch: AppDispatch ) => {

  const { newLabels } = labelSlice
  if(!idRate){
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor selecciona algun servicio para continuar ',
      ...propsPopup
    })
  }

  Swal.fire({
    text: "Deseas hacer el envío con este servicio ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#5333EA',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText:'No',
    ...propsPopup
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch( newLabels({ rate_id: idRate, label_format:'pdf' }) );
    }
  })

}

export const createLabel = (data: LabelsProps, router: NextRouter) => {

  if( data.data?.attributes?.error_message?.[0] ){
    let msg = data.data?.attributes.error_message?.[0].message;
    if( msg = 'ERROR EN EJECUCIÓN DEL SERVICIO WEB') msg='Error al crear la solicitud'
    return msgError(msg)
  }

  window.open( data.data?.attributes?.label_url, '_blank');
  router.push('/')

}