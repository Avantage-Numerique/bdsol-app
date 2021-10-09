/*

    Component representing the informations displayed about the main class
    V.P.R - created: 04/10/2021

*/
import React, { useState } from 'react';

import styles from '../styles/components/ClassInfos.module.scss';
import Property from './Property';


const ClassInfos = ( {data, active} ) => {

    //Add class "active" if the element is selected
    const activeClass = active ? styles.active : ' ';

    // Set the state of the current selected property to null by default 
    const [ index, setActiveIndex ] = useState( null );

    //Event listener that change the current selected property to display its informations
    const onPropertyDisplayClick = ( index ) => setActiveIndex(index); 
    

    return (

        <section className={`${activeClass} ${styles.classInfosComponent} col-12`}>

            {/* Title section */}
            <div className={`${styles.classTitle} col-12`}>
                <h1>Classe : "{ data.title }"</h1>
            </div>

            {/* Description section */}
            <div className={`${styles.classDescription} col-12`}>
                <h4 className="blue col-12">Description</h4>
                <p>{ data.description }</p>
            </div>

            {/* Properties section */}
            <div className={`${styles.classProperties} col-12`}>
                <h4 className="blue col-12">Propriétés</h4>

                <div className={`${styles.propertiesButtonContainer} col-12`}>     
                     
                     {/* Display every properties */}
                     {data.properties.map( (propData, propIndex) => (

                        <button 
                            key={` ${propData.slug}-button `} 
                            onClick={ () => onPropertyDisplayClick( propIndex ) } 
                            className={`${styles.propertyName} white`} 
                        >
                                { propData.title }
                        </button>

                     ))}

                </div>

                {/* Section that contains the properties informations, passed through as articles */}
                <div className="col-12">

                    {/* Passe only the selected property */}
                    {index != null ? <Property data={ data.properties[index] }  /> : " "}

                </div>
               
            </div>

            
        </section>

    )   
}


export default ClassInfos;