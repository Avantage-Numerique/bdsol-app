import React, {useCallback, useEffect, useState} from "react";
import PageHeader from "@/layouts/Header/PageHeader";
import {useAuth} from "@/auth/context/auth-context";
import {lang} from "@/common/Data/GlobalConstants";
import Button from "@/FormElements/Button/Button";
import {changeCookieChoices, cookiesExplanations} from "@/common/Cookies/cookiesChoices";
import Image from 'next/image';
import fetchInternalApi from "@/src/api/fetchInternalApi";

const CookiesParams = () => {

    const auth = useAuth();

    const changeChoices = useCallback(async () => {
        const resetedCookiesChoices = changeCookieChoices(auth.cookiesChoices);

        const logOutResponse = await fetchInternalApi("/api/logout", JSON.stringify({}));
        auth.setUser(logOutResponse.user);

        auth.saveCookieChoices({...resetedCookiesChoices});
        auth.setChoiceHasToBeMade(true);
        //logout
    }, []);

    //si les cookies sont désactivés
    const [cookieEnabled, setCookieEnabled] = useState(false);
    useEffect(() => {
        setCookieEnabled(window.navigator.cookieEnabled);
    }, []);

    //the cookie contains these values too, use this array to show only the other
    const skipChoicesProperties = ['choiceMade', 'third'];

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
                        {auth.cookiesChoices.choiceMade === true ?
                            <Image src={"/general_images/avnu-cookies-confirmed-thumb.png"} alt={"Cookies paramétrés!"}
                                   width={226} height={116}/>
                            :
                            <Image src={"/general_images/avnu-cookies-thumb.png"} alt={"Cookies non paramétrés"}
                                   width={226} height={116}/>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className={"col-12"}>
                        {!cookieEnabled &&
                            <p className={"alert alert-primary"}>{lang.cookieDisabled}</p>
                        }
                        <h3>{auth.cookiesChoices.choiceMade === true ? lang.cookieMessageThanks : lang.cookieMessageNeedAnswer}</h3>
                    </div>

                    <div className={"col-12"}>
                        <ul className={"list-group mt-3"}>
                            {Object.keys(auth.cookiesChoices).map((key, index) => {

                                if (!skipChoicesProperties.includes(key)) {
                                    return (
                                        <li className={"list-group-item d-flex justify-content-between align-items-center"}
                                            key={`cookiesChoices${index}`}>
                                            <div className={"pe-5"}>
                                                <p className={"fs-4 m-0 pt-1"}>
                                                    {lang[`cookie${key.capitalize()}`]}
                                                </p>
                                                <p className={"m-0 pb-1"}>{cookiesExplanations[key]}</p>
                                            </div>
                                            <div className={"w-25 text-end"}>
                                                {auth.cookiesChoices.choiceMade === true &&
                                                    <>
                                                        <label
                                                            className={`me-2 text-${auth.cookiesChoices[key] === true ? "success" : "danger"}`}>{auth.cookiesChoices[key] === true ? lang.cookiePositive : lang.cookieNegative}</label>
                                                        <span
                                                            className={`badge text-bg-${auth.cookiesChoices[key] === true ? "success" : "danger"} m-0`}>&nbsp;</span>
                                                    </>
                                                }
                                            </div>
                                        </li>
                                    );
                                }
                            })
                            }
                        </ul>

                        {cookieEnabled &&
                            <div className={"d-flex align-items-center justify-content-center my-5"}>
                                <Button onClick={changeChoices}
                                        color={(auth.cookiesChoices.choiceMade === true ? "danger" : "warning")}
                                        className={"btn-lg"}>{auth.cookiesChoices.choiceMade === true ? lang.cookieChangeChoice : lang.cookieMakeYourChoice}</Button>
                            </div>
                        }
                    </div>

                    <div className={"col-12 pt-5"}>
                        <div className={"alert alert-info d-flex justify-content-between align-items-center"}
                             key={`cookiesChoices123third`}>
                            <div className={"pe-5"}>
                                <p className={"fs-5 m-0 pt-1"}>
                                    {cookiesExplanations.third}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
)
}

export default CookiesParams;