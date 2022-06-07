import React, { useContext, useEffect } from 'react';

import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head'

//Components
import Button from '../app/common/FormElements/Buttons/Button/Button'

//Costum hooks 
import { useHttpClient } from '../app/hooks/http-hook'

//Context
import { MessageContext } from '../app/common/UserNotifications/Message/Context/Message-Context'
import { AuthContext } from '../authentication/context/auth-context'

//Styling
import styles from './home-page.module.scss'



const HomePage = () => {

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest} = useHttpClient();

    //Fetch the data 
    useEffect(() => {
      
      const fetchPersonList = async () => {


          //Send the request with the specialized hook
          const response = await sendRequest(
              "/personnes/list",
              'POST',
              JSON.stringify({}),
              { 'Content-Type': 'application/json' }
          )

          /*
              Display the proper message relative to the api response
          */

          //If positive
          if(!response.error){

            //Notify the user
            msg.addMessage({ 
                text: response.message,
                positive: true 
            })

            //If negative
            } else {                    
                msg.addMessage({ 
                    text: response.message,
                    positive: false 
                })
            }

      }

      fetchPersonList()
      

    }, [])

    /****************************
             LD+Json data
     ****************************/
    const schema = {
      '@context': 'http://schema.org',
      '@type':'WebSite',
      name: "Ontologie - Avantage Numérique",
      description: "Base de donnée ouverte et liée crée par Avantage Numérique et qui recense les techno-créatifs sur le territoire du Croissant boréal.",
      
      producer: {
        '@context': 'http://schema.org',
        '@type':'Organization',
        name: "Avantage Numérique",
        description: "Avantage numérique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal.",
        mainEntityOfPage: "https://avantagenumerique.org/"
      }
    }

  return (

    <div className={`col-12 ${styles["home-page"]}`}>

      {/* Page head element  */}
      <Head>
        <title>Ontologie - Avantage Numérique</title>

        {/* Keywords and description to evaluate */}
        <meta name="description" content="Documentation complète sur l'ontologie utilisée dans la base de donnée ouverte et liée d'Avantage Numérique." />
        <meta name="keywords" content="ontologie, classe, propriété, base de données, technologie, créateurs, communauté" /> 

        {/* social media meta tag */}
        <meta property="og:title"              content="Ontologie - Avantage Numérique" />
        <meta property="og:description"        content="Documentation complète sur l'ontologie utilisée dans la base de donnée ouverte et liée d'Avantage Numérique." />
        
        <meta name="twitter:title"             content="Ontologie - Avantage Numérique"/>
        <meta name="twitter:description"       content="Documentation complète sur l'ontologie utilisée dans la base de donnée ouverte et liée d'Avantage Numérique."/>

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
                    alt="Image d'un événement de projection devant public."
                  />

              </div>

              <div className="col-12">

                <h1 className="col-12 white">Avantage Numérique</h1>
                <h3 className="col-12 white">Toutes les données du Croissant Boréal</h3>
                
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

              <h2 className={`col-12 `}>Actualités</h2>

              <div className="col-12">

                  <article className={`${styles["home-page__feed-elem"]}`}>

                      <h3>Personne</h3>
                      
                  </article>

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

                  

              {/*  Rapid options to access of edit the database  */}

              <section className={`col-12 ${styles["aside__db-edit-options"]}`}>
                
                  <div className={`col-12 ${styles["db-edit-options__button-set"]}`}>
                      <Button disabled slim>Événement</Button>
                      <Button disabled slim>+</Button>
                  </div>

                  <div className={`col-12 ${styles["db-edit-options__button-set"]}`}>
                      <Button disabled slim>Personne</Button>
                      <Button disabled slim>+</Button>
                  </div>

                  <div className={`col-12 ${styles["db-edit-options__button-set"]}`}>
                      <Button disabled slim>Organisation</Button>
                      <Button disabled slim>+</Button>
                  </div>
                  
              </section>


              {/* 
                    Section : If user is not connected, propose to create an account if he doesn't have one
              */}

              { !auth.isLoggedIn &&

                <section className={`col-12 ${styles["aside__register-option"]}`}>
                    
                    <div className="col-12 blue_BG white">

                      <h4>Pas encore de compte ?</h4>

                      <p>Vous en aurez besoin afin de vous aussi contribuer aux données</p>

                      <Button href="/compte/inscription">C'est par ici !</Button>

                    </div>

                </section>

              }

              {/* 
                    Section : More informations about the project
              */}
              <section className="col-12">

                <h4 className="col-12">À propos</h4>
                <p className="col-12">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum risus vitae accumsan gravida. Nunc vel mattis nunc, non cursus risus. Aenean tincidunt tellus eget lorem accumsan pulvinar. Integer fringilla.
                </p>
              </section>


            </aside>
          </div>
      </div>



      
    </div>

  )
}

export default HomePage;
