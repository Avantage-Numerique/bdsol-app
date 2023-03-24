import { useState, useContext, useEffect } from 'react'

//Components 
import PageHeader from "@/src/layouts/Header/PageHeader";
import PersonSimple from '@/DataTypes/Person/Components/layouts/simple/PersonSimple'
import Button from '@/src/common/FormElements/Button/Button'
import Spinner from '@/src/common/widgets/spinner/Spinner'


//Costum hooks 
import {useHttpClient} from '@/src/hooks/http-hook';

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import {useAuth} from '@/src/authentification/context/auth-context';

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";


const PersonsPage = () => {

    const [ personList, setPersonList ] = useState([]);

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest} = useHttpClient();

    //Import message context 
    const msg = useContext(MessageContext);

    /* 
        Fetch data  
        
    */
    const fetchData = async () => {

        //Send the request with the specialized hook
        const persResponse = await sendRequest(
            "/persons/list",
            'POST',
            JSON.stringify({"data": {"sort": "desc"}}),
            {'Content-Type': 'application/json'}
        )

        //If positive
        if (!persResponse.error) { 
            setPersonList(persResponse.data)
        } else {
            msg.addMessage({
                text: "Une erreur est survenue et nous n'arrivons pas à afficher les fiches de personne. Veuillez réessayer.",
                positive: false
            })
        }
    }

    useEffect(() => { fetchData() }, [])

    return (

        <div>
            <PageHeader
                bg={"bg-purplelight"}
                textColor={"text-white"}
                title={"Consulter les personnes"}
                subTitle={"Qu'elles proviennent du milieu de la culture, des affaires ou de l'éducation..."}
                description="Les personnes listée ci-dessous peuvent être des créateurs.trices numériques, des individus possédant une exertise ou bien de l'équipement spécialisé, des promoteurs d'initiatives numériques, ou encore tout autres personnes intéressée à prendre part, d'une façon ou d'une autre, au développement des technologies numériques sur le territoire du Croissant Boréal."
                image={"/general_images/Croissant-Boreal@3x-1440x1440.png"}
                imgAlt={"Carte du croissant boréal"} />

                <div className="container">
                    <div className="row my-4 py-4">

                        {/* Feed section */}
                        <section className="col col-12 col-md-9">
                            <div className="position-relative row row-cols-1 row-cols-sm-2 row-cols-xl-3">

                                {/* Loading state : If loading is on and there is no feed */}
                                {
                                        isLoading &&
                                        <div className={"home-page__feed-section--spinner-container"}>
                                            <div>
                                                <Spinner reverse/>
                                            </div>
                                            <p><strong>{lang.loadingData}</strong></p>
                                        </div>
                                }

                                {/* If there is no loading state and no feed, go on that by default */}
                                {
                                    personList.length === 0 && !isLoading &&
                                    <div>
                                        <h5>{lang.noResult}</h5>
                                    </div>
                                }
                                {

                                }
                                { !isLoading && personList.length > 0 && 
                                    personList.map((person, index) => (
                                        <div className="col g-3" key={`indexPersonContainer${index}`} >
                                            <PersonSimple data={person} key={`indexPerson${index}`} />
                                        </div>
                                    ))
                                }

                            </div>
                        
                        </section>

                        {/* Aside section */}
                        <aside className="col col-12 col-md-3">
                            <div className="my-4">
                                <Button 
                                    disabled={!auth.user.isLoggedIn}
                                    href="/contribuer/personne" 
                                    size="reg-100">
                                    {lang.addPersonButtonLabel}
                                </Button>

                                {
                                    !auth.user.isLoggedIn &&
                                    <p className="mt-2">
                                        Notez que vous devez être <b className="text-primary">connecté</b> pour pouvoir ajouter des entitées à la base de données.
                                    </p>
                                }
                            </div>
                                {   !auth.user.isLoggedIn &&
                                    <>
                                        <hr/>
                                        <Button
                                            size="reg-100"
                                            href="/compte/connexion"
                                        >Se connecter</Button>
                                    </>
                                }
                            
                        </aside>

                    </div>
                </div>

                    
                
        </div>
    )
}

export default PersonsPage