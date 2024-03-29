
//Importing the form
import Register from '@/auth/components/Forms/Register/Register'

//styling
import styles from './inscription.module.scss'
const RegisterPage = () => {

    return (
        <section className={`auth-page d-flex align-items-center justify-content-center`}>
            <div className={`${styles["inscription-page"]}`}>
            <Register/>
            </div>
        </section>
    )
    
}

export default RegisterPage;