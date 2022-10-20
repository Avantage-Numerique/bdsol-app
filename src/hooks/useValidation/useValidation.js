/*

    Custom hook to manage field validation
    V.P.R. - 18/10/2022

*/
import { useState, useEffect } from 'react'


const validators_settings = {
    REQUIRED: { 
        renderMessage: (() => "Ce champ est requis"),
        validationMethod: (value => value.trim().length > 0)
    },
    MIN_LENGTH: { 
        renderMessage: ((min = 5) => `Ce champ doit contenir au moins ${min} caractères`),
        validationMethod: ((value, min = 5) => value.trim().length >= min)
    },
    MAX_LENGTH: { 
        renderMessage: ((max = 15) => `Ce champ doit contenir un maximum de ${max} caractères`),
        validationMethod: ((value, max = 15) => value.trim().length <= max)
    },
    TYPE_EMAIL: { 
        renderMessage: (() => "Ce champ doit être une adresse courriel valide"),
        validationMethod: (value => /^\S+@\S+\.\S+$/.test(value))
    }
}

const TEMP = [
    {validator: "REQUIRED"},
    {validator: "MIN_LENGTH", specification: 4}
]

const initiateValidators = selectedRules => {

    //New object that will be passed has state for the field validater
    let newFieldValidators = {}

    //Loop through the list of possible validators
    for (const validatorName in validators_settings){
        //Try to identify a matching validator between the presets and the passed rules
        const matchingValidator = selectedRules.find(rule => rule.validator === validatorName)
        //If "matchingValidator" isn't undefined, then there's a match
        if(matchingValidator)
            //If there is a match, build the permanent validator object for this field
            newFieldValidators[validatorName] = {
                specification: matchingValidator.specification,
                message: validators_settings[validatorName].renderMessage((matchingValidator.specification && matchingValidator.specification)),
                validationMethod: validators_settings[validatorName].validationMethod,
                isValid: true
            }
    }

    //Return the object that will serve as state
    return newFieldValidators
}

export const useValidation = () => {

    const [validators, setValidators] = useState(initiateValidators(TEMP))

    useEffect(() => {
        console.log(validators)
    }, [validators])

    const validate = (value) => {

        //Evaluate the validity of the field => only positiv if every validation rules are respected
        let generalValidity = true

        //Evaluate the validity of every validators
        for(const validatorName in validators){
            //Reference to the specific validator 
            const validator = validators[validatorName]
            //For each, apply the validation method 
            const validationResult = validator.validationMethod(value, validator.specification)
            //Apply result to general validity variable
            if(!validationResult) generalValidity = false
            //Verify if there is a change of state
            if(validationResult !== validator.isValid)
                //If there is, update the state with the new validity
                setValidators(prev => ({
                    ...prev,
                    [validatorName]: {
                        ...prev[validatorName],
                        isValid: validationResult
                    }
                }))
        }

        return generalValidity
    }

    //Exports utilities
    return {
        validate
    }
}