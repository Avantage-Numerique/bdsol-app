import { useState, useEffect } from 'react';
import { useHttpClient } from '@/src/hooks/http-hook';

//Component
import Select from '@/FormElements/Select/Select';
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';


const SelectLicence = ({name, formTools, ...props}) => {

    const { sendRequest } = useHttpClient();

    const {
        formState,
        inputHandler,
        //inputTouched
    } = formTools;

    const [licences, setLicences] = useState([])
    
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
                label="Licence"
                options={licences}
                formTools={formTools}
            />
            <small className="fs-6">{
                formState.inputs[name].value &&
                <div>
                    <img src={
                        licences.filter( (elem) => {
                            return elem.value == formState.inputs.licence.value
                        })[0]?.image
                    } alt=""/>
                    <SanitizedInnerHtml>
                        {
                            licences.filter( (elem) => {
                                return elem.value == formState.inputs.licence.value
                            })[0]?.guide ?? ''
                        }
                    </SanitizedInnerHtml>
                </div>
                }
                <a href="/faq/licences" target="_blank">
                    Plus de détails sur les licences
                </a>
            </small>
        </>
    )
}
export default SelectLicence;