//Component
import Input from "@/src/common/FormElements/Input/Input";
import Repeater from "@/src/common/FormElements/Repeater/Repeater";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SelectFetch from "@/src/common/FormElements/Select/SelectFetch";
import Button from '@/src/common/FormElements/Button/Button';

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";
import {useEffect} from "react";
import {getDateFromIsoString} from "@/src/utils/DateHelper";

/**
 * @param {string} name Name of formState value
 * @param {formTools} formTools
 * @param {object} parentEntity object data of entity that uses the structure of timeframe
 */
const UpdateScheduleBudget = ({name, formTools, ...props}) => {

    useEffect( () => {
        const { startDate, endDateEstimate, completionDate } = formTools.formState.inputs;
        startDate.value = getDateFromIsoString(startDate.value);
        endDateEstimate.value = getDateFromIsoString(endDateEstimate.value);
        completionDate.value = getDateFromIsoString(completionDate.value);
    }, [])

    return (
        <div className="px-4 border-start">
                <div className="d-flex">
                    <div className="w-100 row">
                        <Input
                            className="col-12 col-md-6"
                            name="startDate"
                            label="Date de début"
                            type="date"
                            formTools={formTools}
                        />
                        <Input
                            className="col-12 col-md-6"
                            name="endDateEstimate"
                            label="Date estimée de fin"
                            type="date"
                            formTools={formTools}
                        />
                        <Input
                            className="col-12 col-md-6"
                            name="completionDate"
                            label="Date de fin"
                            type="date"
                            formTools={formTools}
                        />
                        <Input
                            className="col-12 col-md-6"
                            name="estimatedTotalBudget"
                            label="Budget total"
                            type="number"
                            formTools={formTools}
                        />
                        <Input
                            className="col-12 col-md-6"
                            name="eta"
                            label={lang.duration}
                            formTools={formTools}
                        />
                        
                        <SingleInfo
                            title="Les étapes du projet"
                            className="pt-3"
                            isSubtitle
                        >
                            <Repeater
                                formTools={formTools}
                                name="timeframe"
                                sortable
                                className="bg-greyBg"
                                formInitStructure={{
                                    step: {
                                        value: "",
                                        isValid: false
                                    },
                                    eta: {
                                        value: "",
                                        isValid: true
                                    },
                                    budgetRange: {
                                        value: "",
                                        isValid: true
                                    }
                                }}
                                initValues={props.parentEntity?.scheduleBudget?.timeframe ?? []}
                            >
                                <div className="my-2">
                                    <section className="row my-2 align-items-end">
                                        <Input
                                            className="col-12 col-lg-4"
                                            name="step"
                                            label="Nom de l'étape"
                                            formTools={formTools}
                                            validationRules={[
                                                {name: "REQUIRED"}
                                            ]}
                                        />
                                        <SelectFetch 
                                            className="col-12 col-md-6 col-lg-4"
                                            name="eta"
                                            label={lang.duration}
                                            formTools={formTools}
                                            noValueText={lang.noSelectedOption}
                                            fetchOption="timeframeeta-enum"
                                            /* validationRules={[
                                                {name: "REQUIRED"}
                                            ]} */
                                            
                                        />
                                        <SelectFetch 
                                            className="col-12 col-md-6 col-lg-4"
                                            name="budgetRange"
                                            label="Budget approximatif"
                                            formTools={formTools}
                                            noValueText={lang.noSelectedOption}
                                            fetchOption="budgetrange-enum"
/*                                             validationRules={[
                                                {name: "REQUIRED"}
                                            ]} */
                                        />
                                    
                                    </section>

                                    <div className="cold mb-2 d-flex justify-content-end">
                                        <Button 
                                            repeaterDeleteElem
                                            type="button" 
                                            color="danger" 
                                            size="slim"
                                        >
                                            Supprimer l'étape
                                        </Button>
                                    </div>
                                </div>
                            </Repeater>
                        </SingleInfo>
                    </div>
                </div>
        </div>
    )

}

export default UpdateScheduleBudget;