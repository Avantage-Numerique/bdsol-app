import React, {useCallback} from "react";
import PageHeader from "@/layouts/Header/PageHeader";
import {useAuth} from "@/auth/context/auth-context";
import {lang} from "@/common/Data/GlobalConstants";
import Button from "@/FormElements/Button/Button";
import {changeCookieChoices} from "@/common/Cookies/cookiesChoices";
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
                <div className="row">
                    <div className={"col-3 d-flex align-items-center justify-content-center"}>
                        {auth.cookiesChoices.choiceMade === true ?
                            <Image src={"/general_images/avnu-cookies-confirmed-thumb.png"} alt={"Cookies paramétrés!"} width={226} height={116} />
                        :
                            <Image src={"/general_images/avnu-cookies-thumb.png"} alt={"Cookies non paramétrés"} width={226} height={116} />
                        }
                    </div>
                    <div className={"col-9"}>
                        <h3>{auth.cookiesChoices.choiceMade === true ? lang.cookieMessageThanks : lang.cookieMessageNeedAnswer}</h3>
                        <div className={"d-grid column my-5"}>
                            <Button onClick={changeChoices} outline={"secondary"} className={"btn-lg"}>{lang.cookieChangeChoice}</Button>
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <ul className={"list-group"}>
                            {Object.keys(auth.cookiesChoices).map((key, index) => {
                                if (!skipChoicesProperties.includes(key)) {
                                    return (
                                        <li className={"list-group-item d-flex justify-content-between align-items-center"}
                                            key={`cookiesChoices${index}`}>
                                            <p className={"fs-4 m-0 py-1"}>
                                                {lang[`cookie${key.capitalize()}`]}
                                            </p>
                                            <div>
                                                <label className={`me-2 text-${auth.cookiesChoices[key] === true ? "success" : "danger"}`}>{auth.cookiesChoices[key] === true ? lang.cookiePositive : lang.cookieNegative}</label>
                                                <span className={`badge text-bg-${auth.cookiesChoices[key] === true ? "success" : "danger"} m-0`}>&nbsp;</span>
                                            </div>
                                        </li>
                                    );
                                }
                            })
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CookiesParams;