import { useEffect, useState } from "react";

//Styles
import styles from './ConnectionBanner.module.scss'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

const ConnectionBanner = () => {
    
    const [showBanner, setShowBanner] = useState(false);
    const auth = useAuth();
    
    useEffect(() => {
        if (auth.apiUp === undefined)
        {
            setShowBanner(false);
        }
        else if (auth.apiUp)
        {
            setTimeout(() => {
                setShowBanner(false);
            }, 6000);
        }
        //If api is down
        else
        {
            setShowBanner(true);
        }

    }, [auth.apiUp]);

    if (showBanner)
        return (
            <div className={`${styles["banner"]} ${auth.apiUp ? styles["connected-banner"] : styles["not-connected-banner"]}`}>
                {auth.apiUp ? "Connecté à l'application!" : "L'application ne répond pas. Vérifiez votre connexion ou réessayez plus tard."}
            </div>
        )
    else
        return (<div hidden />)

}

export default ConnectionBanner;