/*

    Component representing a class property
    V.P.R - created: 07/10/2021

*/

import styles from '../styles/components/Property.module.scss'

const Property = ( {data} ) => {

    

    return (

        <article className={styles.PropertyComponent}>

            <p>{ data.title }</p>

        </article>

    )   
}



export default Property;