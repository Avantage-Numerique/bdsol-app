 
//Components
import Button from '../../app/common/FormElements/Buttons/Button/Button'

//styling
import styles from './contribution-page.module.scss'



const Index = () => {    

    return (
        <div className={`col-12 ${styles["contribution-page"]}`}>
            
            <header className={`col-12`}>

                <div className="maxWidthPageContainer">
                    <h1 className={`col-12 blue`}>Créer une donnée</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget est vitae justo hendrerit porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In lobortis justo eu ex euismod, vel efficitur ligula varius. Sed rhoncus lectus nisl, id vestibulum magna laoreet at. Sed sollicitudin sit amet.</p>
                </div>

            </header>

            <section className={`col-12`}>
                
                {/* Menu for the differents forms */}
                <div className={`maxWidthPageContainer`}>
           
                    <div className={`col-12 ${styles["contribution-page__menu"]}`}>
                        <h4 className="col-12">Sélectionnez le type d'entité que vous voulez ajouter</h4>
                        <Button href="/contribuer/personne">Personne</Button>
                        <Button color="blue4" href="/contribuer/organisation">Organisation</Button>
                        <Button color="blue2" disabled>Projet</Button>
                        <Button disabled>Événement</Button>
                        <Button disabled>Matériel</Button>
                    </div>
                    
                </div>

            </section>

        </div>
    )

}

export default Index