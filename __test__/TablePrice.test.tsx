import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { TablePrice } from '../src/components/ui/TablePrice';
import { offer } from "./utils/dataOffers";
import { creatingLabel } from "../src/utils";


const state = store.getState();
store.dispatch = jest.fn();


jest.mock( '../src/utils', ()=> {
  creatingLabel: jest.fn()
} )

describe('Pruebas en TablePrice', () => { 

  const wrapper = render(
    <Provider store={store}>
     <TablePrice offers={ offer } />
    </Provider>
  )

  test('Debe renderiza la tabla correctamente', () => { 
    expect(wrapper).toMatchSnapshot()
  })

  /* test('Debe llamar el metodo creatingLabel', () => { 
    fireEvent.click(wrapper.getByRole('button'))
    expect(creatingLabel).toHaveBeenCalledTimes(1)
  }) */

})