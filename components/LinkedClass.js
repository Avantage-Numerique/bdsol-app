/*

    Component representing the linked class
    V.P.R - created: 010/10/2021

*/
import Link from 'next/link'
import { Children } from 'react';

import styles from '../styles/components/LinkedClass.module.scss'

const LinkedClass = ( {data, globalData} ) => {

    //Identify the object refed by this linked class to acces all its informations
    let classObj;

    try{
        /*
            Possibility of error if the slug and the linked class name don't fit. 

        */
        classObj = globalData.classes.find((obj) =>  obj.slug === data.class);
    } catch(error){
        //Set to null if no match is found
        classObj = null;
    }    

    

    return (
        <article className={`${styles.linkedClassComponent} col-12`}>
            {/* Title section */}
            <header>
                {/* 
                    Set the title with the title of the class if defined.  
                    If its not define, simply use the class name of the linkedclass object
                */}
                <h3>{classObj ? classObj.title : data.class}</h3>
                <div className={styles.line}></div>
            </header>
            
            {/* Display informations */}
            <section>
                <div><span>Classe : </span>{data.class}</div>
                <div><span>Lien : </span>{data.link}</div>
                <div><span>Source : </span>{data.source}</div>
            </section>

            {/* Link to the individual page of the class */}
            <Link href={`/doc/classe/${data.class}`}>&#x279A;</Link>

        </article>
    )   

}



export default LinkedClass;