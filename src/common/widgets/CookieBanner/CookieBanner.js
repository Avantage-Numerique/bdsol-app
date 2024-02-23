import React, {useCallback, useState} from 'react'

//components
import BottomBanner from "@/common/UserNotifications/BottomBanner/BottomBanner";
import {lang} from "@/common/Data/GlobalConstants";
import {RouteLink} from "@/common/Components/RouteLink";
import {allCookiesAccepted, basicOnlyCookiesAccepted, noCookiesAccepted} from "@/common/Cookies/cookiesChoices";
import {appConfig} from "@/src/configs/AppConfig";
import csSetCookie from "@/common/Cookies/clientSideSaveCookie";
import {useAuth} from '@/auth/context/auth-context';


export default function CookieBanner(props) {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    const [choiceHasToBeMade, setChoiceHasToBeMade] = useState(!auth.cookiesChoices.choiceMade);

    const saveCookieChoices = async (choices) => {
        /*const savedCookie = await fetchInternalApi("/api/cookies-choices", JSON.stringify(choices));
        console.log("savedCookie",savedCookie);
        return {
            "cookieReturn": "not passed yet",
        };*/
        csSetCookie('avnuCookies', JSON.stringify(choices), {
            expires: 24*60*60*1000, // Expires in 1 day
            path: '/',     // Cookie available in all paths
            domain: process.env.APP_BASE_URL, // Limit cookie to a specific domain
            secure: true,  // Cookie will only be sent over HTTPS
            sameSite: 'strict' // Restricts cookie to same-site requests
        });
        auth.setCookiesChoices(choices);
    };

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
            {choiceHasToBeMade &&
                <BottomBanner
                    buttonText={lang.cookieBannerAcceptButtonLabel}
                    title={lang.cookieBannerTitle}
                    bannerButtons={[
                        {label:lang.cookieBannerAcceptButtonLabel, action:onAcceptAllCookies, outline:"success"},
                        {label:lang.cookieBannerAcceptBasicOnlyLabel, action:onConnectionOnlyCookies, outline:"secondary"},
                        {label:lang.cookieBannerDenyButtonLabel, action:onRefuseAllCookies, outline:"danger"}
                    ]}>
                    <p>Consultez notre politique de gestion de cookie dans notre <RouteLink routeName={"confidentialityPolicy"} uriSuffix={"#usage-cookies"} />.</p>
                    <p>{lang.cookieBannerContent} Si vous choisissez aucun, vous ne pourrez pas vous connecter à {appConfig.name}</p>
                </BottomBanner>
            }
        </>
    )
}
