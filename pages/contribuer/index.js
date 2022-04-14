
//Components
import Button from '../../app/common/FormElements/Buttons/Button/Button'

import styles from './contribution-page.module.scss'


const Index = () => {

    return (
        <div className={`col-12 ${styles["contribution-page"]}`}>
            
            <header className={`col-12`}>
                <div className="maxWidthPageContainer">
                    <h2 className={`col-12 blue`}>Créer une donnée</h2>
                </div>
            </header>
            <section className={`col-12`}>
                
                <div className="maxWidthPageContainer">
                    <h4>Sélectionnez le type d'entité que vous voulez ajouter</h4>
                    <Button>Personne</Button>
                    <Button disabled>Organisation</Button>
                    <Button disabled>Projet</Button>
                    <Button disabled>Événement</Button>
                    <Button disabled>Matériel</Button>


                </div>
            </section>

        </div>
    )

}

export default Index