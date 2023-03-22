import { useEffect } from 'react';

//hooks
import { useModal } from '@/src/hooks/useModal/useModal';
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';


//components
import Button from "@/FormElements/Button/Button"
import Input from '@/src/common/FormElements/Input/Input';
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag';
import Icon from '@/src/common/widgets/Icon/Icon';

//styling
import styles from './UpdateSkillGroup.module.scss';



const Group = () => {

    const {FormUI, submitRequest, formState, formTools} = useFormUtils({
        groupName: {
            value: "",
            isValid: false
        },
        skillList: {
            value: [],
            isValid: true
        },
        groupName1: {
            value: "",
            isValid: false
        },
        skillList1: {
            value: [],
            isValid: true
        },
        groupName2: {
            value: "",
            isValid: false
        },
        skillList2: {
            value: [],
            isValid: true
        }
    })

    useEffect(() => {

        console.log("formState", formState)

    }, [formState])

    return (
        <article className={`
            row border border-1 rounded p-2 my-2 bg-white
            ${styles["update-skill-group"]}
        `}>
            {/* Icone to move the element */}
            <div className="col flex-grow-0 fs-2 text-secondary">
                <Icon iconName={"arrows-alt-v"} />
            </div>
            {/* Content of the elements */}
            <section className={`
                col
                ${styles["skill-group-inputs-container"]}
            `}>
                <div className="d-flex justify-content-between align-items-end my-2">
                    <h4>Occupation / groupe de compétences</h4> 
                    <Button type="button" color="danger" size="slim">
                        &#x2716;
                    </Button>
                </div>
                <Input 
                    label="Nom de groupe"
                    name="groupName"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    formTools={formTools}
                />
                <Select2Tag
                    label="Attribuer des compétences"
                    searchField="name"
                    fetch="/taxonomies/list"
                    requestData={{category:"occupations", name:""}}
                    name="skillList"
                    idField="skill"
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