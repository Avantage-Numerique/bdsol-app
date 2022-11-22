
//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//Component
import Input from "../FormElements/Input/Input";

//&#128269; is HTML Entity (decimal) for magnifying glass

const SearchBar = () => {

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            searchIndex: {
                value: '',
                isValid: true
            }
        }
        );
        
    const submit = () => {console.log("Submited")};


    return (
        <form>
            <button type="submit" onClick={() => submit()}>
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