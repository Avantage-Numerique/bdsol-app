
import Repeater from "@/src/common/FormElements/Repeater/Repeater";
import Input from "@/src/common/FormElements/Input/Input";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import { lang } from "@/src/common/Data/GlobalConstants";

const UpdateSchedule = ({name, formTools, ...props}) => {

    return (
        <SingleInfo
            title={props.label}
            className="py-3"
        >
            <Repeater
                formTools={formTools}
                name="schedule"
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
                initValues={props.parentEntity?.schedule ?? []}
            >
                <div className="my-2 bg-greyBg rounded-1">
                    <section className="row my-2 align-items-end">
                        <Input
                            className="col-12 col-md-4"
                            name="name"
                            label={lang.name}
                            formTools={formTools}
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
                        />
                        <Input
                            className="col-12 col-md-4"
                            name="startDate"
                            label={lang.startDate}
                            formTools={formTools}
                            type="date"
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
                        />
                        <Input
                            className="col-12 col-md-4"
                            name="startTime"
                            label={lang.startTime}
                            formTools={formTools}
                            type="time"
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
                        />
                        
                        <div className="col-md-4"></div> {/* <--- please remove this attrocity (used to fix column (4-4-4) ) */}
                        <Input
                            className="col-12 col-md-4"
                            name="endDate"
                            label={lang.endDate}
                            formTools={formTools}
                            type="date"
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
                        />
                        <Input
                            className="col-12 col-md-4"
                            name="endTime"
                            label={lang.endTime}
                            formTools={formTools}
                            type="time"
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
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
    );
}
export default UpdateSchedule;
