//Importing the form
import Register from '@/auth/components/Forms/Register/Register'
import PageMeta from "@/src/common/PageMeta/PageMeta";

//styling
import styles from './inscription.module.scss'

const RegisterPage = () => {

    return (
        <section className={`d-flex align-items-center justify-content-center`}>
            <PageMeta 
                title={"Inscription - AVNU"}
                description={"Créez-vous un compte afin de pouvoir, vous aussi, contribuer à la base de données."}
            />
            <div className={`header-less-page ${styles["inscription-page"]}`}>
                <Register/>
            </div>
        </section>
    )
    
}

export default RegisterPage;