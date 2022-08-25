import { Main } from 'next/document'
import React from 'react' 


//Styling
import styles from './MainPersonView.module.scss'


const MainPersonView = ({data}) => {


    return (
        <article className={`${styles["mainPersonView"]}`}>
            
            {/*
            *
            *  HEADER 
            * 
            */}
            <header>

                {/* Background image */}
                <div></div>

                {/* Text content */}
                <h1>{data.firstName} {data.lastName}</h1>

            </header>

            {/*
            *
            *  MAIN SECTION
            * 
            */}
            <section>

                <h2>blalba</h2>

            </section>


        </article>
    )
}


export default MainPersonView
