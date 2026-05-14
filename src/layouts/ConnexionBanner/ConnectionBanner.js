import { useEffect, useState } from "react";

//Styles
import styles from "./ConnectionBanner.module.scss";

//Context
import { useAuth } from "@/src/authentification/context/auth-context";
import { lang } from "@/common/Data/GlobalConstants";
import { isDev } from "@/src/helpers/configHelper";
import Icon from "@/common/widgets/Icon/Icon";

const ConnectionBanner = () => {
    const [showBanner, setShowBanner] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        if (auth.apiUp === undefined) {
            setShowBanner(false);
        } else if (auth.apiUp) {
            setTimeout(() => {
                setShowBanner(false);
            }, 10000);
        }
        //If api is down
        else {
            setShowBanner(true);
        }
    }, [auth.apiUp]);

    if (showBanner) {
        if (isDev) {
            return (
                <div
                    className={`${styles["banner"]} d-flex justify-content-center align-items-center ${auth.apiUp ? styles["connected-banner"] : styles["not-connected-banner"]}`}
                >
                    <Icon iconName={"exclamation-triangle"} className={"fs-2 pe-2 text-red"} />
                    {auth.apiUp ? lang.apiIsUpDev : lang.apiIsDownDev}
                </div>
            );
        } else {
            return (
                <div
                    className={`${styles["banner"]} ${auth.apiUp ? styles["connected-banner"] : styles["not-connected-banner"]}`}
                >
                    <Icon iconName={"exclamation-triangle"} className={"fs-2 pe-2 text-green"} />{" "}
                    {auth.apiUp ? lang.apiIsUp : lang.apiIsDown}
                </div>
            );
        }
    } else {
        return <div hidden />;
    }
};

export default ConnectionBanner;
