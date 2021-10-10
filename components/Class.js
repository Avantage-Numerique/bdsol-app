/*

    Component representing the main object representing a class entity
    V.P.R - created: 04/10/2021

*/
import ClassInfos from './ClassInfos'
import XButton from './buttons/XButton'
import styles from '../styles/components/Class.module.scss'

const Class = ( { data, onclick, active } ) => {

    return (

        <article id={ data.slug } className={styles.classComponent}>

            {/* Inline quick presentation of the class */}
            <section onClick={ onclick }>
                <h2>{ data.title }</h2>
                <p>{ data.intro }</p>
                <XButton openned={ active } className={styles.closeOpenButton}/>
            </section>

            {/* Main informations component of the class */}
            <ClassInfos data={ data } active={ active } />

        </article>

    )   
}



export default Class;