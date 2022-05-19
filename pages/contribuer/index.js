import { useReducer } from 'react'
 
//Components
import Button from '../../app/common/FormElements/Buttons/Button/Button'
import CreatePersonForm from '../../DataTypes/Person/Components/Forms/CreatePerson/CreatePersonForm'
import CreateOrganisationForm from '../../DataTypes/Organisation/components/forms/CreateOrganisationForm/CreateOrganisationForm'
import FixedCard from '../../app/common/Containers/FixedCard/FixedCard'

//styling
import styles from './contribution-page.module.scss'



const Index = () => {    

    function reducer(displayedForm, action) {

        switch (action.type) {

            case 'selectForm':
                if(action.selection === displayedForm) return null
                return action.selection

            default:
                return 
        }

    }
    
    //Display the appropriate form
    const [displayedForm, dispatch] = useReducer(reducer, null);

    return (
        <div className={`col-12 ${styles["contribution-page"]}`}>
            
            <header className={`col-12`}>
                <div className="maxWidthPageContainer">
                    <h1 className={`col-12 blue`}>Créer une donnée</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget est vitae justo hendrerit porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In lobortis justo eu ex euismod, vel efficitur ligula varius. Sed rhoncus lectus nisl, id vestibulum magna laoreet at. Sed sollicitudin sit amet.</p>
                </div>
            </header>

            <section className={`col-12 ${styles["contribution-page__section1"]}`}>
                
                {/* Menu for the differents forms */}
                <div className={`maxWidthPageContainer ${styles["contribution-page__section1__menu"]}`}>
           
                    <h4 className="col-12">Sélectionnez le type d'entité que vous voulez ajouter</h4>
                    <Button onClick={() => dispatch({type: 'selectForm', selection: 'person'})} rippleEffect>Personne</Button>
                    <Button onClick={() => dispatch({type: 'selectForm', selection: 'organisation'})}>Organisation</Button>
                    <Button disabled>Projet</Button>
                    <Button disabled>Événement</Button>
                    <Button disabled>Matériel</Button>

                </div>

                {/* Section to display the differents forms */}
                <div className={`col-12 ${styles["contribution-page__section1__content"]}`}>
                    <div className={`maxWidthPageContainer`}>

                        {displayedForm === "person" &&
                            <article>
                                <h2 className="col-12">Personne</h2>
                                <h4 className="col-12">Remplissez les champs suivants pour ajouter une nouvelle personne à la base de données.</h4>
                                <CreatePersonForm />
                            </article>
                        }

                        {displayedForm === "organisation" &&
                            <article>
                                <h2 className="col-12">Organisation</h2>
                                <h4 className="col-12">Remplissez les champs suivants pour ajouter une nouvelle organisation à la base de données.</h4>
                                <CreateOrganisationForm />
                            </article>
                        }
                    
                    </div>
                </div>
            </section>

        </div>
    )

}

export default Index