
//Component 
import CreateTaxonomyForm from '../../../DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import Button from '../../../app/common/FormElements/Buttons/Button/Button'

//Styling 
import styles from './createTaxonomy.module.scss'


const CreateTaxonomyPage = () => {

    return (
        
        <div className={`col-12 ${styles["create-taxonomy"]}`}>

                <div className={`col-12 ${styles["create-taxonomy__return-button"]}`}>
                    <div className="maxWidthPageContainer">
                        <Button 
                            color="blue4"
                            reverse
                            href="/contribuer"
                        >
                            Retour à la page précédente
                        </Button>
                    </div>
                </div>
                <header className={`col-12`}>
                    <div className="maxWidthPageContainer">
                        <div className={`${styles["create-taxonomy--max-width"]}`}>
                            <h1 className={`col-12 blue`}>Taxonomie</h1>
                            <h4 className="col-12">Super formulaire</h4>
                            <p>Une taxonomie sert à classifier dans un système ordonné les relations entre les choses. <br/>
                                Ajoutez ici une taxonomie pour permettre à une entité d'être relié à cette taxonomie. <br/>
                                Par exemple, lier une <b>personne</b> à une <b>occupation</b> ou une <b>aptitude</b> et lier une <b>organisation</b> à une <b>offre de service</b> et bien d'autre.</p>
                        </div>
                    </div>
                </header>

                <section className="col-12">
                    <div className="maxWidthPageContainer">
                        <div className={`${styles["create-taxonomy--max-width"]}`}>
                            <CreateTaxonomyForm />
                        </div>
                    </div>
                </section>

        </div>
    )
}
export default CreateTaxonomyPage