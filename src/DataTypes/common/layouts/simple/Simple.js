import React from 'react' 

import styles from './Simple.module.scss'


/*
        This component is intended to receive and apply all the rules
        and styling common to all the entities's simple component 
*/

const Simple = ({ children, className }) => {

    return (
        <article className={`bg-white rounded ${styles.simple} ${className}`}>
            {children}
        </article>
    )
}

export default Simple