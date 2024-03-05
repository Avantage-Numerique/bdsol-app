//Importing the form
import Register from '@/auth/components/Forms/Register/Register'
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";

//styling
import styles from './inscription.module.scss'

const RegisterPage = () => {

    return (
        <section className={`d-flex align-items-center justify-content-center`}>
            <PageMeta 
                title={lang.compte__singup__title}
                description={lang.compte__singup__description}
            />
            <div className={`header-less-page ${styles["inscription-page"]}`}>
                <Register/>
            </div>
        </section>
    )
    
}

export default RegisterPage;