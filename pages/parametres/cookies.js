import React, {useCallback} from "react";
import PageHeader from "@/layouts/Header/PageHeader";
import {useAuth} from "@/auth/context/auth-context";
import {lang} from "@/common/Data/GlobalConstants";
import Button from "@/FormElements/Button/Button";
import {changeCookieChoices} from "@/common/Cookies/cookiesChoices";

const CookiesParams = () => {

    const auth = useAuth();


    const changeChoices = useCallback(() => {
        const resetedCookiesChoices = changeCookieChoices(auth.cookiesChoices);
        auth.saveCookieChoices({...resetedCookiesChoices});
        auth.setChoiceHasToBeMade(true);
    }, []);

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
                    <div className={"col"}>
                        <ul className={"list-group"}>
                        {Object.keys(auth.cookiesChoices).map((key, index) => {
                                return (
                                    <li className={"list-group-item d-flex justify-content-between align-items-center"} key={`cookiesChoices${index}`}>
                                        <h4>
                                            {lang[`cookie${key.capitalize()}`]}
                                        </h4>
                                        <span className={`alert alert-${auth.cookiesChoices[key] === true ? "success" : "danger"} m-0`}>{auth.cookiesChoices[key] === true ? lang.cookiePositive : lang.cookieNegative}</span>
                                    </li>
                                );
                        })
                        }
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className={"col d-grid column my-5"}>
                        <Button onClick={changeChoices} color={"secondary"}>Changer mon choix</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CookiesParams;