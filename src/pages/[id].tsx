import { GetServerSideProps } from 'next'
import { NextPage } from 'next';
import { skydropxApi } from './api';
import { TablePrice } from '../components/ui';
import { Layout } from '../components/layouts';
import { Included, Shipments, ShipmentsData } from '../interface';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { createLabel, msgError } from '../utils';
import { shipmentSlice } from '../redux/reducers';
import { useRouter } from 'next/router';


interface Props {
  offers: Included[]
  shipment: Shipments
}

const ServicesPage: NextPage<Props>  = ({ offers, shipment }) => {

  const { getShipment } = shipmentSlice.actions
  const { status, data } = useAppSelector((state) => state.label);
  const dispatch = useAppDispatch();
  const router = useRouter()

  useEffect(() => {

    if( status === 'succeeded' ){
      createLabel(data, router)
    }

    if ( status === 'failed' ){
      msgError('Hubo un error al intentar crear la guia')
    }
    
  }, [status])

  useEffect( () => {
    dispatch( getShipment(shipment) )
  }, [shipment])
  
  

  return (
    <Layout title='Shipment Skydropx' >
      <TablePrice offers={ offers } />
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string }
  const { data } = await  skydropxApi.get<Shipments>(`/shipments/${ id }`)

  const offers = data.included?.filter( shipment  =>  
    shipment.type !== 'parcels' && 
    shipment.type !== 'addresses' && 
    shipment.type !== 'labels'
  ).sort((a, b) => parseInt(a.attributes.total_pricing+'') - parseInt(b.attributes.total_pricing+''));
  

  if( offers ){
    offers[0].attributes.cheaper = true
  }
  
  return {
    props: {
      offers,
      shipment: data
    }
  }
}

export default ServicesPage