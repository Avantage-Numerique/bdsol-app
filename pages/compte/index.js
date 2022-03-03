import { useContext, useEffect } from 'react'
import { AuthContext } from '../../authentication/context/auth-context'
import Router , {useRouter}  from 'next/router';


const accountPage = () => {

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    const router = useRouter()

    useEffect(() => {
        if(!auth.isLoggedIn){
            router.push('/compte/connexion')
        }
    },[])
   


    return (
        <div>bonjour</div>
    );
}

export default accountPage