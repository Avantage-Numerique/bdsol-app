import {useState} from "react";
import Button from "@/src/common/FormElements/Button/Button";
import {RouteLink} from "@/src/common/Components/RouteLink";
import Icon from "@/src/common/widgets/Icon/Icon";
import {lang} from "@/src/common/Data/GlobalConstants";


const SingleSaveEntityReminder = ({ submitHandler, closeModal, ...props}) => {

    const [agreedReminder, setAgreedReminder] = useState(false);

    return (
        <div>
            <header className={`d-flex mb-4 align-items-center`}>
                <b className="col-10">Avant de sauvegarder</b>
                <Button className="col-2" onClick={closeModal}>Fermer</Button>
            </header>
            <p>Avant de soumettre les données et de les rendre publiques et accessibles à tous, comme cela est indiqué dans les <RouteLink routeName={"termOfUse"}/>, nous vous rappelons qu’il est important de vous assurer d'avoir le droit ou les autorisations nécessaires pour les partager et rendre disponibles. Il est aussi important que vous respectiez les lois en vigueur concernant ces données, incluant les lois concernant la vie privée si les données concernent un individu.</p>
            <br/>
            <div className="py-2 row form-check flex-nowrap d-flex no-wrap">
                <input
                    id="checkboxReminder"
                    readOnly
                    className="form-check-input col-4"
                    role="button"
                    type="checkbox"
                    onClick={() => setAgreedReminder(!agreedReminder)}
                    checked={agreedReminder}
                />
                <label for="checkboxReminder" className="form-check-label col-8">En cochant cette case, vous confirmez détenir les droits ou autrement avoir les autorisations ou licences nécessaires pour partager ces données.</label>
            </div>
            <Button className='fs-6' size="slim" color="success" disabled={!agreedReminder} onClick={submitHandler}>
                <Icon iconName={"save"} />&nbsp;{lang.capitalize("save")}
            </Button>
        </div>
    )
}
export default SingleSaveEntityReminder;