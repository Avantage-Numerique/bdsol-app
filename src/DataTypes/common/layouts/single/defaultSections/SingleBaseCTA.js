//Component
import MainImageDisplay from "./MainImageDisplay/MainImageDisplay";
import Button from "@/src/common/FormElements/Button/Button";
import Icon from "@/src/common/widgets/Icon/Icon";

//Utils
import { lang } from "@/src/common/Data/GlobalConstants";

//Hooks
import AppRoutes from "@/src/Routing/AppRoutes";

import Popover from "@/src/common/Components/Popover/Popover";

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
    saveIntentionSetter,
    ...props
}) => {
    function redirectHandler() {
        if (model._id != undefined) return model.singleLink;
        return AppRoutes.contribute.asPath;
    }

    //Return edit mode
    if (formTools) {
        const tip = {
            header: lang.invalidForm,
            body: (
                <>
                    <p>{lang.validationFailedCantSave}</p>

                    {formTools.mapInvalidInput()}
                </>
            ),
        };

        return (
            <>
                <div
                    className="d-contents d-md-flex flex-wrap align-items-center justify-content-between gap-2 gap-md-3 gap-lg-4 mb-5 mb-md-0 mt-2"
                    style={{
                        transform: "translateY(50%)",
                    }}
                >
                    <MainImageDisplay
                        buttonClasses="fs-6"
                        mainImage={mainImage}
                        entity={model}
                        setter={mainImageSetter}
                    />
                    <div className="d-flex flex-wrap align-items-start align-items-md-center justify-content-between flex-column flex-sm-row gap-2 gap-md-3 gap-lg-4 my-3 my-md-0">
                        {!formTools.formState.isValid && (
                            <span className="bg-white border border-warning rounded-pill lh-1 align-middle d-flex align-items-center p-1 ps-3">
                                <Popover
                                    icon="exclamation-circle"
                                    triggerText={lang.invalidForm}
                                    title={tip.header}
                                    body={tip.body}
                                />
                            </span>
                        )}

                        <Button
                            className="fs-6"
                            size="slim"
                            color="success"
                            disabled={!formTools.formState.isValid}
                            onClick={() => {
                                saveIntentionSetter(true);
                                saveEntityReminderModal.displayModal();
                            }}
                        >
                            <Icon iconName={"save"} />
                            &nbsp;{lang.capitalize("save")}
                        </Button>
                        <Button className="fs-6" size="slim" color="primary-light" href={redirectHandler()}>
                            <Icon iconName={"times"} />
                            &nbsp;{lang.Cancel}
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    //Else return view mode with suggest modification button
    return (
        <div
            style={{
                height: "1rem",
                transform: "translateY(50%)",
            }}
            className="position-relative flex-grow-1 d-flex align-items-center"
        >
            <div className="d-flex justify-content-end w-100">
                <Button className={`btn-contribute shadow d-block`} href={model.singleEditLink}>
                    {lang.contributeButtonLabel}
                </Button>
            </div>
        </div>
    );
};

export default SingleBaseCTA;
