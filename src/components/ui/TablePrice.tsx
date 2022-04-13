import { FC, useState } from 'react';
import { Button, Grid, Loading, Table, Text, Tooltip } from '@nextui-org/react';
import { Included } from '../../interface';
import styles from '../../styles/TablePrice.module.css'
import { creatingLabel } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../redux/hook';


interface Props {
  offers: Included[]
}

export const TablePrice: FC<Props> = ({ offers }) => {

  const [offerSelected, setOfferSelected] = useState<number>(0);
  const { status: statusLabel, data: dataLabel } = useAppSelector((state) => state.label);
  const dispatch = useAppDispatch();

  /* Any por un error aparentemene de la libreria de nextUI */
  const rowSelected = (row: any ) =>{

    setOfferSelected( parseInt( row.currentKey ) )

  }

  return (

    <Grid className={ styles.container }>
      <Text h5 className={ styles['title-table'] }> 
        Elije el servicio de paqueteria que prefieras:  
      </Text>
      <Table 
        className={ styles.table }
        aria-label="tablePrice"
        selectionMode="single"
        onSelectionChange={ rowSelected }
      >
        <Table.Header>
          <Table.Column align='center' > Compañia </Table.Column>
          <Table.Column align='center' > Llega en </Table.Column>
          <Table.Column align='center' > Precio </Table.Column>
        </Table.Header>
        <Table.Body items={offers}  >
          {
            offers.map(( offer ) => (
              
              <Table.Row key={offer.id}  >
                <Table.Cell css={{ textAlign: 'center' }} >
                  <Text className={ styles.text }>
                    {offer.attributes.provider}
                  </Text>
                </Table.Cell>
                <Table.Cell css={{ textAlign: 'center' }} >
                  <Text className={ styles.text }>
                    {offer.attributes.days} días
                  </Text>
                </Table.Cell>
                <Table.Cell css={{ display:'flex', justifyContent:'center'}} >
                  {
                    offer.attributes.cheaper 
                    ?
                    <Tooltip content="Más económico" color='success'>
                      <Text b className={ styles.text && styles.cheaper } >
                        {`${offer.attributes.total_pricing} (${offer.attributes.currency_local}) `}  
                      </Text>
                    </Tooltip>
                    :
                    <Text b className={ styles.text } css={{ padding:'0.2rem 0.5rem' }} >
                      {`${offer.attributes.total_pricing} (${offer.attributes.currency_local}) `}  
                    </Text>
                  }
                </Table.Cell>
              </Table.Row>
              
            ))
          }
        </Table.Body>
      </Table>
      <Button 
        css={{ width:'100%', marginTop:'1rem' }}
        onClick={()=> creatingLabel(offerSelected, dispatch)} 
        shadow
        className={ statusLabel === 'loading' ? '' : styles.button }
        disabled={ statusLabel === 'loading' }
      > 
         { statusLabel === 'loading' 
          ? <Loading  color="currentColor" size="sm" />
          : 'Enviar'
        } 
      </Button>
    </Grid>
  )
}
