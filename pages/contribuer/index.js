import { useState } from 'react'
 
//Components
import Button from '../../app/common/FormElements/Buttons/Button/Button'
import CreatePersonForm from '../../DataTypes/Person/Components/Forms/CreatePerson/CreatePersonForm'
import FixedCard from '../../app/common/Containers/FixedCard/FixedCard'

//styling
import styles from './contribution-page.module.scss'



const Index = () => {    

    //Temporary use useState but will have to be useReducer
    const [displayPerson, setDisplayPerson] = useState(false)

    return (
        <div className={`col-12 ${styles["contribution-page"]}`}>
            
            <header className={`col-12`}>
                <div className="maxWidthPageContainer">
                    <h2 className={`col-12 blue`}>Créer une donnée</h2>
                </div>
            </header>
            <section className={`col-12`}>
                
                <div className="maxWidthPageContainer">
                    <h4 className="col-12">Sélectionnez le type d'entité que vous voulez ajouter</h4>
                    <Button onClick={() => {setDisplayPerson(!displayPerson)}}>Personne</Button>
                    <Button disabled>Organisation</Button>
                    <Button disabled>Projet</Button>
                    <Button disabled>Événement</Button>
                    <Button disabled>Matériel</Button>
                </div>
                <div className="col-12">
                    {displayPerson &&

                    <FixedCard>
                    <>
                    <h2 className="col-12">Personne</h2>
                    <h4 className="col-12">Remplissez les champs suivants pour ajouter une nouvelle personne à la base de données.</h4>
                    <CreatePersonForm />
                    </>
                    </FixedCard>
                    
                    }
                    
                </div>
            </section>

        </div>
    )

}

export default Index