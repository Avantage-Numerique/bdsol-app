/*

    Component representing the main object representing a class entity
    V.P.R - created: 04/10/2021

*/

import ClassInfos from '../ClassInfos/ClassInfos'
import ArrowButton from '../../../app/common/FormElements/Buttons/ArrowButton/ArrowButton'
import styles from './Class.module.scss'

const Class = ( { data, onclick, active, globalData} ) => {

    //Set the cursor on pointer over the class only when it is not active
    const isActive = active ?  `${styles.activeClass}` : "cursorPointer" ;

    return (

        <article id={ data.slug } className={`${styles.classComponent} ${isActive}`}  onClick={ active ? null : onclick } >
              
                {/* Inline quick presentation of the class */}
                <header>
                    <img alt="Icone de représentant la classe" src="\class-icones\1356-wooden-box-outline.svg" />
                    <h3>{ data.title }</h3>
                    <p>{ data.intro }</p>
                    <ArrowButton openned={ active } onclick={ onclick } active={ active } className={styles.closeOpenButton}/>
                </header>

                {/* Apply margins to the content block */}
                <div className="col-12">
                    {/* Main informations component of the class */}
                    <ClassInfos data={ data } active={ active } globalData={globalData}/>
                </div>

        </article>

    )   
}



export default Class;