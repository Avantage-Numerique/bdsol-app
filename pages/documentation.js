import React, { useState } from 'react';

import Head from 'next/head'
import Class from '../components/Class'
import styles from '../styles/pages/Documentation.module.scss'
//import jsonFile from '../doc/exemples.json'   Not used for now since, for development purposes, a mock api is used


// Fetch the documentation data from the Api and pass it as a props
export const getStaticProps = async () => {

  const res = await fetch('https://mocki.io/v1/494789e7-8fce-45f1-bb79-f92bcef2d0d5');
  const data = await res.json();

  return {
    props: {documentation: data}  // will be passed to the page component as props
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
      <Head>
        <title>Avantage Numérique - Documentation complète</title>
      </Head>

      {/* General header of the page */}
      <header>
        <div className="maxWidthPageContainer">
          <h1>Documentation complète sur l'ontologie utilisée dans la BDSOL</h1>
          <p>Etiam vel ultrices sapien. Donec ipsum lorem, pharetra non commodo imperdiet, facilisis bibendum quam. Suspendisse consequat tellus massa, ut venenatis lacus rutrum at. Fusce sit amet lectus dui. Donec ut mauris eu nulla porta rutrum quis ornare diam. Nulla sed quam eget magna hendrerit vulputate non porta eros.</p>
        </div>
      </header>

      {/* Main section of the page that contains all the classes */}
      <section>
        <div className="maxWidthPageContainer">

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
