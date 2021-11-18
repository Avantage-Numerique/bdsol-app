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

  // Containe the json-ld data
  const schema = {
    '@context': 'http://schema.org',
    '@type':'WebSite',
    name: "Ontologie - Avantage Numérique",
    description: "Documentation complète sur l'ontologie utilisée dans la base de donnée ouverte et liée d'Avantage Numérique.",
    /*"url":"https://avantagenumerique.org/",*/
    producer: {
      '@context': 'http://schema.org',
      '@type':'Organization',
      name: "Avantage Numérique",
      description: "Avantage numérique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal.",
      sameAs: "https://avantagenumerique.org/"
    },
    about: {
        "@context": "http://schema.org/",
        "@type": "Dataset",
        description: "Ontologie d'Avantage Numérique destinée à être utilitée dans une base de données ouverte et liée, dans le but de regrouper les techno-créatifs présents sur le territoire du croissant boréal.",
        name: "Ontologie - Avantage Numérique",
        hasPart: [
          {
            "@context": "http://schema.org/",
            "@type": "Dataset",
            name: "Personne",
            description: "Classe représentant un individu unique.",
            mainEntity: {
              "@context": "http://schema.org/",
              "@type": "Class"
              /* sameAs: url of the individual page */
            }
          }
        ]
      }
  }

const Documentation = ( {documentation} ) => {


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
        <section className="col-6 white">
          <h2>Documentation complète sur l'ontologie utilisée dans la BDSOL</h2>
          <p>Etiam vel ultrices sapien. Donec ipsum lorem, pharetra non commodo imperdiet, facilisis bibendum quam. Suspendisse consequat tellus massa, ut venenatis lacus rutrum at. Fusce sit amet lectus dui. Donec ut mauris eu nulla porta rutrum quis ornare diam. Nulla sed quam eget magna hendrerit vulputate non porta eros.</p>
        </section>
    
    
      </header>

      {/* Main section of the page that contains all the classes */}
      <section className={styles.classesContainer}>
        <div className="maxWidthPageContainer">

          <header>

            {/* Main content of the header, presented has an article */}
            <article>
              <h1>Documentation sur la structure complète</h1>
              <strong><p className="blue">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et urna iaculis, rutrum sapien eu, luctus ante. Integer dapibus, risus.</p></strong>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut commodo felis, nec egestas massa. Suspendisse convallis tortor ac varius rutrum. In tincidunt efficitur nulla in faucibus. Donec efficitur vulputate ligula, nec ultrices mi ullamcorper eget. Cras sed interdum ex. Integer pellentesque, diam eu euismod lobortis, velit purus accumsan diam.</p>
            </article>

            {/* Call to action */}
            <aside className="white commonRadius blue_BG">
              <h3>Ceci est un titre</h3>
              <p>ndjsvnj sj js edfwec  ewuwifbeiw iufbewibfewbi dd wvwubvwe i uewuifbeuwbfwjds jds dk</p>

            </aside>

          </header>

          {/* Create the classes elements */}
          {documentation.classes.map(( data, classIndex ) => (

            <Class 
              onclick={ () => onClassDisplayClick( classIndex ) } 
              key={ data.slug } 
              data={ data } 
              globalData={documentation}
              active= { isActiveClass( classIndex ) }
            />

          ))}
    
        </div>
      </section>
      
    </div>

  )
}

export default Documentation;
