import React from 'react' 
import Link from 'next/link'

//Styling
import styles from './KebabButton.module.scss'

const KebabButton = ({ href, onClick, color }) => {

    if(href)
        return (
            <Link href={href}>
                <button 
                    className={`
                        ${color === "reverse" && styles["reverse-color"]} 
                        ${styles["Kebab-button"]}
                    `} 
                    type="button"
                >
                    <svg 
                        className="h-100"
                        viewBox="0 0 10 36">
                            <circle cx="5" cy="5" r="4"/>
                            <circle cx="5" cy="18" r="4"/>
                            <circle cx="5" cy="31" r="4"/>
                    </svg>
                </button>
            </Link>
        )

    //By default, the button isn't a hyperlink
    return (
        <button 
            className={`
                ${color === "reverse" && styles["reverse-color"]} 
                ${styles["Kebab-button"]}
            `}
            type="button"
        >
            <svg 
                className="h-100"
                viewBox="0 0 10 36">
                    <circle cx="5" cy="5" r="4"/>
                    <circle cx="5" cy="18" r="4"/>
                    <circle cx="5" cy="31" r="4"/>
            </svg>
        </button>
    )
}

export default KebabButton