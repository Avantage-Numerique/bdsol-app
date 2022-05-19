import { fireEvent, render, screen } from '@testing-library/react'
import CreateOrganisationForm from './CreateOrganisationForm'
import '@testing-library/jest-dom'
import { interpolateAs } from 'next/dist/shared/lib/router/router'
import { act } from 'react-dom/test-utils'
/*
test('Behavior of the organisation creation form.', () => {

    render(<CreateOrganisationForm />)

    const namefield = screen.getByRole('textarea', { name: 'description'})

    
   // it('renders a heading', () => {
   //     render(<CreateOrganisationForm />)
    

   //   })
})*/

describe("CreateOrganisationForm", () => {

    describe("With valid inputs", () => {

        it('calls the onSubmit function', async () => {
            const mockOnSubmit = jest.fn()
            const { getByLabelText, getByRole } = render( <CreateOrganisationForm onSubmit={ mockOnSubmit }/>)

            await act(async () => {
                fireEvent.change(getByLabelText("Nom de l'organisation"), {target: {value: 'Ceci est un nom d\'organisation'}})
                fireEvent.change(getByLabelText("Hyperlien"), {target: {value: 'https://www.google.ca/?hl=fr'}})
                fireEvent.change(getByLabelText("Information de contact"), {target: {value: 'Ceci est une information de contact'}})
            })

            await act(async () => {
                fireEvent.click(getByRole("button"))
            })

            expect(mockOnSubmit).toHaveBeenCalled()
        })

    })

})