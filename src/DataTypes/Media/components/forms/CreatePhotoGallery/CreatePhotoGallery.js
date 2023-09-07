import Button from "@/src/common/FormElements/Button/Button"
import { lang } from "@/src/common/Data/GlobalConstants"
import { useModal } from "@/src/hooks/useModal/useModal";
import CreateMediaForm from "../CreateMedia/CreateMediaForm";


const CreatePhotoGallery = ({entity, ...props}) => {

    const {displayModal, modal, closeModal, Modal} = useModal();

    
    return (
        <div>
            <label>{lang.photoGallery}</label>
            <Button onClick={displayModal}>{lang.addPhotoGallery}</Button>

            {
                modal.display &&
                <Modal
                    coloredBackground
                    darkColorButton
                >
                    <header className="d-flex justify-content-between align-items-center">
                        <h3 className="m-0 fs-4 fw-normal">Téléverser un ficher média</h3>
                        <Button onClick={closeModal} size="slim">Fermer</Button>
                    </header>
                    {/* Separation line */}
                    <div className="border-bottom w-100 my-2"></div>
                    <CreateMediaForm
                        initValues={{}}
                        entity={entity}
                        mediaField="photoGallery"
                        positiveRequestActions={{//CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: (requestResponse) => {
                                //refreshImage(requestResponse);
                                closeModal();
                            }
                        }}
                        //setter={setter}
                    />
                </Modal>
            }
        </div>
    )
}
export default CreatePhotoGallery