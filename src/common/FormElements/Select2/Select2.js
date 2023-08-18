//React
import { useState, useEffect, useContext, useRef } from "react";

//Helper
import ApiEntityModel from "@/src/DataTypes/Entity/models/ApiEntityModel";

//Component
import Select2BaseSingle from "./Select2BaseSingle";
import Select2BaseMulti from "./Select2BaseMulti";
import Tip from '@/common/FormElements/Tip/Tip';
import Button from '@/src/common/FormElements/Button/Button';

//Hook
import { useHttpClient } from "@/src/hooks/http-hook";
import useDebounce from '@/src/hooks/useDebounce'
import { useRootModal } from '@/src/hooks/useModal/useRootModal'
import { useValidation } from '@/src/hooks/useValidation/useValidation';

//Modal component
import { TYPE_EVENT, TYPE_ORGANISATION, TYPE_PERSON, TYPE_PROJECT, TYPE_TAXONOMY } from "@/src/DataTypes/Entity/Types";
import CreatePersonForm from "@/src/DataTypes/Person/components/Forms/CreatePerson/CreatePersonForm";
import CreateOrganisationForm from "@/src/DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm";
import CreateTaxonomyForm from '@/DataTypes/Taxonomy/components/Forms/CreateTaxonomy/CreateTaxonomyForm';
import CreateProjectForm from "@/src/DataTypes/Project/component/forms/CreateProjectForm";
import CreateEventForm from "@/src/DataTypes/Event/component/Forms/CreateEvent/CreateEventForm";


/**
 * @param {string} name : used for id and formState
 * @param {formTools} formTools : FormTools
 * @param {string} label : Title of the field displayed over it
 * @param {boolean} creatable : true if allowed to create, false or undefined means not allowed to create new option
 * @param {TYPES} modalType : Type of the createModal if allowed to create. It choose which createForm to show upon createOption 
 * @param {boolean} isMulti : true if multiple selection allowed, false if single option selectable
 * @param {Array} optionsList : (optionnal) Can specify directly a list of option in format [ { label, value, color? }, ... ]
 * @param {string} fetch : Url to fetch data from and create options
 * @param {string} className : className added from outside the component 
 * @param {string} formClassName : className for the form layer
 * @param {object} requestData : param to always pass during request (e.g. category : "skills" to only access skills taxonomy)
 * @param {string} searchField : for the moment => a string added to requestData that's dynamically searching with the select
 * @param {string} selectField : String that allow ApiEntityModel to know what to return as a select option from the data of formState (domains, offers, fullName)
 * Note : Works best if "type" is in the formState data, else it goes to switch case default and exceptions need to be handled
 * @param {function} createOptionFunction : function that handles the create (modal pop-up ...) if undefined, create default 
 */



const Select2 = ({ name, formTools, ...props }) => {

    const {sendRequest} = useHttpClient();
    const [optionsList, setOptionList] = useState(props.optionsList ?? []);
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState(null);

    //Extract validator message
    const { validate, RequirementsBadges } = useValidation( props.validationRules )

    //Extract root modal 
    const { Modal, displayModal, closeModal, modalInitValues } = useRootModal();

    //Formstate
    const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;

    useEffect(() => {
        inputHandler(
            name,
            value,
            props.validationRules ? validate(value) : true
        )
    },  [value])

    useEffect( () => {
        const valueList = ApiEntityModel.getSelectOption(formState.inputs[name].value, props.selectField);
        //if formState contains no value
        if(valueList === null || valueList?.length == 0){
            setValue(null);
        }
        else {
            //isMulti
            if (props.isMulti){
                setValue(valueList)
            }
            //is not multi (single)
            else {
                setValue(valueList[0])
            }
        }
    }, [])

    //Fetch
    const fetchOptions = async () => {
        if(props.optionsList == undefined && props.fetch !== undefined){
            const requestData = props.requestData ?? {};
            const apiResponse = await sendRequest(
                (props.fetch),
                'POST',
                JSON.stringify({
                    data: {
                        ...requestData,
                        [props.searchField]: inputValue
                    }
                }),
                { 'Content-Type': 'application/json' }
            )
            const optionList = ApiEntityModel.getSelectOption(apiResponse.data, props.selectField);
            setOptionList(optionList);
        }
    }   

    //Allow only one request per 400ms, after the user stop typing
    const debouncedRequest = useDebounce(inputValue, 400);
    //Update the list of options to display
    useEffect(() => { fetchOptions() }, [debouncedRequest] );

    const addSelectedValue = (val) => {
        if(val.label != undefined && val.value != undefined)
        {
            if(props.isMulti){
                if(value){
                    setValue([...value, val]);
                } else {
                    setValue([val])
                }
            } else{
                setValue(val)
            }
        }
    }

    const label = props.label ? 
        (
            <div className="d-flex justify-content-between">
                <label htmlFor={name} >{props.label}</label>
                {props.tooltip && <Tip header={props.tooltip?.header} body={props.tooltip?.body}/>}
            </div>
        ) :
        (<></>);

    const select = props.isMulti ? 
        (<Select2BaseMulti
            name={name}
            creatable={props.creatable}
            //createOptionFunction={props.createOptionFunction}
            createOptionFunction={elem => displayModal({
                name: elem
            })}
            options={optionsList}
            inputValue={inputValue}
            inputValueSetter={setInputValue}
            value={value}
            valueSetter={setValue}
        />):
        (<Select2BaseSingle
            name={name}
            creatable={props.creatable}
            //createOptionFunction={props.createOptionFunction}
            createOptionFunction={elem => displayModal({
                name: elem
            })}
            
            options={optionsList}
            inputValue={inputValue}
            inputValueSetter={setInputValue}
            value={value}
            valueSetter={setValue}
        />);


    const PersonModalForm = (
        <CreatePersonForm
            initValues={ modalInitValues ?? {}}
            /*onPositiveResponse={(response) => {
                    //Here could be a call back function to execute 
                    const optionCreated = ApiEntityModel.getSelectOption(response.data)
                    addSelectedValue(...optionCreated)
                    //Close the modal 
                    closeModal()
                
            }}*/ //Commented because ApiEntityModel doesn't handle project yet since we don't use it at the moment
        >
        </CreatePersonForm>
    )
    const OrganisationModalForm = (
        <CreateOrganisationForm
            initValues={ modalInitValues ?? {}}
            /*onPositiveResponse={(response) => {
                    //Here could be a call back function to execute 
                    const optionCreated = ApiEntityModel.getSelectOption(response.data)
                    addSelectedValue(...optionCreated)
                    //Close the modal 
                    closeModal()
                
            }}*/ //Commented because ApiEntityModel doesn't handle project yet since we don't use it at the moment
        >
        </CreateOrganisationForm>
    )
    const TaxonomyModalForm = (
        <CreateTaxonomyForm
            {...props}
            name={name ?? ''}   //Prefilled value
            initValues={ modalInitValues ?? {} }
            category={props.requestData?.category}
            onPositiveResponse={(response) => {
                const optionCreated = ApiEntityModel.getSelectOption(response.data)
                addSelectedValue(...optionCreated)
                //Close the modal 
                closeModal()
            }}
        /> 
    )
    const ProjectModalForm = (
        <CreateProjectForm
            initValues={ modalInitValues ?? {}}
            /*onPositiveResponse={(response) => {
                    //Here could be a call back function to execute 
                    const optionCreated = ApiEntityModel.getSelectOption(response.data)
                    addSelectedValue(...optionCreated)
                    //Close the modal 
                    closeModal()
                
            }}*/ //Commented because ApiEntityModel doesn't handle project yet since we have no use for it at the moment
        >    
        </CreateProjectForm>
    )
    const EventModalForm = (
        <CreateEventForm
            initValues={ modalInitValues ?? {}}
            onPositiveResponse={(response) => {
                    //Here could be a call back function to execute 
                    const optionCreated = ApiEntityModel.getSelectOption(response.data)
                    addSelectedValue(...optionCreated)
                    //Close the modal 
                    closeModal()
            }}
        >

        </CreateEventForm>
    )

    const createModal = () => {

        const modals = new Map();
        modals.set(TYPE_PERSON, PersonModalForm);
        modals.set(TYPE_ORGANISATION, OrganisationModalForm);
        modals.set(TYPE_TAXONOMY, TaxonomyModalForm);
        modals.set(TYPE_PROJECT, ProjectModalForm);
        modals.set(TYPE_EVENT, EventModalForm);

        return modals.get(props.modalType)
    }

    return (
        <>
            {label} 
            
            <div 
                className="
                    form-element
                    form-element--color-validation
                ">
                    {select}
                    <RequirementsBadges addUlPadding /> 

            </div>

            <Modal {...props}>
                
                <header className={`d-flex`}>
                    <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                    <Button onClick={() => closeModal()}>Fermer</Button>
                </header>               
                
                <div className={`my-4 border-bottom`}></div>
                {createModal()}
                
                
            </Modal>
        </>
    );

    
}

export default Select2;