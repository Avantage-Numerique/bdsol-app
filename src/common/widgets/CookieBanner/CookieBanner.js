import React, {useCallback, useState} from 'react'

//components
import BottomBanner from "@/common/UserNotifications/BottomBanner/BottomBanner";
import {lang} from "@/common/Data/GlobalConstants";
import {RouteLink} from "@/common/Components/RouteLink";
import fetchInternalApi from "@/src/api/fetchInternalApi";
import {allCookiesAccepted, basicOnlyCookiesAccepted, noCookiesAccepted} from "@/common/Cookies/cookiesChoices";


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

    const saveCookieChoices = useCallback((choices) => {
        const savedCookie = fetchInternalApi("/api/cookies-choices", JSON.stringify(choices));

        console.log("choices", choices, "return", savedCookie);
        return {
            "cookieReturn": savedCookie,
        };
    }, []);

    const onAcceptAllCookies = useCallback(() => {
        return saveCookieChoices({...allCookiesAccepted});
    }, []);

    const onConnectionOnlyCookies = useCallback(() => {
        return saveCookieChoices({...basicOnlyCookiesAccepted});
    }, []);

    const onRefuseAllCookies = useCallback(() => {
        return saveCookieChoices({...noCookiesAccepted});
    }, []);


    return (
        <>
            <BottomBanner
                buttonText={lang.cookieBannerAcceptButtonLabel}
                title={lang.cookieBannerTitle}
                bannerButtons={[
                    {label:lang.cookieBannerAcceptButtonLabel, action:onAcceptAllCookies, outline:"success"},
                    {label:lang.cookieBannerAcceptBasicOnlyLabel, action:onConnectionOnlyCookies, outline:"secondary"},
                    {label:lang.cookieBannerDenyButtonLabel, action:onRefuseAllCookies, outline:"danger"}
                ]}>
                <p>Consultez notre politique de gestion de cookie dans notre <RouteLink routeName={"confidentialityPolicy"} uriSuffix={"#usage-cookies"} />.</p>
                <p>{lang.cookieBannerContent}</p>
            </BottomBanner>
        </>
    )
}
