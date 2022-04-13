import { NextPage } from 'next'
import { useEffect } from 'react'
import { Layout } from '../components/layouts'
import { Formulario } from '../components/ui'
import { useAppDispatch } from '../redux/hook'
import { labelSlice, shipmentSlice } from '../redux/reducers'


const HomePage: NextPage = () => {

  const dispatch = useAppDispatch()
  const { reset } = shipmentSlice.actions
  const { resetLabel } = labelSlice.actions

  useEffect(() => {
    dispatch( reset() )
    dispatch( resetLabel() )
  }, [])
  

  return (
    <Layout title='Bienvenido a Skydropx'>
      <Formulario/>
    </Layout>
  )
}

export default HomePage
