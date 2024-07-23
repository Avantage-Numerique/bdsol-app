import {useEffect, useRef, useState} from 'react';
import {clientSideExternalApiRequest} from '@/src/hooks/http-hook';
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import useDebounce from '@/src/hooks/useDebounce';
import {useRouter} from 'next/router';
import Icon from "@/common/widgets/Icon/Icon";
import Select from 'react-select';
import {getType} from '@/src/DataTypes/Entity/Types';

//Component
//import Input from "../FormElements/Input/Input";

//&#128269; is HTML Entity (decimal) for magnifying glass


/*
Props :
    - id : isolate input/datalist with distinct ids
*/
const SearchBar = ({small, ...props}) => {

    //List of options fetched by the api and suggested to the user
    const [selectResponse, setSelectResponse] = useState([]);
    const [nearestTaxonomyObject, setNearestTaxonomyObject] = useState({})
    const [optionList, setOptionList] = useState([]);

    const selectRef = useRef();
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState(null)
    const blockSubmitSlug = useRef(false);
    const firstRender = useRef(true);

    const router = useRouter();
    //Main form functionalities
    const {FormUI, submitRequest, formState, formTools, clearFormData} = useFormUtils(
        {
            searchIndex: {
                value: router.query.searchIndex ?? '',
                isValid: true
            }
        },
    );

    //Simple styling to remove the border
    const styling = {
        //simplifed the no border
        control: (styles, state) => ({
            ...styles,
            border: 0,
            borderRadius: "1.5rem",
            // This line disable the blue border
            boxShadow: 0,
            '&:hover': {
                border: 0
            },
            //backgroundColor: 'white'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            // Ajoutez d'autres styles si nécessaire
          }),
    }

    const inputHandler = formTools.inputHandler;

    useEffect( () => {
        let resultsOptions = [];
        if (selectResponse?.data?.length > 0)
            resultsOptions = selectResponse.data.map( (elem) => {
                return { value: elem._id, label: elem.name ?? elem.firstName + ' ' + elem.lastName, type: elem.type, slug: elem.slug, category:elem.category }
        })
        let nearTaxoOptions = [];
        if (nearestTaxonomyObject?.length > 0)
            nearTaxoOptions = nearestTaxonomyObject.map( (elem) => {
                return { value: elem._id, label: elem.name ?? elem.firstName + ' ' + elem.lastName, type: elem.type, slug: elem.slug, category:elem.category }
        });
        //remove duplicate
        const uniqueOptions = [...resultsOptions, ...nearTaxoOptions].filter((v,i,a)=>a.findIndex(v2=>(v2.value===v.value))===i)

        setOptionList(uniqueOptions);
    },[selectResponse, nearestTaxonomyObject])

    //Search suggestion
    const getSearchSuggestion = async () => {
        //If not the first render, fetch
        const suggestions = await clientSideExternalApiRequest(
            '/search' + '?searchIndex=' + formState.inputs.searchIndex.value,
            { method: 'GET' }
        );
            
        setSelectResponse(suggestions);
    }

    const getNearestTaxonomyToSearchIndex = async (searchIndex) => {
        const nearestTaxonomyResponse = await clientSideExternalApiRequest("/search/nearestTaxonomy?searchIndex="+formState.inputs.searchIndex.value, { method: 'GET'});
        let nearTaxoToEntityArray = [];
        if(nearestTaxonomyResponse?.data?.nearestTaxonomy)
            nearTaxoToEntityArray.push(nearestTaxonomyResponse.data.nearestTaxonomy)

        if(nearestTaxonomyResponse?.data?.linkedEntityToNearestTaxonomy)
            nearTaxoToEntityArray.push(...nearestTaxonomyResponse.data.linkedEntityToNearestTaxonomy)

        setNearestTaxonomyObject(nearTaxoToEntityArray)
    }

    //Request Debounce
    const debouncedRequest = useDebounce(formState.inputs.searchIndex.value, 200);

    //Update the list of options to display
    useEffect(() => {
        //If not the first render, fetch
        if(!firstRender.current) {
            getSearchSuggestion();
            getNearestTaxonomyToSearchIndex();
        }
        else
            firstRender.current = false;
    }, [debouncedRequest]);

    //Called whenever the user enter or modify a value into the field
    const formRequestData = (val) => {
        setInputValue(val);
        inputHandler(
            "searchIndex",
            val,
            props.validators ? validate(event.target.value, props.validators) : true
        )
    }

    const submitSelectedItem = (selected, action) => {
        const typeUrl = getType(selected.type).slug
        if(selected.type === "Taxonomy"){
            router.push({
                pathname: "/"+typeUrl+"/"+selected.category+"/"+selected.slug,
            });
        }
        else{
            router.push({
                pathname: "/"+typeUrl+"/"+selected.slug,
            });
        }
        setValue(null)
        setInputValue('');
    }

    const submitHandler = async event => {
        event?.preventDefault();
        if(inputValue !== undefined && inputValue !== null && inputValue.trim() !== ''){
            await router.push({
                pathname: "/searchResults",
                query: {searchIndex: inputValue},
            });
            setValue(null)
            setInputValue('');
    
            //Re-init the var to allow search on click and on tab
            setTimeout( () => blockSubmitSlug.current = false, 500 )
        }
    }



    return (
        <form onSubmit={submitHandler} className={`search-bar ${small && "small-searchBar w-100"}`}>
            <div className="input-group my-2 bg-white">
                <Select
                    className={"form-control ms-2 p-0 border-0 rounded"}
                    key={"SearchBar-layout"}
                    ref={selectRef}
                    styles={styling}
                    instanceId={"SearchBar-layout"}
                    placeholder={"Rechercher une personne, un projet, un équipement, etc."}
                    value={value}
                    options={optionList}
                    inputValue={inputValue}
                    onInputChange={(val, action) => {
                        if (action.action === "input-change") formRequestData(val);
                    }}
                    onChange={(val, action) => {
                        if(action.action === "select-option" && !blockSubmitSlug.current) { submitSelectedItem(val, action) }
                    }}
                    //Handle on Enter key to submit instead of select
                    onKeyDown={ (event) => { if(event.key == "Enter") { blockSubmitSlug.current = true; submitHandler() } }}
                    noOptionsMessage={(val)=> (
                        <p className={"m-0 p-0"}>
                            Aucune suggestion trouvé avec la recherche <strong>{val.inputValue}</strong>.<br />
                            Appuyez sur la touche <Icon iconName={"keyboard"} /> <code>Entrer</code> pour rechercher avec cette valeur quand même.
                        </p>
                    )}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                    filterOption={(option, searchText) => {return true}}
                />
                <button type="submit" className="p-1 btn">
                    <Icon iconName="search" />
                </button>
            </div>
        </form>
    )
}

export default SearchBar;

/*
<input type={"text"} className={"form-control px-4 py-3"} placeholder={"Rechercher"} list={props.id} />
 */