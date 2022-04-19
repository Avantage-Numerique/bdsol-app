
//Custom hook
import { useForm } from '../../../../../app/hooks/form-hook'

//Components
import Button from '../../../../../app/common/FormElements/Buttons/Button/Button'
import Input from '../../../../../app/common/FormElements/Input/Input'
import Textarea from '../../../../../app/common/FormElements/Textarea/Textarea'

//Form validators
import {VALIDATOR_REQUIRE} from '../../../../../app/utils/validators'

import styles from './CreatePersonForm.module.scss'

const CreatePersonForm = () => {

    //Custom hook to manage the validity of the form 
    const [formState, inputHandler] = useForm(
        {
        firstName: {
            value: '',
            isValid: false
        },
        lastName: {
            value: '',
            isValid: false
        }, 
        nickName: {
            value: '',
            isValid: false
        }, 
        biography: {
            value: '',
            isValid: true
        }

    }, 
    false)

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();
        console.log(formState)

    }

    return (
        <form onSubmit={submitHandler} className={`col-12 ${styles["create-person-form"]}`}>
            <Input 
                id="firstName"
                name="firstName"
                label="Prénom"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Cette information est requise"
                onInput={inputHandler}
            />
            <Input 
                id="lastName"
                name="lastName"
                label="Nom"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Cette information est requise"
                onInput={inputHandler}
            />
            <Input 
                id="nickName"
                name="nickName"
                label="Surnom"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Cette information est requise"
                onInput={inputHandler}
            />
            <Textarea 
                id="biography"
                name="biography"
                label="Biographie"
                errorText="Cette information est requise"
                validators={[]}
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
        </form>
    )
}

export default CreatePersonForm