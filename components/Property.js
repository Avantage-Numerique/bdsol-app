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
                <div className={`${styles.requirementMention} blue_BG`}>
                    { data.title.required ? "Requise" : "Non requise" }
                </div>
            </header>

            <section>

            </section>
            

        </article>

    )   
}



export default Property;