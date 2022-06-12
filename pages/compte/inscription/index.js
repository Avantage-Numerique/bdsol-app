
//Importing the form
import Register from '../../../authentication/components/Forms/Register/Register'

//styling
import styles from './inscription.module.scss'
const RegisterPage = () => {

    return (
        <section className={`col-12 ${styles["inscription-page"]}`}>
            <Register/>
        </section>
    )
    
}

export default RegisterPage;