import React, { useContext, useState } from 'react';
import Link from 'next/link'

import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head'

//Components
import Button from '../app/common/FormElements/Buttons/Button/Button'

//Context
import { AuthContext } from '../authentication/context/auth-context'

//Styling
import styles from './home-page.module.scss'




const HomePage = () => {

    const auth = useContext(AuthContext);

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

      <header className="col-12">

          {/* Text content section that follow the normalized width of the app */}
          <div className="maxWidthPageContainer">
               <div className={`${styles["home-page__header--img-container"]}`}>

                  <img
                    src="/show_screen_shot.jpg"
                    alt="Image d'un événement de projection devant public."
                  />

              </div>
              <h1 className="col-12 white">Avantage Numérique</h1>
              <h3 className="col-12 white">Toutes les données du Croissant Boréal</h3>


          </div>

      </header>

      <div className={`${styles["home-page__main"]} maxWidthPageContainer`}>

        <div className="col-12">

            {/* Page first section */}
            <section className={`col-8 TEMP__division-container`}>

              <h3>Section principale</h3>
              { auth.isLoggedIn && <p>Vous êtes connecté</p>}
              { !auth.isLoggedIn && <p>Vous n'êtes pas connecté</p>}

            </section>

            <aside className={`col-3 TEMP__division-container`}>

              <h3>Section côté</h3>

              <Button>

                  <Link href="/contribuer">
                      Créer une entité
                  </Link>

              </Button>

            </aside>
          </div>
      </div>



      
    </div>

  )
}

export default HomePage;
