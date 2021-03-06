import React, { useContext, useEffect, useState } from 'react';

import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head'
import Link from 'next/link'

//Components
import Button from '../app/common/FormElements/Buttons/Button/Button'
import PresentationCard from '../app/common/Containers/cards/presentationCard'
import Spinner from '../app/common/widgets/spinner/Spinner'

//Costum hooks 
import { useHttpClient } from '../app/hooks/http-hook'

//Context
import { MessageContext } from '../app/common/UserNotifications/Message/Context/Message-Context'
import { AuthContext } from '../authentication/context/auth-context'

//Styling
import styles from './home-page.module.scss'



const HomePage = () => {

    //Holds the state the organisations
    const [feedList, setFeedList] = useState([])

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest} = useHttpClient();

    //Fetch the data 
    useEffect(() => {

      const fetchApi = async () => {
        
          //Send the request with the specialized hook
          const orgResponse = await sendRequest(
              "/organisations/list",
              'POST',
              JSON.stringify({"data": {
                "name": "jonathan"
              }}),
              { 'Content-Type': 'application/json' }
          )

          //Send the request with the specialized hook
          const persResponse = await sendRequest(
              "/personnes/list",
              'POST',
              JSON.stringify({"data": {
                "name": "jonathan"
              }}),
              { 'Content-Type': 'application/json' }
          )


          /*
              Display the proper message relative to the api response
         */

          //If positive
          if(!orgResponse.error && !persResponse.error){
            
            //store the data
            const feed = [...orgResponse.data, ...persResponse.data];

            //Sort the data to display the new elements before
            //Eventually, this will have to be done by the backend
            feed.sort(function(a, b) {
              return (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0);
            });

            //Finaly, update the state to display the result
            setFeedList(feed)

            //If negative
            } else {          
              
                if(orgResponse.error)
                  msg.addMessage({ 
                      text: orgResponse.message,
                      positive: false 
                  })
                
                if(persResponse.error)
                    msg.addMessage({ 
                      text: persResponse.message,
                      positive: false 
                    })
            } 
      }

      if(auth.isLoggedIn) fetchApi()


    }, [auth.isLoggedIn])


    /****************************
             LD+Json data
     ****************************/
    const schema = {
      '@context': 'http://schema.org',
      '@type':'WebSite',
      name: "Ontologie - Avantage Num??rique",
      description: "Base de donn??e ouverte et li??e cr??e par Avantage Num??rique et qui recense les techno-cr??atifs sur le territoire du Croissant bor??al.",
      
      producer: {
        '@context': 'http://schema.org',
        '@type':'Organization',
        name: "Avantage Num??rique",
        description: "Avantage num??rique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le d??veloppement de l?????cosyst??me cr??atif, entrepreneurial et technologique du Croissant bor??al.",
        mainEntityOfPage: "https://avantagenumerique.org/"
      }
    }

  return (

    <div className={`col-12 ${styles["home-page"]}`}>

      {/* Page head element  */}
      <Head>
        <title>BDSOL - Avantage Num??rique</title>

        {/* Keywords and description to evaluate */}
        <meta name="description" content="Documentation compl??te sur l'ontologie utilis??e dans la base de donn??e ouverte et li??e d'Avantage Num??rique." />
        <meta name="keywords" content="ontologie, classe, propri??t??, base de donn??es, technologie, cr??ateurs, communaut??" /> 

        {/* social media meta tag */}
        <meta property="og:title"              content="BDSOL - Avantage Num??rique" />
        <meta property="og:description"        content="La base de donn??e ouverte et li??e d'Avantage Num??rique." />
        
        <meta name="twitter:title"             content="BDSOL - Avantage Num??rique"/>
        <meta name="twitter:description"       content="La base de donn??e ouverte et li??e d'Avantage Num??rique."/>

        {/* 

        To add when the domain will be selected ....

        <link rel="canonical" href="https://avantagenumerique.org/">  

        */}

        {/* Structured data */}
        <script 
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(JSON.stringify(schema))}}
        />

      </Head>

      {/*

          Main content of the page

      */}

      <section className="col-12">

          {/* Text content section that follow the normalized width of the app */}
          <div className="maxWidthPageContainer">
               <div className={`${styles["home-page__header--img-container"]}`}>

                  <img
                    src="/general_images/Croissant-Boreal@3x-1440x1440.png"
                    alt="Image d'un ??v??nement de projection devant public."
                  />

              </div>

              <div className="col-12">

                <h1 className="col-12 white">Avantage Num??rique</h1>
                <h3 className="col-12 white">Toutes les donn??es du Croissant Bor??al</h3>
                
              </div>


          </div>
      </section>

      <div className={`${styles["home-page__main"]} maxWidthPageContainer`}>

        <div className="col-12">

            {/************************************
             * 
             * Page first section (main)
             * 
             * ***********************************/}

            <section className={`${styles["home-page__feed-section"]} col-8`}>

              <h2 className={`col-12 `}>Actualit??s</h2>

              {/************************************
               *
               * Loading state : If loading is on and there is no feed
               *  
               ***********************************/}
              {
                isLoading &&
                <div className={`col-12 ${styles["home-page__feed-section--spinner-container"]}`}>

                  <div className={`col-12`}>
                    <Spinner reverse />
                  </div>
                  <p className="col-12"><strong>Chargement des donn??es</strong></p>

                </div>
              }

              {/************************************
               *
               *  If there is no loading state and no feed, go on that by default
               *  
               ***********************************/}
              {
                feedList.length === 0 && !isLoading && auth.isLoggedIn &&
                <div className="col-12">
                  <h5>Aucune donn??e ne semble disponible :( <br/><br/> Assurez-vous d'avoir une connexion internet fonctionnelle.</h5>
                </div>
              }

              {/**************************************
               * 
               *  If the user is not logged is, FOR NOW, display this message
               * 
               ***************************************/}
               {
                !auth.isLoggedIn &&
                <div className="col-12">
                  <h4 className="col-12">Veuillez vous connecter pour pouvoir visualiser le contenu de la base de donn??es.</h4>
                  <p>Ceci est temporaire et, sous peu, vous pourrez consulter les donn??es m??me sans ??tre connect??.</p>
                </div>
              }

              <div className={`col-12 ${styles["home-page__feed-section--container"]}`}>


                  {/************************************
                   *
                   * Display feed if there is one
                   *  
                   ***********************************/}
                  {
                    feedList.length > 0 && !isLoading && auth.isLoggedIn &&
                    
                    feedList.map(elem => (
                        <PresentationCard
                          key={elem._id}
                          header={elem.nickname ? "Personne" : "Organisation"}
                          firstname={elem.firstName}
                          name={elem.lastName}
                          username={elem.nickname}
                          description={elem.description}
                          createdAt={elem.createdAt}
                          url={elem.url}
                          contactPoint={elem.contactPoint}
                        />

                    ))
                  }
                
              </div>

            </section>

            

            {/************************************
             * 
             * Page : Aside section
             * 
             * ***********************************/}

            <aside className={`col-3`}>

              <h2 className={`col-12`}>Menu rapide</h2>

              {/* 
                    Section : If user is not connected, offer the option to connect it self
              */}

                { !auth.isLoggedIn &&

                <section className={`col-12 ${styles["aside__connection-option"]}`}>
                    
                    <Button href="/compte/connexion">Se connecter</Button>

                </section>

                }

                  

              {/*  
                    Rapid options to access of edit the database  
              */}

              <section className={`col-12 ${styles["aside__db-edit-options"]}`}>
                
                  <div className={`col-12 ${styles["db-edit-options__button-set"]}`}>
                      <Button disabled slim>??v??nement</Button>
                      <Button disabled slim>+</Button>
                  </div>

                  <div className={`col-12 ${styles["db-edit-options__button-set"]}`}>
                      <Button disabled slim>Personne</Button>
                      <Button 
                        disabled={!auth.isLoggedIn}
                        href="/contribuer/personne" 
                        slim
                      >+</Button>
                  </div>

                  <div className={`col-12 ${styles["db-edit-options__button-set"]}`}>
                      <Button disabled slim>Organisation</Button>
                      <Button 
                        disabled={!auth.isLoggedIn} 
                        slim
                        href="/contribuer/organisation"
                      >+</Button>
                  </div>

                  { auth.isLoggedIn &&
                    <Button color="blue4" reverse href="/contribuer">Ajouter une donn??e</Button>
                  }
                  
                  <p className="col-12"><strong className="red">D??VELOPPEMENT EN COURS.</strong> Vous pourrez bient??t lancer des recherches et consulter toutes les donn??es. </p>
                  
              </section>


              {/* 
                    Section : If user is not connected, propose to create an account if he doesn't have one
              */}

              { !auth.isLoggedIn &&

                <section className={`col-12 ${styles["aside__register-option"]}`}>
                    
                    <div className="col-12 blue_BG white">

                      <h4>Pas encore de compte ?</h4>

                      <p>Vous en aurez besoin afin de vous aussi contribuer aux donn??es</p>

                      <Button href="/compte/inscription">C'est par ici !</Button>

                    </div>

                </section>

              }

              {/* 
                    Section : More informations about the project
              */}
              <section className="col-12">

                <h4 className="col-12">?? propos</h4>
                <p className="col-12">
                  La Base de donn??es structur??es, ouvertes et li??es (BDSOL) est le c??ur du hub virtuel d???Avantage num??rique. Elle vise ?? recenser et g??olocaliser les talents, les comp??tences, les ressources, les initiatives techno-cr??atives ?? travers le territoire du Croissant Bor??al.
                  <br/>
                  <br/>
                  <span className="col-12 blue1">
                    <Link href="/">En savoir plus</Link>
                  </span>
                </p>
              </section>


            </aside>
          </div>
      </div>



      
    </div>

  )
}

export default HomePage;
