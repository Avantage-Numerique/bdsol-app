/* Unit testing for the Input component */

import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
    it('Initial conditions of an Input', () => {
  
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
  
       const container = screen.getByTestId('field-container')
       expect(container.classList.contains('control--invalid')).toBe(false)
 
    });
  });

  
  
  
  
  
  