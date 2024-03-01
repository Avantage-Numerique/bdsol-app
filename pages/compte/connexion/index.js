import Login from '@/auth/components/Forms/Login/Login'
import PageMeta from "@/src/common/PageMeta/PageMeta";


const LoginPage = () => {

    return (
        <>
            <PageMeta 
                title={"Connexion - AVNU"}
                description={"Connectez-vous à AVNU afin de pouvoir, vous aussi, contribuer à la base de données."}
            />
            <Login/>
        </>
    )

}

export default LoginPage;