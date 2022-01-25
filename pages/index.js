import React, { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';


import Head from 'next/head'
import Class from '../components/Class'
import styles from '../styles/pages/Index.module.scss'
//import jsonFile from '../doc/exemples.json'   Not used for now since, for development purposes, a mock api is used


// Fetch the documentation data from the Api and pass it as a props
export const getStaticProps = async () => {

  const res = await fetch('http://bdsol.avantagenumerique.org/o/v1');
  const data = await res.json();

  return {
    props: {documentation: data}  // will be passed to the page component as props
  }
}


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
  const isActiveClass = ( classIndex ) => classIndex === index ? true : false;


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

      {/* General header of the page */}
      <header className="sec-color_BG">
        <section className="white col-12">
          <h1>Préparez vos données pour vous connecter au <br/><span className="dark">croissant boréal</span></h1>

          {/* SVG still to integrate and animate. This version is only temporary */}
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
          </figure>
        </section>
    
    
      </header>

      {/* Main section of the page that contains all the classes */}
      <section className={styles.classesContainer}>
        <div className="maxWidthPageContainer">

          <header>

            {/* Main content of the header, presented has an article */}
            <article>
              <h1>A - Documentation sur la structure complète</h1>
              <div className="col-12">
                <div className={`${styles.line} line blue_BG`}></div>
                <div className={`${styles.line} line blue_BG`}></div>
              </div>
              <h5 className="blue">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et urna iaculis, rutrum sapien eu, luctus ante. Integer dapibus, risus.</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut commodo felis, nec egestas massa. Suspendisse convallis tortor ac varius rutrum. In tincidunt efficitur nulla in faucibus. Donec efficitur vulputate ligula, nec ultrices mi ullamcorper eget. Cras sed interdum ex. Integer pellentesque, diam eu euismod lobortis, velit purus accumsan diam.</p>
            </article>

            {/* Call to action */}
            <aside className="white commonRadius blue_BG">

              <section>
                <h3 className="col-12">Lorem ipsum dolor sit amet</h3>
                <h5 className="col-12">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h5>
              </section>
              
              <section>
                <div>
                  <button className={styles.circle_Container}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.31 16.97"><polygon points="2.83 16.97 0 14.14 5.66 8.48 0 2.83 2.83 0 11.31 8.48 2.83 16.97"/></svg>
                  </button>
                </div>
              </section>
            </aside>

          </header>

          <section>

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
    
        </div>
      </section>
      
    </div>

  )
}

export default Documentation;
