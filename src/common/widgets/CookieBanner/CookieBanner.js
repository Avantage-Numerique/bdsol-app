import React, {useState} from 'react'

//components
import BottomBanner from "@/common/UserNotifications/BottomBanner/BottomBanner";
import {lang} from "@/common/Data/GlobalConstants";
import {RouteLink} from "@/common/Components/RouteLink";


export default function CookieBanner(props) {

    const [cookiesAccepted, setCookiesAccepted] = useState(false);

    //On accept action
        // declenche le bottombanner
        // save le contenu dans un states
        //save dans un cookie le résultats.
    //on Refuse
        // declenche le bottombanner
        // save le contenu dans un states
        //save dans un cookie le résultats.
    //Returns date for choice for the futures ?<Button onClick={close} outline={"success"}>Cookie ok</Button>

    const onAcceptAllCookies = () => {
        console.log("COOKIE ACCEPTED");
    }
    const onRefuseAllCookies = () => {
        console.log("COOKIE REFUSED");
    }

    return (
        <>
            <BottomBanner
                buttonText={lang.cookieBannerAcceptButtonLabel}
                title={lang.cookieBannerTitle}
                bannerButtons={[
                    {label:lang.cookieBannerAcceptButtonLabel, action:onAcceptAllCookies, outline:"success"},
                    {label:lang.cookieBannerDenyButtonLabel, action:onRefuseAllCookies, outline:"secondary"}
                ]}>
                <p>Consultez notre politique de gestion de cookie dans notre <RouteLink routeName={"confidentialityPolicy"} uriSuffix={"#usage-cookies"} />.</p>
                <p>{lang.cookieBannerContent}</p>
            </BottomBanner>
        </>
    )
}
