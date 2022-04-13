import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import { Formulario } from '../src/components/ui';
import store from '../src/redux/store';
import "@testing-library/jest-dom";
import { Provider } from 'react-redux';
import { handleSubmit } from '../src/utils';



const state = store.getState()
store.dispatch = jest.fn();

/* jest.mock( '../src/utils', ()=> {
  handleSubmit: jest.fn()
} ) */

describe('Test en formulario', () => { 

  const wrapper = render(
    <Provider store={store}>
     <Formulario />
    </Provider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe mostrarse correctamente el formulario', async() => { 

    expect(wrapper).toMatchSnapshot()

   })

 /*  test('Debe llamar al submit', async() => { 

    fireEvent.click(wrapper.getByRole('button'))
    
   expect(handleSubmit).toHaveBeenCalledTimes(1)
  }) */

})