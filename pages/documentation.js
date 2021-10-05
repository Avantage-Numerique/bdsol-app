import React, { useState } from 'react';

import Head from 'next/head'
import Class from '../components/Class'
import styles from '../styles/pages/Documentation.module.scss'
import jsonFile from '../doc/exemples.json'


const Documentation = () => {

  // Set the state of the current selected class to null by default 
  const [ index, setActiveIndex ] = useState( null );

  //Event listener that change the current selected class to display the informations
  const onClassDisplayClick = ( index ) => setActiveIndex(index); 

  //Calculate if the class is active of not and pass the answer in props
  const isActiveClass = ( classIndex ) => {
    const value = classIndex === index ? 'active' : ' ';
    return value;
  }

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
          {jsonFile.classes.map(( data, classIndex ) => (

            <Class 
              onclick={ () => onClassDisplayClick( classIndex ) } 
              key={ data.slug } 
              data={ data } 
              active= { isActiveClass( classIndex ) }
            />

          ))}
    
        </div>
      </section>
      
    </div>

  )
}

export default Documentation;
