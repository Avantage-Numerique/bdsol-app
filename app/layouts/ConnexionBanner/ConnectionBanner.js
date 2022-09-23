import { useEffect, useState } from "react";

//Styles
import styles from './ConnectionBanner.module.scss'
import useApi from "../../hooks/useApi";



const ConnexionBanner = () => {
    
    const connected = useApi();
    const [connectionState, setConnexionState] = useState(false);
    const [showBanner, setShowBanner] = useState(false);


    useEffect(() => {
        setConnexionState(connected)
    }, [connected])

    useEffect(() => {
        if (connectionState)
        {
            setTimeout(() => {
                setShowBanner(false);
            }, 7000);
        }
        else
         setShowBanner(true);
    }, [connectionState])

    if (showBanner)
        return (
            <div className={`${styles["banner"]} ${connectionState ? styles["connected-banner"] : styles["not-connected-banner"]}`}>
                {connectionState ? "Connecté à l'application!" : "L'application ne répond pas. Vérifiez votre connexion ou réessayez plus tard."}
            </div>
        )
    else
        return (
            <div hidden className={`${styles["banner"]} ${connectionState ? styles["connected-banner"] : styles["not-connected-banner"]}`}>
                {connectionState ? "Connecté à l'application!" : "L'application ne répond pas. Vérifiez votre connexion ou réessayez plus tard."}
            </div>
        )

}

export default ConnexionBanner;