//Component
import MainImageDisplay from "./MainImageDisplay/MainImageDisplay";
import Button from "@/src/common/FormElements/Button/Button";
import Icon from "@/src/common/widgets/Icon/Icon";

//Utils
import { lang } from "@/src/common/Data/GlobalConstants";

//Hooks
import { useRouter } from "next/router";

/**
 * @param {object} model **REQUIRED** only field that needs to be passed in props on single view mode.
 * 
 * @param {formTools} formTools
 * @param {object} mainImage mainImage data object
 * @param {setState} mainImageSetter State setter for updating mainImage current display
 * @param {Modal} saveEntityReminderModal Modal with the function ".displayModal()" to pop-up
 * @param {setState} saveIntentionSetter State setter for toggling the save intention for save modal
 */
const SingleBaseCTA = ({
    model,
    formTools,
    mainImage,
    mainImageSetter,
    saveEntityReminderModal,
    saveIntentionSetter, ...props }) => {

    //Router
    const router = useRouter();

    function mapInvalidInput() {
        const invalidInputsList = [];

        formTools.listInvalidInput().forEach((key, index) => {
<<<<<<< HEAD
            const displayText = formTools.formState.inputs[key].invalidMsg ?? lang[key] ?? (key + " - invalide");
=======
            const displayText = formState.inputs[key].invalidMsg ?? lang[key] ?? (key + " - invalide");
>>>>>>> 0c6a3b24 (Refactor singleBaseHeader CTA dans un component SinlgeBaseCTA. Prettify les files alors bcp de chose ont changé mais c'est seulement les singleBaseHeader qui ont maintenant SingleBaseCTA comme ctaSectionProps)
            invalidInputsList.push(
                <li key={`invalidInput-${key}-${index}`}>{lang.capitalize(displayText)}</li>
            )
        })
        return invalidInputsList;
    }

    //Return edit mode
    if (formTools) {
        return (
            <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 gap-md-3 gap-lg-4 mt-2">
                <MainImageDisplay buttonClasses="fs-6" mainImage={mainImage} entity={model} setter={mainImageSetter} />
                <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 gap-md-3 gap-lg-4">
<<<<<<< HEAD
                    {
                        !formTools.formState.isValid && (
                            <div className="fs-6 border border-danger rounded p-2">
                                {lang.validationFailedCantSave}
                                <ul>
                                    {mapInvalidInput()}
                                </ul>
                            </div>
                        )
                    }
=======
>>>>>>> 0c6a3b24 (Refactor singleBaseHeader CTA dans un component SinlgeBaseCTA. Prettify les files alors bcp de chose ont changé mais c'est seulement les singleBaseHeader qui ont maintenant SingleBaseCTA comme ctaSectionProps)
                    <Button className='fs-6' size="slim" color="success" disabled={!formTools.formState.isValid}
                        onClick={() => { saveIntentionSetter(true); saveEntityReminderModal.displayModal() }}
                    >
                        <Icon iconName={"save"} />&nbsp;{lang.capitalize("save")}
                    </Button>
                    <Button className='fs-6' size="slim" color="primary-light" href={model.singleLink}>
                        <Icon iconName={"times"} />&nbsp;{lang.Cancel}
                    </Button>
                </div>
            </div>
        )
    }

    //Else return view mode with suggest modification button
    return (
        <div style={{ height: "1rem" }} className="position-relative flex-grow-1 d-flex align-items-end">
            <div className="d-flex justify-content-end w-100">
                <Button className={`btn-contribute shadow d-block`} href={model.singleEditLink + `?redirect=${encodeURI(router.asPath)}`}>{lang.contributeButtonLabel}</Button>
            </div>
        </div>
    )
}

export default SingleBaseCTA;