import React, { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';

import Head from 'next/head'

import Class from '../components/Class/Class'
import styles from './Documentation.module.scss'
import ArrowButton from '../../src/common/FormElements/ArrowButton/ArrowButton'

//import jsonFile from '../doc/exemples.json'   Not used for now since, for development purposes, a mock api is used

import PageHeader from "@/src/layouts/Header/PageHeader";



const Documentation = ( {documentation} ) => {

  
    /****************************
             LD+Json data
     ****************************/
    const schema = {
      '@context': 'http://schema.org',
      '@type':'WebSite',
      name: "Ontologie - Avantage Numérique",
      description: "Documentation complète sur l'ontologie utilisée dans la base de donnée ouverte et liée d'Avantage Numérique.",
      
      producer: {
        '@context': 'http://schema.org',
        '@type':'Organization',
        name: "Avantage Numérique",
        description: "Avantage numérique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal.",
        mainEntityOfPage: "https://avantagenumerique.org/"
      },
      
      about: {
        "@context": "http://schema.org/",
        "@type": "Dataset",
        description: "Ontologie d'Avantage Numérique destinée à être utilitée dans une base de données ouverte et liée, dans le but de regrouper les techno-créatifs présents sur le territoire du croissant boréal.",
        name: "Ontologie - Avantage Numérique",
        creator: {
          '@context': 'http://schema.org',
          '@type':'Organization',
          name: "Avantage Numérique",
          description: "Avantage numérique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal.",
          mainEntityOfPage: "https://avantagenumerique.org/"
        },
        hasPart: []
      }
    }

  //Add the specific classes to the LD+Json file
  documentation.classes.forEach(data => {

    schema.about.hasPart.push({
      "@context": "http://schema.org/",
      "@type": "Dataset",
      "name": data.title,
      "description": data.intro,
      "creator": {
        '@context': 'http://schema.org',
        '@type':'Organization',
        name: "Avantage Numérique",
        description: "Avantage numérique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal.",
        mainEntityOfPage: "https://avantagenumerique.org/"
      },
      "sameAs": `/${data.slug}`
    })

  })
  

  // Set the state of the current selected class to null by default 
  const [ index, setActiveIndex ] = useState( null );

  //Event listener that change the current selected class to display the informations
  const onClassDisplayClick = ( passedIndex ) => {
    
    //If there is a second click on the same class : close it
    if( passedIndex == index ){
      setActiveIndex( null ); 
    } else {
      //If the class is not already selected, select it
      setActiveIndex(passedIndex); 
    }
  }

  //Calculate if the class is active of not and pass the answer (bool) in props
  const isActiveClass = ( classIndex ) => classIndex === index;


  return (

    <div className={styles.pageContent}>

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
      
      <PageHeader
        subtitleColor="primary"
        title={`A - Documentation de l'ontologie AN`}
        subTitle={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut commodo felis, nec egestas massa. Suspendisse convallis tortor ac varius rutrum. In tincidunt efficitur nulla in faucibus. Donec efficitur vulputate ligula, nec ultrices mi ullamcorper eget. Cras sed interdum ex. Integer pellentesque, diam eu euismod lobortis, velit purus accumsan diam."
      />

      {/* General header of the page */}
      <header className="bg-blue2">
        <section className="text-white col-12">
          <h1>Préparez vos données pour vous connecter au <br/><span className="text-dark">croissant boréal</span></h1>

          {/* SVG still to integrate and animate. This version is only temporary */}
          {/* @TODO : Warning du path, peut-être implémenté : https://nextjs.org/docs/basic-features/static-file-serving ?*/}
          {/*           
            Using old pictures that don't match the current styling. They have been deleted
          <figure>
            <img className={styles.mainIllustration} alt="Illustrations représentant Avantage Numérique." src="\index_main_background.png"/>
            <div>
              <img className={styles.illustration_circle} alt="Illustrations représentant Avantage Numérique." src="\index_main_background-circle1.png"/>
            </div>
            <div>
              <img className={styles.illustration_circle} alt="Illustrations représentant Avantage Numérique." src="\index_main_background-circle2.png"/>
            </div>
            <div>
              <img className={styles.illustration_circle} alt="Illustrations représentant Avantage Numérique." src="\index_main_background-circle3.png"/>
            </div>
          </figure> */}
        </section>
    
    
      </header>

      {/* Main section of the page that contains all the classes */}
      <section className={`${styles.classesContainer} container p-0`}>

          <header className='row gx-5'>

            {/* Call to action */}
            <aside className="col-3">

              <div className='text-white commonRadius bg-primary'>

                <section>
                  <h3 className="col-12">Lorem ipsum dolor sit amet</h3>
                  <h5 className="col-12">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h5>
                </section>
                
                <section>
                  <div>
                    <ArrowButton color="primary" outline="white" direction="right" size="large"> </ArrowButton>
                  </div>
                </section>
              </div>
              
            </aside>

          </header>

          <section className='row'>

            <h2>Liste des classes</h2>

            {/* Create the classes elements */}
            {documentation.classes.map(( data, classIndex ) => (
              <>
              
                <div className={`${styles.separation_line} col-12`}></div>
                <Class 
                  onclick={ () => onClassDisplayClick( classIndex ) } 
                  key={ data.slug } 
                  data={ data } 
                  globalData={documentation}
                  active= { isActiveClass( classIndex ) }
                />

              </>
            ))}

            <hr className={`${styles.separation_line} col-12`} />




          </section>
    
      </section>
      
    </div>

  )
}

export default Documentation;
