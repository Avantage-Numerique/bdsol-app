import React from "react";

//components
import Input from "@/src/common/FormElements/Input/Input";
import Repeater from "@/src/common/FormElements/Repeater/Repeater";
import { lang } from "@/src/common/Data/GlobalConstants";

const UpdateSocialHandles = ({ parentEntity, name, formTools, ...props }) => {
    const showLabel = false && props.label && props.label !== false; //set to false there because a lot of forms use this but don't want to.
    return (
        <>
            {showLabel && <label htmlFor={name}>{props.label}</label>}
            <Repeater
                className="bg-greyBg"
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
                        <Input
                            className="col-12"
                            label={"Description du lien" + lang.required}
                            name="label"
                            validationRules={[{ name: "REQUIRED" }]}
                        />
                        <Input
                            className="col-12"
                            name="url"
                            label={lang.url + lang.required}
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

export default UpdateSocialHandles;
