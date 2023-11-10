import Repeater from "@/src/common/FormElements/Repeater/Repeater";
import Input from "@/src/common/FormElements/Input/Input";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {lang} from "@/src/common/Data/GlobalConstants";

const UpdateSchedule = ({name, formTools, schedule, ...props}) => {

    //min
    //max
    //for now time min max would be not, maybe if min max date == same ?
    const minDate = props.minDate ?? undefined;
    const maxDate = props.maxDate ?? undefined;
    const minTime = props.minTime ?? undefined;
    const maxTime = props.maxTime ?? undefined;

    return (
        <SingleInfo
            title={props.label}
            className="py-3"
        >
            <div className='px-4 border-start'>

                {props.description &&
                    <p>{props.description}</p>
                }

            <Repeater
                formTools={formTools}
                name={name}
                sortable
                className="bg-greyBg"
                formInitStructure={{
                    name: {
                        value: "",
                        isValid:false,
                    },
                    startDate: {
                        value: minDate ?? "",
                        isValid: false
                    },
                    startTime: {
                        value: minTime ?? "",
                        isValid: true
                    },
                    endDate: {
                        value: maxDate ?? "",
                        isValid: false
                    },
                    endTime: {
                        value: maxTime ?? "",
                        isValid: true
                    },
                }}
                initValues={schedule ?? []}
            >
                <div className="my-2 bg-greyBg rounded-1">
                    <section className="row my-2 align-items-start">
                        <Input
                            className="col-md-12 col-lg-4 mb-2"
                            name="name"
                            label={lang.name}
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
                        />
                        <div className="col-md-12 col-lg-8">
                            <h6 className="col text-dark fw-normal mb-1 mt-1">Début</h6>
                            <div className="col-12 bg-secondary-light p-2 mb-2 rounded-1" >
                                <div className="row">
                                    <Input
                                        className="col-sm-12 col-md-7"
                                        name="startDate"
                                        //label={lang.startDate}
                                        type="date"
                                        min={minDate}
                                        max={maxDate}
                                        validationRules={[
                                            {name: "REQUIRED"}
                                        ]}
                                    />
                                    <Input
                                        className="col-sm-12 col-md-5"
                                        name="startTime"
                                        //label={lang.startTime}
                                        type="time"
                                    />
                                </div>
                            </div>
                            <h6 className="col text-dark fw-normal mb-1 mt-1">Fin</h6>
                            <div className="col-12 bg-secondary-light rounded-1 p-2">
                                {/* adjust that live to avoid past of endDate */}
                                <div className="row">
                                    <Input
                                        className="col-sm-12 col-md-7"
                                        name="endDate"
                                        //label={lang.endDate}
                                        type="date"
                                        min={minDate}
                                        max={maxDate}
                                        validationRules={[
                                            {name: "REQUIRED"}
                                        ]}
                                        value={minDate}
                                    />
                                    <Input
                                        className="col-sm-12 col-md-5"
                                        name="endTime"
                                        //label={lang.endTime}
                                        type="time"
                                        min={minTime}
                                        max={maxTime}
                                        value={minTime}
                                    />  
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="cold mb-2 d-flex justify-content-end">
                        <button 
                            repeaterDeleteElem
                            type="button" 
                            className="btn underlined-button text-danger py-1">
                                Supprimer l'étape
                        </button>
                    </div>
                </div>
            </Repeater>
            </div>
        </SingleInfo>
    );
}
export default UpdateSchedule;
