import {useEffect, useState} from 'react';
import {useHttpClient} from '@/src/hooks/http-hook';

//Styling
import styles from './SelectLicence.module.scss'

//Component
import Select from '@/FormElements/Select/Select';
import Button from '@/src/common/FormElements/Button/Button'
import HtmlTagsRemover from '@/src/utils/HtmlTagsRemover';
import { lang } from '../../Data/GlobalConstants';


const SelectLicence = ({name, formTools, ...props}) => {

    const { sendRequest } = useHttpClient();

    const {
        formState,
        inputHandler,
        //inputTouched
    } = formTools;

    const [licences, setLicences] = useState([])

    //useEffect( () => {console.log("formstate licence", formState.inputs[name])}, [formState])//commented reactivate to tests.
    
    //Fetch licence list on load
    useEffect(() => {
        const fetchLicences = async () =>
        {
            //Send the request with the specialized hook
            const response = await sendRequest(
                '/static/licences/',
                'GET',
                null
            );

            //If response is positive, update the state and pass the result to the select input
            if (!response.error) {
                let options = []/* 
                    {
                        label: '-- Choisissez une licence --',
                        value: '-1',
                        disabled: false,
                        guide: "",
                        image: ""
                    }
                ]; */
                Object.keys(response.data).map((licenceKey) => {
                        options.push({
                            label: response.data[licenceKey].label,
                            value: licenceKey,
                            disabled: false,
                            guide: response.data[licenceKey].guide,
                            image: response.data[licenceKey].image
                        });
                    }
                );
                setLicences(options);
            }
        }
        fetchLicences();
    }, [])


    return (
        <>
            <Select 
                name="licence"
                label={"Licence"+lang.required}
                options={licences}
                formTools={formTools}
                noValueText="Aucune sélection"
                tip={
                    {
                        header : "Recommandations",
                        body: "Nous recommandons, lorsque possible, de rendre les données disponibles dans le cadre de la licence libre et ouverte Creative Commons CC BY-NC-SA 4.0"
                    }
                }
                validationRules={[
                    {name: "REQUIRED"}
                ]}
            />
            <small>{
                formState.inputs[name].value &&
                <div className={`my-2 ${styles["licence-container"]} bg-greyBg`}>
                    <img 
                        src={licences.filter( (elem) => elem.value == formState.inputs.licence.value)[0]?.image} 
                        alt=""
                        className=""
                    />
                    <HtmlTagsRemover
                        className={``}
                    >
                        {licences.filter( (elem) => elem.value == formState.inputs.licence.value )[0]?.guide ?? ''}
                    </HtmlTagsRemover>
                    <Button className={`${styles["details-button"]}`} href="/faq/licences" text_color="secondary-darker">
                        Plus de détails sur les licences
                    </Button>
                </div>
                }
            </small>
        </>
    )
}
export default SelectLicence;