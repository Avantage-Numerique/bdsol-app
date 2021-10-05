/*

    Component representing the informations displayed about the main class
    V.P.R - created: 04/10/2021

*/
import styles from '../styles/components/ClassInfos.module.scss'


const ClassInfos = ( {data, active} ) => {

    return (

        <section className={`${ active } ${styles.classInfosComponent}`}>

            <h1>{ data.title }</h1>
            
        </section>

    )   
}


export default ClassInfos;