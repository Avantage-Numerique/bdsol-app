import React from "react";

//components
import Input from "@/src/common/FormElements/Input/Input";
import Repeater from "@/src/common/FormElements/Repeater/Repeater";
import { lang } from "@/src/common/Data/GlobalConstants";
import Popover from "@/src/common/Components/Popover/Popover";

const UpdateSameAs = ({ parentEntity, name, formTools, ...props }) => {
    return (
        <>
            <div className={"d-flex align-items-center justify-content-between"}>
                <label htmlFor={name}>{props.label}</label>
                <Popover title="Web Sémantique" body='Propriété "sameAs" du web sémantique' />
            </div>
            <Repeater
                className=""
                formTools={formTools}
                name={name}
                sortable
                formInitStructure={{
                    label: {
                        value: "",
                        isValid: false,
                    },
                    url: {
                        value: "",
                        isValid: false,
                    },
                }}
                initValues={parentEntity[name]}
            >
                <div className="d-flex gap-3 mb-2 border-b py-2 rounded-1">
                    {/* Content of the elements */}
                    <section className="row col">
                        <Input className="col-12" label={"Description du lien"} name="label" />
                        <Input
                            className="col-12"
                            name="url"
                            label={lang.sameAsUrl + lang.required}
                            type="url"
                            //pattern="^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                            placeholder="Exemple : https://siteWeb.com"
                            validationRules={[{ name: "REQUIRED" }]}
                        />
                    </section>
                </div>
            </Repeater>
        </>
    );
};

export default UpdateSameAs;
