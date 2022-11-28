//React
import { useState, useEffect } from 'react';

//Custom hooks
import { sendExternalApiRequest } from '@/src/hooks/http-hook';
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';
import useDebounce from '@/src/hooks/useDebounce';

//Router
import Router from 'next/router';

//Component
import Input from "../FormElements/Input/Input";

//&#128269; is HTML Entity (decimal) for magnifying glass


/*
Props :
    - id : isolate input/datalist with distinct ids
*/
const SearchBar = (props) => {

     //Main form functionalities
     const { FormUI, submitRequest, formState, formTools, clearFormData } = useFormUtils(
        {
            searchIndex: {
                value: '',
                isValid: true
            }
        },
    );

    //SearchSuggestion data list state
    const [searchSuggestion, setSearchSuggestion] = useState([]);

    //Search suggestion
    const getSearchSuggestion = async () => {
        const suggestions =  await sendExternalApiRequest(
            '/search' + '?searchIndex=' + formState.inputs.searchIndex.value,
            'GET',
        );
        setSearchSuggestion(suggestions);
    }

    //Request Debounce
    const debouncedRequest = useDebounce(formState.inputs.searchIndex.value, 400);
    //Update the list of options to display
    useEffect(() => {
        getSearchSuggestion();
    },[debouncedRequest]);


    const submitHandler = async event => {
        event.preventDefault();
        Router.push({
            pathname: "/searchResults",
            query: { searchIndex : formState.inputs.searchIndex.value },
        });
        clearFormData();
    }

    return (
        <form onSubmit={submitHandler}>
            <button type="submit">
                &#128269;
            </button>
            <Input
                type="text"
                name={"searchIndex"}
                formTools={formTools}
                placeholder="Rechercher"
                list={props.id}
            />
            {<datalist id={props.id} name={"Datalist-"+ props.id }>
                            {/*searchSuggestion.map( sugg => 
                                <option key={sugg._id} value={sugg.name}>{sugg.type}</option>
                            )*/}
            </datalist>}
        </form>
    )
}

export default SearchBar;