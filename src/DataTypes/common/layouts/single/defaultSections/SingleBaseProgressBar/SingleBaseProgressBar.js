import {useCallback} from 'react';

//Components
import Button from '@/src/common/FormElements/Button/Button';
//Styling
import styles from './SingleBaseProgressBar.module.scss';
//Utils
import {lang} from "@/common/Data/GlobalConstants";
import {useAuth} from '@/src/authentification/context/auth-context';

//Validation function
function isValueFilled(value) {
    if (typeof value === 'string') {
      return value.trim() !== ''; // For strings, check if it's not an empty string after trimming whitespace
    } else if (Array.isArray(value)) {
      return value.length !== 0; // For arrays, check if it's not an empty array
    } else if (typeof value === 'object' && value !== null) {
      return Object.keys(value).length !== 0; // For objects, check if it's not an empty object
    } else {
      return value !== undefined && value !== null; // For other types (numbers, booleans, etc.), check if it's not undefined or null
    }
}

/**
 * @param {String} buttonText string : Text dispayed in the cta button in the header
 * @param {String} buttonLink string : link to redirect the user when the button is clicked
 * @param {Object[]} dataList - Array of objects to use in the calcul of the progress : One obj looks like this : {data: "something", validationFunction: () => {}}
 */
const SingleBaseProgressBar = props => {

    const {
        buttonText,
        buttonLink,
        dataList
    } = props;

    const calculOfProgress = useCallback(listOfItem => {
        //Prevent error if undefined
        if(!listOfItem)
            return 

        //Initialize the ratio variables
        let filled = 0;
        let empty = 0;
        //Loop through the values
        listOfItem.forEach(item => {
            if(item.validationFunction){
                //Use specific validation
                if(item.validationFunction(item.data)){
                    filled++;
                } else {
                    empty++;
                }
            } else {
                //Use regular validation
                if(isValueFilled(item.data)){
                    filled++;
                } else {
                    empty++;
                }
            }
        });
        //Lets calculate and return the ratio
        return Math.round((filled * 100) / (filled + empty))
    }, [dataList])

    //Authentication context
    const auth = useAuth();


    return (
        <section className={`d-flex flex-column align-items-center ${styles['progress-bar']}`}>
            {dataList && dataList.length > 0 && <strong><p>Profil rempli à {calculOfProgress(dataList)}%</p></strong>}
            <div className="d-flex justify-content-center">
                {buttonText && buttonLink ?
                    (auth.user.isLoggedIn ?
                        <Button className={`shadow`} href={buttonLink}>{buttonText}</Button>
                        :
                        <div className="d-flex flex-column align-items-center">
                            <p>{lang.authInvitationToContribute}</p>
                            <Button className={`shadow`} href="/compte/connexion">{lang.menuConnectLabel}</Button>
                        </div>
                    )
                    :
                    <></>
                }
            </div>
        </section>
    )
}

export default SingleBaseProgressBar;