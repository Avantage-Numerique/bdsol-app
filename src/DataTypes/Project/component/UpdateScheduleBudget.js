//Component
import Input from "@/src/common/FormElements/Input/Input";
import Repeater from "@/src/common/FormElements/Repeater/Repeater";
import SingleInfo from "../../common/layouts/SingleInfo/SingleInfo";
import SelectFetch from "@/src/common/FormElements/Select/SelectFetch";
import Button from "@/src/common/FormElements/Button/Button";

//Utils
import { lang } from "@/src/common/Data/GlobalConstants";
import { useEffect } from "react";
import { getDateFromIsoString } from "@/src/utils/DateHelper";

/**
 * @param {string} name Name of formState value
 * @param {formTools} formTools
 * @param {object} parentEntity object data of entity that uses the structure of timeframe
 */
const UpdateScheduleBudget = ({name, formTools, ...props}) => {

    useEffect( () => {
        const { startDate, endDateEstimate, completionDate } = formTools.formState.inputs;
        console.log(startDate, endDateEstimate, completionDate)
        console.log(getDateFromIsoString(startDate.value))
        startDate.value = getDateFromIsoString(startDate.value);
        endDateEstimate.value = getDateFromIsoString(endDateEstimate.value);
        completionDate.value = getDateFromIsoString(completionDate.value);
    }, [])

    return (
        <>
            <SingleInfo
                title={props.label}
                className="py-3"
            >
                <div className="d-flex">
                    <div className="ps-4 border-start"></div>
                    <div className="w-100">
                        <Input
                            name="startDate"
                            label="Date de début"
                            type="date"
                            formTools={formTools}
                        />
                        <Input
                            name="endDateEstimate"
                            label="Date estimée de fin"
                            type="date"
                            formTools={formTools}
                        />
                        <Input
                            name="completionDate"
                            label="Date de fin"
                            type="date"
                            formTools={formTools}
                        />
                        <Input
                            name="estimatedTotalBudget"
                            label="Budget total"
                            type="number"
                            formTools={formTools}
                        />
                        <Input
                            name="eta"
                            label="Lapse de temps avant la complétion"
                            formTools={formTools}
                        />
                        
                        <label className="pt-3">Échéancier</label>
                        <div className="p-3">
                            <Repeater
                                formTools={formTools}
                                name="timeframe"
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
                                <article className="row my-2 bg-white border-top">
                                    <section className="col my-2">
                                        <Input
                                            name="step"
                                            label="Étape"
                                            formTools={formTools}
                                        />
                                        <SelectFetch 
                                            name="eta"
                                            label="Temps de complétion de l'étape"
                                            formTools={formTools}
                                            noValueText={lang.noSelectedOption}
                                            fetchOption="timeframeeta-enum"
                                        />
                                        <SelectFetch 
                                            name="budgetRange"
                                            label="Choisissez une intervalle de budget"
                                            formTools={formTools}
                                            noValueText={lang.noSelectedOption}
                                            fetchOption="budgetrange-enum"
                                        />
                                    </section>

                                    <div className="col pr-0 flex-grow-0 text-secondary pt-3">
                                        <Button repeaterDeleteElem={true} type="button" color="danger" size="slim">&#x2716;</Button>
                                    </div>
                                </article>
                            </Repeater>
                        </div>
                        
                        
                    </div>
                    <div className="ps-4"></div>
                </div>
            </SingleInfo>
        </>
    )

}

export default UpdateScheduleBudget;