import { useState, ChangeEvent } from 'react';
import { FormElement } from '@nextui-org/react';


export const useForm = <T>( initialState: T ) => {
    
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues( initialState );
  }


  const handleInputChange = (e: ChangeEvent<FormElement> ) => {
    setValues({
      ...values,
      [ e.target.name ]: e.target.value
    });

  }

  return [values, handleInputChange, reset] as const ;

}