//Component
import Input from "@/src/common/FormElements/Input/Input";
import Repeater from "@/src/common/FormElements/Repeater/Repeater";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SelectFetch from "@/src/common/FormElements/Select/SelectFetch";

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
                            label="Lapse de temps avant la complétion"
                            formTools={formTools}
                        />
                        
                        <SingleInfo
                            title="Les étapes du projet"
                            className="py-3"
                        >
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
                                <div className="my-2 bg-greyBg rounded-1">
                                    <section className="row my-2 align-items-end">
                                        <Input
                                            className="col-12 col-lg-4"
                                            name="step"
                                            label="Nom de l'étape"
                                            formTools={formTools}
                                        />
                                        <SelectFetch 
                                            className="col-12 col-md-6 col-lg-4"
                                            name="eta"
                                            label="Temps de complétion"
                                            formTools={formTools}
                                            noValueText={lang.noSelectedOption}
                                            fetchOption="timeframeeta-enum"
                                        />
                                        <SelectFetch 
                                            className="col-12 col-md-6 col-lg-4"
                                            name="budgetRange"
                                            label="Budget approximatif"
                                            formTools={formTools}
                                            noValueText={lang.noSelectedOption}
                                            fetchOption="budgetrange-enum"
                                        />
                                    
                                    </section>

                                    <div className="cold mb-2 d-flex justify-content-end">
                                        <button 
                                            repeaterDeleteElem={true}
                                            type="button" 
                                            className="btn underlined-button text-danger py-1">
                                                Supprimer l'étape
                                        </button>
                                    </div>
                                </div>
                            </Repeater>
                        </SingleInfo>
                    </div>
                    <div className="ps-4"></div>
                </div>
            </SingleInfo>
        </>
    )

}

export default UpdateScheduleBudget;