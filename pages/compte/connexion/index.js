import Login from '@/auth/components/Forms/Login/Login'
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";


const LoginPage = () => {

    return (
        <>
            <PageMeta 
                title={lang.compte__connexion__title}
                description={lang.compte__connexion__description}
            />
            <Login/>
        </>
    )

}

export default LoginPage;