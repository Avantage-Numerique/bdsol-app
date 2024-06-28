import React, {memo, useContext, useEffect, useRef, useState} from 'react'
//Styles
import styles from './SingleBaseHeader.module.scss';

//Component
import Button from '@/src/common/FormElements/Button/Button';
import MediaFigure from "@/DataTypes/Media/layouts/MediaFigure";
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import Icon from "@/common/widgets/Icon/Icon";

//Auth
import {useAuth} from '@/src/authentification/context/auth-context';
import {lang} from "@/common/Data/GlobalConstants";

//Hook
import {useRootModal} from '@/src/hooks/useModal/useRootModal';
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import {useHttpClient} from '@/src/hooks/http-hook';

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import { getBadgesInfo } from '@/src/DataTypes/Badges/BadgesSection';


//Memoize the image to prevent rerendering
const ImageComponent = memo(
    ({mainImage, badges}) => {
        const InnerLink = () => (
            <>
                { mainImage && mainImage.url !== "" && !mainImage.isDefault &&
                    <a href={`/medias/${mainImage._id}`}
                        className={`fs-4 w-100 h-100 position-absolute d-flex align-items-center justify-content-center p-1 ${styles["profile-picture--modification-opt"]} main-image-link`}>
                        <Icon iconName={"eye"} /> {lang.see}
                    </a>
                }
            </>
        )

        const [badgeToShowState, setBadgeToShowState] = useState(undefined);
        useEffect( () => {
            async function fetchBadge(){
                //If badges array exist in entity and is > 0 length fetch badges info
                if(badges !== undefined && Array.isArray(badges) && badges.length > 0 ){
                    const badgesInfo = await getBadgesInfo();
                    setBadgeToShowState(badgesInfo[badges[0]]);
                }
            }
            fetchBadge();
        }, [])

        return (
            <div className="col-12 col-sm d-flex flex-grow-0 align-items-end position-relative">
                {/* Base styling doesn't move down the picture since its not overflowing the container. A bit tricky with bootstrap grid so we need two components to apply different classes */}
                {/* Base format (small screens) */}
                <MediaFigure model={mainImage}
                             className={`d-sm-none main-image-container no-bottom-margin ${!mainImage.isDefault ? "overflow-hidden shadow" : (styles["default-drop-shadow"] + " default-img ")}`}
                             imgClassName={"main-image"}>
                    <InnerLink/>
                </MediaFigure>
                {/* SM format and more */}
                <MediaFigure model={mainImage}
                             className={`d-none d-sm-block main-image-container ${!mainImage.isDefault ? "overflow-hidden shadow" : (styles["default-drop-shadow"] + " default-img ")}`}
                             imgClassName={"main-image"}>
                    <InnerLink/>
                </MediaFigure>
                {
                    badgeToShowState !== undefined && 
                    (
                        <div className={"position-absolute top-100 start-100 translate-middle"} style={{marginLeft: "-20px"}}>
                            <img src={badgeToShowState?.iconPath} alt={badgeToShowState?.iconAlt ?? "Badge"} width="40px" height="40px"/>
                        </div>
                    )
                }
            </div>
        )
    }
)
/**
 * @param {object} mainImage mainImage data object
 * @param {object} entity used for mainImageForm
 * @param {JSX} title JSX element containing title (top left)
 * @param {JSX} subtitle JSX element containing subtitle (top left)
 * @param {string} entityType type that shows bottom right
 * @param {className} global classes passed from the outside
 * @param {JSX} buttonSection JSX element containing all the calls to action components in one place
 * @param {String} buttonText string : Text dispayed in the cta button in the header
 * @param {String} buttonLink string : link to redirect the user when the button is clicked
 * @param {String} editableImg bool : Show the button to edit image or not
 */
const SingleBaseHeader = (props) => {

    const {
        mainImage,
        entity,
        title,
        subtitle,
        className,
        buttonSection,
        buttonText,
        buttonLink,
        editableImg,
        children
    } = props;

    const auth = useAuth();
    const isUpdateMode = className?.includes("mode-update");

    //Modal hook
    const modalReportEntity = useRootModal();
    const {sendRequest} = useHttpClient();
    const msg = useContext(MessageContext);

    //Main modal form
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            /* name: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            }, */
            message: {
                value: '',
                isValid: false
            },
            reportedEntityId: {
                value: entity._id,
                isValid: true
            },
            reportedEntityType: {
                value: entity.type,
                isValid: true
            }
        },
        { displayResMessage: true }
    )

    const sendReportEntity = async () => {
        const apiResponse = await sendRequest(
            "/communications/report",
            'POST',
            JSON.stringify(
                {
                    data: {
                        reportedEntityId: entity._id,
                        reportedEntityType: entity.type,
                        userId: auth.user.id,
                        message: formState.inputs.message.value,
                    }
                }
            ),
            {'Content-Type': 'application/json'}
        );
        
        if(apiResponse.error){
            msg.addMessage({ 
                text: lang.reportingError,
                positive: false
            })
        }
        else{
            msg.addMessage({ 
                text: lang.reportingSuccess,
                positive: true
            });
            //formState.inputs.name.value = "";
            //formState.inputs.email.value = "";
            formState.inputs.message.value = "";
            modalReportEntity.closeModal();
        }  
    }

    //Removed from colomn, it's more useful to use the justify or align from start or end.
    return (
        <section className={`row ms-0  ${styles["content-padding-top"]} ${props.className}`}>
            <div className="d-flex justify-content-end">
                <button type="button" className="fs-3" onClick={modalReportEntity.displayModal}><Icon iconName="flag"/></button>
            </div>
            {mainImage && <ImageComponent mainImage={mainImage} badges={entity?.badges} />}
            <div className="col-12 col-sm flex-grow-1 d-flex flex-column">
                <div className="d-flex flex-column text-dark">
                    { title || <h1 className='mt-4 ms-4'>{lang.title}</h1> }
                    { subtitle || <h3 className='ms-4'>{lang.subTitle}</h3> }
                    <div className="d-sm-none mt-2">
                        {buttonSection && buttonSection}
                    </div>
                </div>
                { /* btnToggleViewEdit */ }
                {/* If a button section is declared, use it */}
                <div style={{height: "1rem"}} className="position-relative flex-grow-1 d-flex align-items-end">
                    <div className={`${styles["over-flowing-button-section"]} ${isUpdateMode && styles["edition-mode"]} d-flex justify-content-evenly w-100`}>
                        {/* Empty div to allow the button to take the second third of the width */}
                        <div></div>
                        <div className="d-none d-sm-block">
                            {buttonSection && buttonSection}
                        </div>
                        {/* If the is no button section and there is a single button declared, display it */}
                        {!buttonSection && buttonText && buttonLink ?
                            (auth.user.isLoggedIn ?
                                <Button className={`shadow`} href={buttonLink}>{buttonText}</Button>
                                :
                                <Button className={`shadow`} href="/compte/connexion">{buttonText}</Button>)
                                :
                                <></>
                            }
                    </div>
                </div>
            </div>
            {children &&
                <div className="col-12 order-3 pt-2">
                    {children}
                </div>
            }
            <modalReportEntity.Modal>
                <div>
                    <header className={`d-flex mb-4 align-items-center`}>
                        <strong className="col-10">{lang.reportBtnLabel}</strong>
                        <Button className="col-2" onClick={modalReportEntity.closeModal}>{lang.close}</Button>
                    </header>
                    <RichTextarea
                        className="py-1"
                        name="message"
                        label={lang.message}
                        validationRules={[
                            {name: "REQUIRED"}
                        ]}
                        formTools={formTools}
                    />
                    <Button disabled={!formState.isValid} onClick={sendReportEntity}>Envoyer</Button>
                </div>
            </modalReportEntity.Modal>
        </section>
    )

}

export default SingleBaseHeader;