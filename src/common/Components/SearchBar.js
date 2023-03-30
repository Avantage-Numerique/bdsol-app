import {useState, useEffect, useRef} from 'react';
import {clientSideExternalApiRequest} from '@/src/hooks/http-hook';
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import useDebounce from '@/src/hooks/useDebounce';
import Router, {useRouter} from 'next/router';
import Icon from "@/common/widgets/Icon/Icon";
import Select from 'react-select';

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
    const [optionList, setOptionList] = useState([]);

    const selectRef = useRef();
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState(null)

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

    const inputHandler = formTools.inputHandler;

    useEffect( () => {
        let newOptionList = [];
        if (selectResponse?.data?.length > 0)
            newOptionList = selectResponse.data.map( (elem) => {
            return { value: elem._id, label: elem.name ?? elem.firstName + ' ' + elem.lastName, type: elem.type, slug: elem.slug, category:elem.category }
        })
        setOptionList(newOptionList)
        console.log("optionList",newOptionList)
    },[selectResponse])

    //Search suggestion
    const getSearchSuggestion = async () => {
        const suggestions = await clientSideExternalApiRequest(
            '/search' + '?searchIndex=' + formState.inputs.searchIndex.value,
            { method: 'GET' }
        );
        setSelectResponse(suggestions);
    }

    //Request Debounce
    const debouncedRequest = useDebounce(formState.inputs.searchIndex.value, 400);
    //Update the list of options to display
    useEffect(() => {
        getSearchSuggestion();
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
        const typeToUrl = {
            person : "persons",
            organisation : "organisations",
            taxonomy : "categories",
        }
        if(selected.type == "taxonomy"){
            Router.push({
                pathname: "/"+typeToUrl[selected.type]+"/"+selected.category+"/"+selected.slug,
            });
        }
        else{
            Router.push({
                pathname: "/"+typeToUrl[selected.type]+"/"+selected.slug,
            });
        }
        setValue(null)
        setInputValue('');
    }

    const submitHandler = async event => {
        event.preventDefault();
        Router.push({
            pathname: "/searchResults",
            query: {searchIndex: inputValue},
        });
        setValue(null)
        setInputValue('');
    }

    return (
        <form onSubmit={submitHandler} className={`search-bar ${small && "small-searchBar w-100"}`}>
            <div className="input-group my-2 ">
                <button type="submit" className="btn btn-outline-light">
                    <Icon iconName="search" />
                </button>
            
                <Select
                    className={"form-control px-3 py-2"}
                    key={"SearchBar-layout"}
                    ref={selectRef}
                    instanceId={"SearchBar-layout"}
                    placeholder={"Rechercher"}
                    value={value}
                    options={optionList}
                    inputValue={inputValue}
                    onInputChange={(val, action) => {if (action.action === "input-change") formRequestData(val)}}
                    onChange={(val, action) => {
                        if(action.action === "select-option") { submitSelectedItem(val, action) }
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                            ...theme.colors,
                            primary25: 'hotpink',
                            primary: 'black',
                        },
                        })}
                />
            </div>
        </form>
    )
}

export default SearchBar;

/*
<input type={"text"} className={"form-control px-4 py-3"} placeholder={"Rechercher"} list={props.id} />
 */