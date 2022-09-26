import { useEffect, useState } from "react";

//Styles
import styles from './ConnectionBanner.module.scss'
import useApi from "../../hooks/useApi";

const ConnexionBanner = () => {
    
    const [apiUp, setApiUp] = useState(undefined);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        useApi(setApiUp)
    }, []);

    useEffect(() => {
        if (apiUp === undefined)
        {
            setShowBanner(false);
        }
        else if (apiUp)
        {
            setTimeout(() => {
                setShowBanner(false);
            }, 7000);
        }
        //If api is down
        else
        {
            setShowBanner(true);
        }

    }, [apiUp]);

    if (showBanner)
        return (
            <div className={`${styles["banner"]} ${apiUp ? styles["connected-banner"] : styles["not-connected-banner"]}`}>
                {apiUp ? "Connecté à l'application!" : "L'application ne répond pas. Vérifiez votre connexion ou réessayez plus tard."}
            </div>
        )
    else
        return (<div hidden></div>)

}

export default ConnexionBanner;