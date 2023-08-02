/* Unit testing for the Input component */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Input from './Input';

test('Initial conditions of an Input', () => {
      render(
            <Input 
                name="nom" 
                formTools={{ 
                    formState: { 
                        inputs: { "nom": {value:"", isValid: true, isTouched: false}},
                        isValid: true
                    },
                    inputHandler: () => {},
                    inputTouched: false
                }} 
                validationRules={[]}
                className=""
                label="Label"
            />
       );
  
       //Make sure the
       const container = screen.getByTestId('field-container')
       expect(container.classList.contains('control--invalid')).toBe(false)
});

test("Input styling ajust on focus", async () => {
    //Find the user object
    const user = userEvent.setup();

    render(
        <Input 
            name="nom" 
            formTools={{ 
                formState: { 
                    inputs: { "nom": {value:"", isValid: true}},
                    isValid: true
                },
                inputHandler: () => {},
                inputTouched: false
            }} 
            validationRules={[]}
            className=""
            label="Label"
        />
   );

})


  
  
  
  
  
  