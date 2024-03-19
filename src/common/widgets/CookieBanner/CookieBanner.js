import React, {useCallback, useEffect, useState} from 'react'

//components
import BottomBanner from "@/common/UserNotifications/BottomBanner/BottomBanner";
import {lang} from "@/common/Data/GlobalConstants";
import {RouteLink} from "@/common/Components/RouteLink";
import {allCookiesAccepted, basicOnlyCookiesAccepted, noCookiesAccepted} from "@/common/Cookies/cookiesChoices";
import {appConfig} from "@/src/configs/AppConfig";
import {useAuth} from '@/auth/context/auth-context';
import Image from "next/image";

//Style
import styles from "./CookieBanner.module.scss"

export default function CookieBanner(props) {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //si les cookies sont désactivés
    const [cookieEnabled, setCookieEnabled] = useState(false);
    useEffect(() => {
        setCookieEnabled(window.navigator.cookieEnabled);
    }, []);

    const [closingAnimationFinished, setClosingAnimationFinished] = useState(false);

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

    // if cookie disabled navigator.cookieEnabled//https://developer.mozilla.org/en-US/docs/Web/API/Navigator/cookieEnabled

    return (
        <>
            {cookieEnabled ?
                auth.choiceHasToBeMade &&
                    <BottomBanner
                        buttonText={lang.cookieBannerAcceptButtonLabel}
                        title={lang.cookieBannerTitle}
                        Thumb={() => {
                            return (
                                <Image
                                    src={"/general_images/avnu-cookies-thumb.png"} 
                                    alt={"Cookies non paramétré"}
                                    className={`${styles["cookie-baner__img"]}`}
                                    width={226} 
                                    height={116}
                                    className="px-2"
                                />
                                )
                            }
                        }
                        bannerButtons={[
                            {label:lang.cookieBannerAcceptButtonLabel, action:onAcceptAllCookies, outline:"success"},
                            {label:lang.cookieBannerAcceptBasicOnlyLabel, action:onConnectionOnlyCookies, outline:"secondary"},
                            {label:lang.cookieBannerDenyButtonLabel, action:onRefuseAllCookies, outline:"danger"}
                        ]}
                        onCloseCallback={onCloseAnimationFinished}
                    >
                        <p>Consultez notre politique de gestion de cookie dans notre <RouteLink
                            routeName={"confidentialityPolicy"} uriSuffix={"#usage-cookies"}/>.</p>
                        <p>{lang.cookieBannerContent} Si vous n'en choisissez aucun, vous ne pourrez pas vous
                            connecter à {appConfig.name}</p>
                    </BottomBanner>
                :
                <BottomBanner
                    buttonText={lang.cookieBannerAcceptButtonLabel}
                    title={lang.cookieDisabled}
                    Thumb={() => {
                        return (
                            <Image 
                                src={"/general_images/avnu-cookies-thumb.png"} 
                                alt={"Cookies non paramétrés"}
                                width={226} 
                                height={116}
                                className="px-2"
                            />
                        )
                    }
                    }
                    bannerButtons={[
                        {label:lang.cookieDisabledButtonLabel, action:onRefuseAllCookies, outline:"danger"}
                    ]}
                    onCloseCallback={onCloseAnimationFinished}
                >
                    <p>Consultez notre politique de gestion de cookie dans notre <RouteLink
                        routeName={"confidentialityPolicy"} uriSuffix={"#usage-cookies"}/>.</p>
                    <p>{lang.cookieBannerContent} Si vous choisissez aucun, vous ne pourrez pas vous
                        connecter à {appConfig.name}</p>
                </BottomBanner>
            }
        </>
    )
}
