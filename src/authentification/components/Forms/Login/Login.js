import React, { useContext, useEffect } from "react";

//Context
import { useAuth } from "@/src/authentification/context/auth-context";
import Router from "next/router";
import AppRoutes from "@/src/Routing/AppRoutes";
import { MessageContext } from "@/src/common/UserNotifications/Message/Context/Message-Context";

//Custom hooks
import { useForm } from "@/src/hooks/form-hook";
import { useSessionHook } from "@/auth/hooks/useSessionHook";

//Form components
import Input from "@/src/common/FormElements/Input/Input";
import Button from "@/src/common/FormElements/Button/Button";
import Spinner from "@/src/common/widgets/spinner/Spinner";

//Styling
import styles from "./Login.module.scss";
import { lang } from "@/common/Data/GlobalConstants";
import { RouteLink } from "@/common/Components/RouteLink";

const Login = () => {
    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();
    const msg = useContext(MessageContext);

    //Extract the functions inside the session hook
    const { login, isLoading } = useSessionHook();

    //  First of all, verify if the user chose auth cookies as OK
    useEffect(() => {
        if (!auth.cookiesChoices.auth) {
            Router.push({
                pathname: AppRoutes.paramsCookies.asPath,
                query: { msg: lang.cookieMessageNeedAuthCookie },
            });
        }
    }, [auth.cookiesChoices.auth]);

    /*
        First of all, verify if the user is logged in.
        If he isn't, then redirect him in the account page
    */
    useEffect(() => {
        if (auth.user.isLoggedIn) {
            Router.push(AppRoutes.account.asPath);
        }
    }, [auth.isLoggedIn]);

    const [formState, formTools] = useForm(
        {
            username: {
                value: "",
                isValid: true,
            },
            password: {
                value: "",
                isValid: true,
            },
        },
        false
    );

    //Submit the form
    const authSubmitHandler = async (event) => {
        event.preventDefault();

        //Make sure that the form is valid before submitting it
        if (formState.isValid) {
            const formData = {
                username: formState.inputs.username.value,
                password: formState.inputs.password.value, //@todo encrypt with app key before sending? or https is enought ?
            };

            //Call the login hook responsible for the connection
            await login(formData);
        } else {
            /*
                Send a message if the form is not valid
            */
            msg.addMessage({
                text: "Attention. Le formulaire envoyé n'est pas valide. Assurez-vous que tous les champs sont bien remplis.",
                positive: false,
            });
        }
    };

    return (
        <section className={`${styles.authPage}`}>
            {/* Spinner to display when the app is waiting for the api*/}
            {isLoading && <Spinner fixed className={"bg-primary-lighter"} />}

            <form onSubmit={authSubmitHandler} className="bg-primary-lighter rounded">
                <div className={"d-flex flex-column"}>
                    <h3 className="text-dark-light mb-4">Connexion</h3>

                    <Input
                        name="username"
                        type="text"
                        label={lang.loginUserNameLabel}
                        validationRules={[{ name: "REQUIRED" }]}
                        errorText={lang.loginUserNameErrorLabel}
                        formTools={formTools}
                        className={"pb-3"}
                    />

                    <Input
                        name="password"
                        type="password"
                        label={lang.loginPasswordLabel}
                        validationRules={[{ name: "REQUIRED" }]}
                        errorText={lang.loginPasswordErrorLabel}
                        formTools={formTools}
                        className={"pb-3"}
                    />

                    <div className={"pb-3"}>
                        <Button type="submit" size="slim" disabled={!formState.isValid}>
                            {lang.loginCTAButtonLabel}
                        </Button>
                    </div>

                    <p className={`${styles.formRedirection} pb-4`}>
                        <RouteLink className={"internal-link no-decoration text-secondary"} routeName={"register"} />
                    </p>

                    <p className={`pb-3 m-0`}>{lang.loginReinitPasswordTitle}</p>
                    <RouteLink
                        routeName={"resetPassword"}
                        className={"internal-link no-decoration internal-link-secondary"}
                        label={lang.loginReinitPasswordBtnLabel}
                    />
                </div>
            </form>
        </section>
    );
};

export default Login;
