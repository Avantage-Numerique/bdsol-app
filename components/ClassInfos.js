/*

    Component representing the informations displayed about the main class
    V.P.R - created: 04/10/2021

*/
import styles from '../styles/components/ClassInfos.module.scss'


const ClassInfos = ( {data, active} ) => {

    //Add class "active" if the element is selected
    const activeClass = active ? styles.active : ' ';

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

                <div class={`${styles.propertiesButtonContainer} col-12`}>
                     {/* This is to be created as a component */}

                    <button class={`${styles.propertyName} white`}>Propritété</button>
                    <button class={`${styles.propertyName} white`}>Propritété 2</button>
                    <button class={`${styles.propertyName} white`}>Propritété 3</button>

                </div>
               
            </div>

            
        </section>

    )   
}


export default ClassInfos;