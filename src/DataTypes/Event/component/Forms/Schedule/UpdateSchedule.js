
import Repeater from "@/src/common/FormElements/Repeater/Repeater";
import Input from "@/src/common/FormElements/Input/Input";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import { lang } from "@/src/common/Data/GlobalConstants";

const UpdateSchedule = ({name, formTools, schedule, ...props}) => {

    return (
        <SingleInfo
            title={props.label}
            className="py-3"
        >
            <div className='px-4 border-start'>

            <Repeater
                formTools={formTools}
                name={name}
                formInitStructure={{
                    name: {
                        value: "",
                        isValid:false,
                    },
                    startDate: {
                        value: "",
                        isValid: false
                    },
                    startTime: {
                        value: "",
                        isValid: true
                    },
                    endDate: {
                        value: "",
                        isValid: false
                    },
                    endTime: {
                        value: "",
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
                            formTools={formTools}
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
                        />
                        <div className="col-md-12 col-lg-8">
                            <h6 className="col text-dark fw-normal mb-1 mt-1">Début</h6>
                            <div className="col-12 bg-secondarylight p-2 mb-2 rounded-1" >
                                <div className="row">
                                    <Input
                                        className="col-sm-12 col-md-7"
                                        name="startDate"
                                        //label={lang.startDate}
                                        formTools={formTools}
                                        type="date"
                                        validationRules={[
                                            {name: "REQUIRED"}
                                        ]}
                                    />
                                    <Input
                                        className="col-sm-12 col-md-5"
                                        name="startTime"
                                        //label={lang.startTime}
                                        formTools={formTools}
                                        type="time"
                                    />
                                </div>
                            </div>
                            <h6 className="col text-dark fw-normal mb-1 mt-1">Fin</h6>
                            <div className="col-12 bg-secondarylight rounded-1 p-2">

                                <div className="row">
                                    <Input
                                        className="col-sm-12 col-md-7"
                                        name="endDate"
                                        //label={lang.endDate}
                                        formTools={formTools}
                                        type="date"
                                        validationRules={[
                                            {name: "REQUIRED"}
                                        ]}
                                    />
                                    <Input
                                        className="col-sm-12 col-md-5"
                                        name="endTime"
                                        //label={lang.endTime}
                                        formTools={formTools}
                                        type="time"
                                    />  
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="cold mb-2 d-flex justify-content-end">
                        <button 
                            repeaterdeletedlem={true}
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
