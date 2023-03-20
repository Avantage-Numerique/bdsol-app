import React from 'react';

//hooks
import { useModal } from '@/src/hooks/useModal/useModal';
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';


//components
import Button from "@/FormElements/Button/Button"
import Input from '@/src/common/FormElements/Input/Input';
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag';



const Group = () => {

    const {FormUI, submitRequest, formState, formTools} = useFormUtils({
        groupName: {
            value: "",
            isValid: false
        },
        skillList: {
            value: "",
            isValid: true
        }
    })

    return (
        <article className="row border border-secondary p-2 my-2">
            {/* Icone to move the element */}
            <div className="col flex-grow-0 fs-2 text-secondary">
                &#x292D;
            </div>
            {/* Content of the elements */}
            <section className="col">
                <div className="d-flex justify-content-between align-items-end my-2"> 
                    <h4>Nom du groupe</h4>
                    <Button color="danger" size="slim">
                        &#x2716;
                    </Button>
                </div>
                <Input 
                    name="groupName"
                    formTools={formTools}
                />
                <Select2Tag
                    searchField="name"
                    fetch="/taxonomies/list"
                    requestData={{category:"occupations", name:""}}
                    name="skillList"
                    idField="offer"
                    formTools={formTools}
                />
            </section>
        </article>
    )
}

const UpdateSkillGroup = () => {

    const { Modal, closeModal } = useModal();



    return (
        <> 
            <Modal>

                <form className="w-100">

                    <Group />
                    <Group />


                </form>
 
            </Modal>
        </>
    )
};


export default UpdateSkillGroup;