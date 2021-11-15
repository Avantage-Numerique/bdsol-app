/*

    Component representing the main object representing a class entity
    V.P.R - created: 04/10/2021

    */
import ClassInfos from './ClassInfos'
import XButton from './buttons/XButton'
import styles from '../styles/components/Class.module.scss'

const Class = ( { data, onclick, active, globalData} ) => {

    //Set the cursor on pointer over the class only when it is not active
    const isPointerClass = active ? "" : "cursorPointer" ;

    return (

        <article id={ data.slug } className={`${styles.classComponent} ${isPointerClass}`}  onClick={ active ? null : onclick } >

            {/* Inline quick presentation of the class */}
            <section>
                <h2>{ data.title }</h2>
                <p>{ data.intro }</p>
                <XButton openned={ active } onclick={ onclick } active={ active } className={styles.closeOpenButton}/>
            </section>

            {/* Main informations component of the class */}
            <ClassInfos data={ data } active={ active } globalData={globalData}/>

        </article>

    )   
}



export default Class;