/*

    Component representing a class property
    V.P.R - created: 07/10/2021

*/

import styles from '../styles/components/Property.module.scss'

const Property = ( {data} ) => {


    return (

        <article className={`${styles.propertyComponent} col-12`}>

            <header>
                <h2> {data.title} </h2>
                <div className={`${styles.requirementMention} blue_BG white`}>
                    { data.title.required ? "Requise" : "Non requise" }
                </div>
                <small className="col-12">Source : { data.source }</small>
            </header>
            
            {/* Description section of the property */}
            <section className='col-12'>
                <h3>Description</h3>
                <p>{ data.description }</p>
            </section>

            {/* Use cases section of the property */}
            <section className='col-12'>
                <h3>Cas d'utilisation</h3>
                <p>{ data.uses }</p>
            </section>

            {/* Restrictions section of the property */}
            <section className='col-12'>
                <h3>Restrictions</h3>
                <p>{ data.restrictions }</p>
            </section>
            

        </article>

    )   
}



export default Property;