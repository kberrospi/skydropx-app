import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Loading, Text, Grid } from '@nextui-org/react';
import { useForm } from '../../hooks/useForm';
import { formInit, handleSubmit, toServices } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import styles from '../../styles/Form.module.css';


export const Formulario: FC = () => {

  const [ values, handleInputChange, reset ]  = useForm(formInit);
  const { from, to, width, height, weight, length } = values;
  const { status: statusShipment, data: dataShipment } = useAppSelector((state) => state.shipment);
  const dispatch = useAppDispatch();
  const router = useRouter();
  

  useEffect(() => {

    if( statusShipment === 'succeeded' ){

      toServices(dataShipment, router)
    }
    
  }, [dataShipment])
  

  return (
    
    <form 
      className={ styles.form } 
      onSubmit={ (e) => handleSubmit(e, values, dispatch) }
    >
      <Text h4 className={styles['title-sections']}> Datos de envío:  </Text>
      <Grid className={ styles['section-shipping'] } >
        <Input 
          className={ styles.input } 
          placeholder='Codigo postal Origen'
          label='Origen:'
          type='text'
          name='from'
          value={from}
          onChange={ handleInputChange }
        />
        <Input 
          className={ styles.input } 
          placeholder='Código postal Destino'
          label='Destino:'
          type='text'
          name='to'
          value={ to }
          onChange={ handleInputChange }
        />
      </Grid>

      <Text h4 className={styles['title-sections']}> Dimensiones del paquete: </Text>
      <Grid className={styles['section-package']} >
        <Input 
          className={ styles['input-container']}
          label='Largo'
          placeholder="Largo(CM)" 
          type='number' 
          name='length'
          value={ length || '' }
          onChange={ handleInputChange }
        />
        <Input  
          label='Ancho'
          placeholder="Ancho(CM)"  
          type='number'
          name='width'
          value={ width || '' }
          onChange={ handleInputChange }
        />
        <Input 
          label='Alto'
          placeholder="Alto(CM)" 
          type='number'
          name='height'
          value={ height || '' }
          onChange={ handleInputChange }
        />
        <Input 
          label='Peso'
          placeholder="Peso(KG)" 
          type='number' 
          name='weight'
          value={ weight || '' }
          onChange={ handleInputChange }
        />
      </Grid>
      <Button 
        className={ statusShipment === 'loading' ? '' : styles.button } 
        shadow 
        type='submit'  
        auto
        disabled={ statusShipment === 'loading' }
        
      > 
        { statusShipment === 'loading' 
          ? <Loading  color="currentColor" size="sm" />
          : 'Continuar'
        }
      
      </Button>
    </form>
   
  )
}
