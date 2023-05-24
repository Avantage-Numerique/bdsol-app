//Component
import Input from "@/src/common/FormElements/Input/Input";
import Repeater from "@/src/common/FormElements/Repeater/Repeater";
import SingleInfo from "../../common/layouts/SingleInfo/SingleInfo";
import Select2 from "@/src/common/FormElements/Select2/Select2";
import Button from "@/src/common/FormElements/Button/Button";

//Utils
import { lang } from "@/src/common/Data/GlobalConstants";


/**
 * @param {string} name Name of formState value
 * @param {formTools} formTools
 * @param {object} parentEntity object data of entity that uses the structure of team
 */
const UpdateSponsor = ({name, formTools, ...props}) => {

    return (
        <>
            <SingleInfo
                title={props.label}
                className="py-3"
            >
                <div className="d-flex">
                    <div className="ps-4 border-start"></div>
                    <div className="w-100">
                        <Repeater
                            formTools={formTools}
                            name={name}
                            formInitStructure={{
                                name: {
                                    value: "",
                                    isValid: false
                                },
                                entity: {
                                    value: "",
                                    isValid: true
                                },
                                entityType: {
                                    value: "",
                                    isValid: true
                                }
                            }}
                            initValues={props.parentEntity?.sponsor ?? []}
                        >
                            <article className="row my-2 bg-white border-top">
                                <section className="col my-2">
                                    <Select2
                                        name="entity"
                                        label="Partenaire"
                                        formTools={formTools}
                                        creatable={false}
                                        isMulti={false}

                                        fetch={"/organisations/list"}
                                        searchField={"name"}
                                        selectField={"name"}
                                    />
                                    <Input
                                        name="name"
                                        label="Nom"
                                        formTools={formTools}
                                    />
                                </section>

                                <div className="col pr-0 flex-grow-0 text-secondary pt-3">
                                    <Button repeaterDeleteElem={true} type="button" color="danger" size="slim">&#x2716;</Button>
                                </div>
                            </article>
                        </Repeater>
                        
                        
                    </div>
                    <div className="ps-4"></div>
                </div>
            </SingleInfo>
        </>
    )

}

export default UpdateSponsor;