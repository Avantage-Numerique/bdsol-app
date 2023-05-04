import {useEffect, useState} from 'react';
import {clientSideExternalApiRequest} from '@/src/hooks/http-hook';

//Component
import Select from './Select';


const SelectFetch = (props) => {

    const [options, setOptions] = useState([])

    console.log(options)
    //Search suggestion
    useEffect( () => {
        const getSelectOptions = async () => {
            const optionList = await clientSideExternalApiRequest(
                '/info/' + props.fetchOption,
                { method: 'GET' }
            );
            setOptions("cdscds", optionList);
        }
        getSelectOptions();
    }, [])

    return (
        <Select
            name={props.name}
            formTools={props.formTools}
            tip={props.tip}
            label={props.label}
            noValueText={props.noValueText}
            options={options}
            //defaultValue={}
            validationRules={props.validationRules}
        />
    )
}

export default SelectFetch;