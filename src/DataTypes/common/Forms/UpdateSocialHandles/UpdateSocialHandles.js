import React from 'react';

//components
import Button from "@/FormElements/Button/Button"
import Input from '@/src/common/FormElements/Input/Input';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import { lang } from '@/src/common/Data/GlobalConstants';



const UpdateSocialHandles = ({parentEntity, name, formTools, ...props}) => {

    return (
        <SingleInfo
            title={props.label}
            className="py-3"
        >
            <div className='px-4 border-start'>
                <Repeater
                    className="bg-greyBg"
                    formTools={formTools}
                    name={name}
                    sortable
                    formInitStructure={{
                        label: {
                            value: "",
                            isValid: false
                        },
                        url: {
                            value: "",
                            isValid: false
                        }
                    }}
                    initValues={parentEntity[name]}
                >
                    <div className="d-flex gap-3 mb-2 border-b py-2 rounded-1">
                        {/* Content of the elements */}
                        <section className="row col">
                            <Input
                                className="col-12 col-md-6"
                                label={"Nom"}
                                name="label"
                                validationRules={[
                                    {name: "REQUIRED"}
                                ]}
                            />
                            <Input  
                                className="col-12 col-md-6"
                                name="url"
                                label={lang.url}
                                type="url"
                                //pattern="^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                                placeholder="Exemple : https://siteWeb.com"
                                validationRules={[
                                    {name: "REQUIRED"}
                                ]}
                            />
                        </section>
                        {/* Delete element */}
                        <div className="col pr-0 flex-grow-0 text-secondary pt-1">
                            <Button 
                                repeaterDeleteElem={true} 
                                type="button" 
                                color="danger" 
                                size="slim"
                            >&#x2716;</Button>
                        </div>
                    </div>

                </Repeater>
            </div>
        </SingleInfo>  
    )
};


export default UpdateSocialHandles;