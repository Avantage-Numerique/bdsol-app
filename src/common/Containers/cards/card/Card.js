//styling 
import styles from './card.module.scss'


const Card = ({ header, children }) => {

    return (
        <article className={`${styles["card"]}`}>

            {/* If a header has been passed as prop, then make it appear */}
            { header &&
                <header className="col-12">
                    <div className="col-12">
                        <h5 className="col-12"> {header} </h5>
                    </div>
                </header>
            }

            <div className="col-12">
                {children}
            </div>

        </article>
    )

}


export default Card