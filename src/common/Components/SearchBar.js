import {useState, useEffect} from 'react';
import {externalApiRequest} from '@/src/hooks/http-hook';
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import useDebounce from '@/src/hooks/useDebounce';
import Router, {useRouter} from 'next/router';
import InputBasic from "@/FormElements/InputBasic/InputBasic";
//Component
//import Input from "../FormElements/Input/Input";

//&#128269; is HTML Entity (decimal) for magnifying glass


/*
Props :
    - id : isolate input/datalist with distinct ids
*/
const SearchBar = ({small, ...props}) => {

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

    //SearchSuggestion data list state
    const [searchSuggestion, setSearchSuggestion] = useState([]);

    //Search suggestion
    const getSearchSuggestion = async () => {
        const suggestions = await externalApiRequest(
            '/search' + '?searchIndex=' + formState.inputs.searchIndex.value,
            {
                method: 'GET'
            }
        );
        setSearchSuggestion(suggestions.data);
    }

    //Request Debounce
    const debouncedRequest = useDebounce(formState.inputs.searchIndex.value, 400);
    //Update the list of options to display
    useEffect(() => {
        getSearchSuggestion();
    }, [debouncedRequest]);


    const submitHandler = async event => {
        event.preventDefault();
        Router.push({
            pathname: "/searchResults",
            query: {searchIndex: formState.inputs.searchIndex.value},
        });
        if (props.clearAfterSearch)
            clearFormData();
    }

    //datalist name={"Datalist-"+ props.id }
    return (
        <form onSubmit={submitHandler} className={`search-bar ${small && "small-searchBar w-100"}`}>
            <div className="input-group my-2 ">
                <button type="submit" className="btn btn-outline-light">
                    <i className="las la-search"></i>
                </button>
                <InputBasic
                    className={"form-control px-3 py-2"}
                    type={"text"}
                    name={"searchIndex"}
                    formTools={formTools}
                    placeholder={"Rechercher"}
                    list={props.id}
                />
            </div>
            <datalist id={props.id}>
                {
                    searchSuggestion && searchSuggestion.length !== 0 && searchSuggestion.map((sugg) => {
                        let suggestionLabel = sugg.name ?? (sugg.firstName + ' ' + sugg.lastName);
                        //suggestionLabel = sugg.type ? suggestionLabel + ` (${sugg.type.capitalize()})` : suggestionLabel;
                        return (
                            <option key={sugg._id} value={suggestionLabel}/>
                        )
                    })
                }
            </datalist>
        </form>
    )
}

export default SearchBar;

/*
<input type={"text"} className={"form-control px-4 py-3"} placeholder={"Rechercher"} list={props.id} />
 */