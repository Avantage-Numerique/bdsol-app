import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "@/layouts/Header/PageHeader";
import { useAuth } from "@/auth/context/auth-context";
import { lang } from "@/common/Data/GlobalConstants";
import Button from "@/FormElements/Button/Button";
import { changeCookieChoices, cookiesExplanations } from "@/common/Cookies/cookiesChoices";
import Image from "next/image";
import fetchInternalApi from "@/src/api/fetchInternalApi";
import { isDev } from "@/src/helpers/configHelper";
import { csGetCookie } from "@/common/Cookies/clientSideCookies";
import { useMessages } from "@/common/UserNotifications/Message/MessageProvider";
import { useRouter } from "next/router";
import { isValidDateString } from "@/src/helpers/dates";

const CookiesParams = () => {
    const auth = useAuth();
    const router = useRouter();
    const msg = useMessages();
    const [avnuFunction, setAvnuFunction] = useState(null);

    const changeChoices = useCallback(async () => {
        const resetedCookiesChoices = changeCookieChoices(auth.cookiesChoices);

        const logOutResponse = await fetchInternalApi("/api/logout", JSON.stringify({}));
        auth.setUser(logOutResponse.user);

        await auth.saveCookieChoices({ ...resetedCookiesChoices });
        auth.setChoiceHasToBeMade(true);
        //logout
    }, []);

    //si les cookies sont désactivés
    const [cookieEnabled, setCookieEnabled] = useState(false);

    const CookieValueBoolean = ({ value }) => {
        return (
            <>
                <label className={`me-2 text-${value ? "success" : "danger"}`}>
                    {value ? lang.cookiePositive : lang.cookieNegative}
                </label>
                <span className={`badge text-bg-${value ? "success" : "danger"} m-0`}>&nbsp;</span>
            </>
        );
    };

    const CookieValueDate = ({ value }) => {
        const targetDate = new Date(value);
        const now = new Date();
        const hasPassed = now >= targetDate;
        return (
            <>
                <label className={`me-2 text-${hasPassed ? "danger" : "success"}`}>{value}</label>
                <span className={`badge text-bg-${hasPassed ? "danger" : "success"} m-0`}>&nbsp;</span>
            </>
        );
    };

    const CookieValueString = ({ value }) => {
        return (
            <>
                <label className={`me-2 text-dark`}>{value}</label>
                <span className={`badge text-dark m-0`}>&nbsp;</span>
            </>
        );
    };

    const CookiesValueFactory = ({ value }) => {
        if (typeof value === "boolean") {
            return <CookieValueBoolean value={value} />;
        }
        if (isValidDateString(value)) {
            return <CookieValueDate value={value} />;
        }
        if (typeof value === "string") {
            return <CookieValueString value={value} />;
        }
    };

    useEffect(() => {
        setCookieEnabled(window.navigator.cookieEnabled);
    }, []);

    //the cookie contains these values too, use this array to show only the other
    const skipChoicesProperties = ["choiceMade", "third"];

    return (
        <div className={"params-page params-page-cookies"}>
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                title={"Paramètres des cookies"}
                subTitle={""}
                description=""
                key={"confidentialPolicyPage"}
            />

            <section className={`container pt-5`}>
                <div className="row align-items-center justify-content-center">
                    <div className={"col-3"}>
                        {auth.cookiesChoices.choiceMade === true ? (
                            <Image
                                src={"/general_images/avnu-cookies-confirmed-thumb.png"}
                                alt={"Cookies paramétrés!"}
                                width={226}
                                height={116}
                            />
                        ) : (
                            <Image
                                src={"/general_images/avnu-cookies-thumb.png"}
                                alt={"Cookies non paramétrés"}
                                width={226}
                                height={116}
                            />
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className={"col-12"}>
                        {!cookieEnabled && <p className={"alert alert-primary"}>{lang.cookieDisabled}</p>}
                        <h3>
                            {auth.cookiesChoices.choiceMade === true
                                ? lang.cookieMessageThanks
                                : lang.cookieMessageNeedAnswer}
                        </h3>
                    </div>

                    <div className={"col-12"}>
                        <ul className={"list-group mt-3"}>
                            {Object.keys(auth.cookiesChoices).map((key, index) => {
                                if (!skipChoicesProperties.includes(key)) {
                                    return (
                                        <li
                                            className={
                                                "list-group-item d-flex justify-content-between align-items-center"
                                            }
                                            key={`cookiesChoices${index}`}
                                        >
                                            <div className={"pe-5"}>
                                                <p className={"fs-4 m-0 pt-1"}>{lang[`cookie${key.capitalize()}`]}</p>
                                                <p className={"m-0 pb-1"}>{cookiesExplanations[key]}</p>
                                            </div>
                                            <div className={"w-25 text-end"}>
                                                {auth.cookiesChoices.choiceMade === true && (
                                                    <CookiesValueFactory value={auth.cookiesChoices[key]} />
                                                )}
                                            </div>
                                        </li>
                                    );
                                }
                            })}
                        </ul>

                        {cookieEnabled && (
                            <div className={"d-flex align-items-center justify-content-center my-5"}>
                                <Button
                                    onClick={changeChoices}
                                    color={auth.cookiesChoices.choiceMade === true ? "danger" : "warning"}
                                    className={"btn-lg"}
                                >
                                    {auth.cookiesChoices.choiceMade === true
                                        ? lang.cookieChangeChoice
                                        : lang.cookieMakeYourChoice}
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className={"col-12 pt-5"}>
                        <div
                            className={"alert alert-info d-flex justify-content-between align-items-center"}
                            key={`cookiesChoices123third`}
                        >
                            <div className={"pe-5"}>
                                <p className={"fs-5 m-0 pt-1"}>{cookiesExplanations.third}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isDev && (
                <section className={`container py-5`}>
                    <div className={"col-12 pt-5"}>
                        <Button
                            className={"me-2"}
                            onClick={async () => {
                                const theme = ["positive", "negative", "primary", "secondary"];
                                const targetTheme = theme[Math.floor(Math.random() * theme.length)];
                                await msg.addFlashMessage({
                                    text: `Test de cookies venant de l'autre côté du HTTP theme : ${targetTheme}`,
                                    theme: targetTheme,
                                });
                                router.push(router.asPath);
                            }}
                        >
                            Test flash message !
                        </Button>

                        <Button
                            onClick={async () => {
                                const fm = csGetCookie(process.env.APP_FUNCTIONS_COOKIE_NAME);
                                setAvnuFunction(fm);
                            }}
                        >
                            get function cookie
                        </Button>
                    </div>
                    {avnuFunction && (
                        <div className={"col-12 pt-5"}>
                            <hr />
                            <pre>{JSON.stringify(avnuFunction)}</pre>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default CookiesParams;
