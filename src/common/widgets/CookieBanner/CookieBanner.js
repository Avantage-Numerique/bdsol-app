import React, {useCallback, useState} from 'react'

//components
import BottomBanner from "@/common/UserNotifications/BottomBanner/BottomBanner";
import {lang} from "@/common/Data/GlobalConstants";
import {RouteLink} from "@/common/Components/RouteLink";
import {allCookiesAccepted, basicOnlyCookiesAccepted, noCookiesAccepted} from "@/common/Cookies/cookiesChoices";
import {appConfig} from "@/src/configs/AppConfig";
import {useAuth} from '@/auth/context/auth-context';
import {csSaveCookieChoices} from "@/common/Cookies/clientSideSaveCookiesChoices";


export default function CookieBanner(props) {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    const [closingAnimationFinished, setClosingAnimationFinished] = useState(false);

    const saveCookieChoices = async (choices) => {
        await csSaveCookieChoices(choices);
    };

    const onAcceptAllCookies = useCallback(() => {
        return auth.saveCookieChoices({...allCookiesAccepted});
    }, []);

    const onConnectionOnlyCookies = useCallback(() => {
        return auth.saveCookieChoices({...basicOnlyCookiesAccepted});
    }, []);

    const onRefuseAllCookies = useCallback(() => {
        return auth.saveCookieChoices({...noCookiesAccepted});
    }, []);

    const onCloseAnimationFinished = useCallback(() => {
        auth.setChoiceHasToBeMade(false);
    }, []);


    return (
        <>
            {auth.choiceHasToBeMade &&
                <BottomBanner
                    buttonText={lang.cookieBannerAcceptButtonLabel}
                    title={lang.cookieBannerTitle}
                    bannerButtons={[
                        {label:lang.cookieBannerAcceptButtonLabel, action:onAcceptAllCookies, outline:"success"},
                        {label:lang.cookieBannerAcceptBasicOnlyLabel, action:onConnectionOnlyCookies, outline:"secondary"},
                        {label:lang.cookieBannerDenyButtonLabel, action:onRefuseAllCookies, outline:"danger"}
                    ]}
                    onCloseCallback={onCloseAnimationFinished}
                >
                    <p>Consultez notre politique de gestion de cookie dans notre <RouteLink routeName={"confidentialityPolicy"} uriSuffix={"#usage-cookies"} />.</p>
                    <p>{lang.cookieBannerContent} Si vous choisissez aucun, vous ne pourrez pas vous connecter à {appConfig.name}</p>
                </BottomBanner>
            }
        </>
    )
}
