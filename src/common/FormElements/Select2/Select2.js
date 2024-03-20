//React
import {useEffect, useState} from "react";

//Helper
import ApiEntityModel from "@/src/DataTypes/Entity/models/ApiEntityModel";

//Component
import Select2BaseSingle from "./Select2BaseSingle";
import Select2BaseMulti from "./Select2BaseMulti";
import Tip from '@/common/FormElements/Tip/Tip';
import Button from '@/src/common/FormElements/Button/Button';

//Hook
import {useHttpClient} from "@/src/hooks/http-hook";
import useDebounce from '@/src/hooks/useDebounce'
import {useRootModal} from '@/src/hooks/useModal/useRootModal'
import {useValidation} from '@/src/hooks/useValidation/useValidation';
import {useFieldTips} from '@/src/hooks/useFieldTips/useFieldTips';

//Modal component
import {
    TYPE_EQUIPMENT,
    TYPE_EVENT,
    TYPE_ORGANISATION,
    TYPE_PERSON,
    TYPE_PLACE,
    TYPE_PROJECT,
    TYPE_TAXONOMY
} from "@/src/DataTypes/Entity/Types";
import CreatePersonForm from "@/src/DataTypes/Person/components/Forms/CreatePerson/CreatePersonForm";
import CreateOrganisationForm
    from "@/src/DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm";
import CreateTaxonomyForm from '@/DataTypes/Taxonomy/components/Forms/CreateTaxonomy/CreateTaxonomyForm';
import CreateProjectForm from "@/src/DataTypes/Project/component/forms/CreateProjectForm";
import CreateEventForm from "@/src/DataTypes/Event/component/Forms/CreateEvent/CreateEventForm";
import CreatePlaceForm from "@/src/DataTypes/Place/components/forms/CreatePlaceForm/CreatePlaceForm";
import CreateEquipmentForm from "@/src/DataTypes/Equipment/components/Forms/CreateEquipmentForm/CreateEquipmentForm";


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
 * @param {string} searchField : name of the property to search in the database from select2 input (e.g. "name", "firstName")
 * @param {string} selectField : String that allow ApiEntityModel to know what to return as a select option from the data of formState (domains, offers, fullName)
 * Note : Works best if "type" is in the formState data, else it goes to switch case default and exceptions need to be handled
 * @param {function} createOptionFunction : function that handles the create (modal pop-up ...) if undefined, create default 
 */



const Select2 = ({ name, formTools, ...props }) => {

    const {sendRequest} = useHttpClient();
    const [optionsList, setOptionList] = useState(props.optionsList ?? []);
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState(null);

    //Extract root modal 
    const { Modal, displayModal, closeModal, modalInitValues } = useRootModal();

    //Formstate
    const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;

    const currentState = formState.inputs[name];

    const onTouch = event => {
        inputHandler(
            name,
            value,
            props.validationRules ? validate(value) : true
        )
        inputTouched(name)
    }

    //Extract validator message
    const { validate, RequirementsBadges, dependencyCallingValidation } = useValidation( props.validationRules, formState )
    //Tooltip
    const {TipPopOver, TipButton} = useFieldTips(props.tip);

    useEffect(() => {
        inputHandler(
            name,
            value,
            props.validationRules ? validate(value) : true
        )
    },  [value, dependencyCallingValidation])

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
            let data = {};
            if(Array.isArray(props.searchField)){
                data.or = [];
                props.searchField.forEach(searchElem => {
                    data.or.push({[searchElem] : inputValue})
                }); 
            }
            else
            {
                data[props.searchField] = inputValue
            }
            const apiResponse = await sendRequest(
                (props.fetch),
                'POST',
                JSON.stringify({
                    data: {
                        ...requestData,
                        ...data,
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
        //Refetch
        fetchOptions();
    }

    const label = props.label ? 
        (   
            <>
            <div className="d-flex justify-content-between pb-1">
                <label htmlFor={name}>{props.label}</label>
                {props.tip && <TipButton title="Détails" />}
            </div>
            <TipPopOver />
            </>
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
            onTouch={onTouch}
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
            onTouch={onTouch}
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
                
            }}*/ //Commented because ApiEntityModel doesn't handle person yet since we don't use it at the moment
        />
    )
    const PersonDescription = (<p></p>)
    const OrganisationModalForm = (
        <CreateOrganisationForm
            initValues={ modalInitValues ?? {}}
            /*onPositiveResponse={(response) => {
                    //Here could be a call back function to execute 
                    const optionCreated = ApiEntityModel.getSelectOption(response.data)
                    addSelectedValue(...optionCreated)
                    //Close the modal 
                    closeModal()
                
            }}*/ //Commented because ApiEntityModel doesn't handle organisation yet since we don't use it at the moment
        />
    )
    const OrganisationDescription = (<p></p>)
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
    const TaxonomyDescription = (<p>La catégorie que vous ajoutez sera directement intégrée à votre formulaire.</p>)
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
        />    
    )
    const ProjectDescription = (<p></p>)
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
        />
    )
    const EventDescription = (<p>L'événement que vous ajoutez sera directement intégré à votre formulaire.</p>)
    const PlaceModalForm = (
        <CreatePlaceForm
            initValues={ modalInitValues ?? {}}
            onPositiveResponse={(response) => {
                    //Here could be a call back function to execute 
                    const optionCreated = ApiEntityModel.getSelectOption(response.data)
                    addSelectedValue(...optionCreated)
                    //Close the modal 
                    closeModal()
            }}
        />
    )
    const PlaceDescription = (<p>Le lieu que vous ajoutez sera directement intégré à votre formulaire.</p>)
    const EquipmentModalForm = (
        <CreateEquipmentForm
            initValues={ modalInitValues ?? {}}
            onPositiveResponse={(response) => {
                //Here could be a call back function to execute 
                const optionCreated = ApiEntityModel.getSelectOption(response.data)
                addSelectedValue(...optionCreated)
                //Close the modal 
                closeModal()
        }}
        />
    )
    const EquipmentDescription = (<p>L'équipement que vous ajoutez sera directement intégré à votre formulaire.</p>)

    const createModal = () => {
        const modals = new Map();
        modals.set(TYPE_PERSON, PersonModalForm);
        modals.set(TYPE_ORGANISATION, OrganisationModalForm);
        modals.set(TYPE_TAXONOMY, TaxonomyModalForm);
        modals.set(TYPE_PROJECT, ProjectModalForm);
        modals.set(TYPE_EVENT, EventModalForm);
        modals.set(TYPE_PLACE, PlaceModalForm);
        modals.set(TYPE_EQUIPMENT, EquipmentModalForm);

        return modals.get(props.modalType)
    }
    const modalDescription = () => {
        const descriptions = new Map();
        descriptions.set(TYPE_PERSON, PersonDescription);
        descriptions.set(TYPE_ORGANISATION, OrganisationDescription);
        descriptions.set(TYPE_TAXONOMY, TaxonomyDescription);
        descriptions.set(TYPE_PROJECT, ProjectDescription);
        descriptions.set(TYPE_EVENT, EventDescription);
        descriptions.set(TYPE_PLACE, PlaceDescription);
        descriptions.set(TYPE_EQUIPMENT, EquipmentDescription);
        return descriptions.get(props.modalType);
    }

    return (
        <>
            {label} 
            
            <div 
                //tabIndex="0"  Would allow the complete field to be focused, not only the input. But that would alos make two focusable elements by field
                data-testid="field-container"
                className={`
                form-element
                form-element--color-validation
                ${props.disabled ? "bg-greyBg" : ""}
                ${props.formClassName && props.formClassName}
                ${!currentState.isValid && currentState.isTouched && "control--invalid"}
            `}>
                    {select}
                    <RequirementsBadges addUlPadding />
            </div>

            <Modal {...props}>
                
                <header className={`d-flex justify-content-end`}>
                    {modalDescription()}
                    <Button onClick={() => closeModal()}>Fermer</Button>
                </header>
                
                <div className={`my-4 border-bottom`}></div>
                {createModal()}
                
                
            </Modal>
        </>
    );

    
}

export default Select2;