/*

    Custom hook to manage field validation
    V.P.R. - 18/10/2022

*/
import {useEffect, useState} from 'react'
import {lang} from "@/common/Data/GlobalConstants";

const isValuePositive = value => {
    //Make sure there is actually a value passed
    if(!value) return false
    //If the value is an array 
    if(Array.isArray(value)) return value.length > 0;
    //Everything else (for now), we convert it to string, trim it and compare
    return value.toString().trim().length > 0
}

const rules_settings = {
    REQUIRED: { 
        renderMessage: (() => "Ce champ est requis"),
        validationMethod: (value => isValuePositive(value)),
        renderBadge: (() => lang.badgeRequired)
    },
    MIN_LENGTH: { 
        renderMessage: ((min = 5) => `Ce champ doit contenir au moins ${min} caractères`),
        validationMethod: ((value, min = 5) => value.trim().length >= min),
        renderBadge: ((min = 5) => `Longueur min : ${min}`)
    },
    MAX_LENGTH: { 
        renderMessage: ((max = 15) => `Ce champ doit contenir un maximum de ${max} caractères`),
        validationMethod: ((value, max = 15) => value.trim().length <= max),
        renderBadge: ((max = 5) => `Longueur max : ${max}`)
    },
    MIN: { 
        renderMessage: ((min = 5) => `Ce champ ne doit pas contenir de valeur plus petite que ${min}.`),
        validationMethod: ((value, min = 5) => value.trim().length >= min),
        renderBadge: ((min = 5) => `Min : ${min}`)
    },
    MAX: { 
        renderMessage: ((max = 15) => `Ce champ ne doit pas contenir une valeur plus grande que ${max}.`),
        validationMethod: ((value, max = 15) => value.trim().length <= max),
        renderBadge: ((max = 5) => `Max : ${max}`)
    },
    TYPE_EMAIL: { 
        renderMessage: (() => "Ce champ doit être une adresse courriel valide"),
        validationMethod: (value => /^[\w+\-.]+@([\w-]+\.)+[\w-]{2,20}$/.test(value)),//    longuest domain found is 14 long : .cancerresearch
        renderBadge: (() => `Format courriel`)
    },
    TYPE_ALPHANUMERIC: {
        renderMessage: (() => "Ce champ ne doit contenir que des caractères alphanumériques (lettres et chiffres)"),
        validationMethod: (value => /^[A-Za-z0-9]*$/.test(value)),
        renderBadge: (() => `Alphanumerique (lettres et chiffres)`)
    },
    FILE_MAX_SIZE: {
        renderMessage: ((mo = 5) => `Ce champ n'accepte que les fichiers de ${mo} Mo et moins.`),
        validationMethod: ((value, mo = 5) => value ? value?.size <= (mo * 1024 * 1024) : true),
        renderBadge: ((mo = 5) => `${mo} Mo max`)
    },
    ONE_OF_MANY_REQUIRED: {
        renderMessage: (()                 => `Vous devez remplir au moins l'un des champs de cette section`),
        validationMethod: ((value, dependencies) =>  isValuePositive(value) || dependencies.some(value => isValuePositive(value))),
        renderBadge: (() => `1 champ requis`)
    },
    HIGHER_DATE_REQUIRED: {
        renderMessage: (() => `La date dans ce champ doit être ultérieure à celle du prédécent`),
        validationMethod: ((value, dependencies) => !dependencies.some(dep => new Date(dep).getTime() > new Date(value).getTime())),
        renderBadge: (() => `Date ultérieure`)
    },
}

const initiateValidator = selectedRules => {

    //New object that will be passed has state for the field validater
    let newFieldValidators = {}

    //Loop through the list of possible validators
    for (const settingRuleName in rules_settings){
        //Try to identify a matching validator between the presets and the passed rules
        const matchingValidator = selectedRules.find(rule => rule.name === settingRuleName)
        //If "matchingValidator" isn't undefined, then there's a match
        if(matchingValidator)
            //If there is a match, build the permanent validator object for this field
            newFieldValidators[settingRuleName] = {
                specification: matchingValidator.specification,
                dependencies: matchingValidator.dependencies || [],      //New feature for passing an array of functions that returns TRUE of FALSE. Allow us to compare with external values
                message: rules_settings[settingRuleName].renderMessage((matchingValidator.specification && matchingValidator.specification)),
                validationMethod: rules_settings[settingRuleName].validationMethod,
                badge: rules_settings[settingRuleName].renderBadge((matchingValidator.specification && matchingValidator.specification)),
                isValid: false
            }
    }
    //Return the object that will serve as state
    return newFieldValidators
}

export const useValidation = ( setOfRules, formState ) => {
    const [validator, setValidator] = useState(initiateValidator( setOfRules || [] ))
    //Bool that is set to go on and off to trigger rerendering in dependent components
    const [triggerDependencies, setTriggerDependencies] = useState(false)  

    //List of dependecies listener (usually validation state)
    let ONE_OF_MANY_DEPENDECIES = (formState && validator["ONE_OF_MANY_REQUIRED"]) ? validator["ONE_OF_MANY_REQUIRED"].dependencies.map(dep => dep.listenerValue(formState)) : [];
    let HIGHER_DATE_REQUIRED = (formState && validator["HIGHER_DATE_REQUIRED"]) ? validator["HIGHER_DATE_REQUIRED"].dependencies.map(dep => dep.listenerValue(formState)) : [];
    //UseEffect listening for event changing
    useEffect(() => {
        //Trigger the re-evaluation of the dependecies
        setTriggerDependencies(!triggerDependencies)
    }, [...ONE_OF_MANY_DEPENDECIES, ...HIGHER_DATE_REQUIRED])


    const validate = (value) => {
        //Evaluate the validity of the field => only positiv if every validation rules are respected
        let generalValidity = true

        //Evaluate the validity of every validators
        for(const ruleName in validator){
            //Reference to the specific validator 
            const rule = validator[ruleName]
            //Edit the specification of dependencies functions if there are
                //Init value
                let param = null;
                if(rule.specification)
                    //Apply the simple rule specification
                    param = rule.specification;
                if(!rule.specification && rule.dependencies)
                    //Extract the content to evaluate in the formstate depending of the passed function
                    param = rule.dependencies.map(depFunction => depFunction.value(formState))
            //For each, apply the validation method 
            const validationResult = rule.validationMethod(value, param)
            //Apply result to general validity variable
            if(!validationResult) generalValidity = false
            //Verify if there is a change of state
            if(validationResult !== rule.isValid){
                //If there is, update the state with the new validity
                setValidator(prev => ({
                    ...prev,
                    [ruleName]: {
                        ...prev[ruleName],
                        isValid: validationResult
                    }
                }))           
            }
        }
        return generalValidity
    }


    /* Validator badges sections displayed under the text in the selected field */
    const RequirementsBadges = ( props ) => {

        const {
            addUlPadding,
            alwaysDisplay,
            displayOnlyBadges = false
        } = props

        const rulesNameList = Object.keys(validator);

        const forceBadgeDisplay = Object.values(validator).map(rule => rule.isValid).some(elem => elem === false)

        return (
            <>
                {/* At least one validator to */}
                { rulesNameList.length > 0 && 
                <div className="w-100">
                    { forceBadgeDisplay && rulesNameList.length > 0 && !displayOnlyBadges &&
                        <div className="w-100 form-element--field-padding-x">
                            <div className="form-element--default-border--top"></div>
                        </div>
                    }
                    <ul className={`mb-0 ${addUlPadding && "form-element--field-padding-top-reverse"} ${alwaysDisplay && "d-flex"} badge-container gap-2 ${forceBadgeDisplay ? "form-element--force-badge-display" : ""}`}>
                        { rulesNameList.map(ruleName => (
                            <li 
                                title={`${validator[ruleName].message}`}
                                className={`
                                            rounded-1
                                            badge-container__badge
                                            ${validator[ruleName].isValid && "badge--validation-succes"}
                                        `}
                                key={"badge-" + ruleName}
                                >{validator[ruleName].badge}
                            </li>
                        ))}
                    </ul>
                </div>
                }
            </>
        )
    }

    /* Validator badges sections displayed under the text in the selected field */
    const ValidationErrorMessages = () => {

        const completeRulesList = Object.keys(validator);
        //List of errors to display (list of there names)
        const errorRulesList = completeRulesList.filter(ruleName => validator[ruleName].isValid === false)

        return (
            <>
                {/* At least one validator to */}
                { errorRulesList.length > 0 && 
                <ul className={`mt-1 mb-0 d-inline-flex flex-wrap form-element--validation-errors-container `}>
                    { errorRulesList.map(ruleName => (
                        <li 
                            className={`d-flex me-3 mb-2 validation-error ${validator[ruleName].isValid && "validation-error--positive"}`}
                            key={"error-message-" + ruleName}
                        >
                                <small>{validator[ruleName].message}</small>
                        </li>
                    ))}
                </ul>
                }
            </>
        )
    }

    //Exports utilities
    return {
        validate,
        RequirementsBadges,
        ValidationErrorMessages,
        dependencyCallingValidation: triggerDependencies
    }
}