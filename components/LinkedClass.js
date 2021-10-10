/*

    Component representing the linked class
    V.P.R - created: 010/10/2021

*/
import styles from '../styles/components/LinkedClass.module.scss'

const LinkedClass = ( {data} ) => {

    return (
        <article className={`${styles.linkedClassComponent} col-12`}>

            <header>
                <h3>{data.class}</h3>
                <div className={styles.line}></div>
            </header>
            
            <section>
                <div><span>Classe : </span>{data.class}</div>
                <div><span>Lien : </span>{data.link}</div>
                <div><span>Source : </span>{data.source}</div>
            </section>

            <div>&#x279A;</div>

        </article>
    )   

}



export default LinkedClass;