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
                        {Object.keys(auth.cookiesChoices).map((key, index) => {
                                return (
                                    <div key={`cookiesChoices${index}`}>
                                        <h2>
                                            {lang[`cookie${key.capitalize()}`]} : {auth.cookiesChoices[key] === true ? "Oui": "Non"}
                                        </h2>
                                        <hr />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="row">
                    <div className={"col d-grid column"}>
                        <Button onClick={changeChoices} color={"secondary"}>Changer mon choix</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CookiesParams;