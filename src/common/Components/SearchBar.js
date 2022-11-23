
//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//Router
import Router from 'next/router';

//Component
import Input from "../FormElements/Input/Input";

//&#128269; is HTML Entity (decimal) for magnifying glass

const SearchBar = () => {

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools, clearFormData } = useFormUtils(
        {
            searchIndex: {
                value: '',
                isValid: true
            }
        },
    );
        
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
                name="searchIndex"
                formTools={formTools}
            />
        </form>
    )
}

export default SearchBar;