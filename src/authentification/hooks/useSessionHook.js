import { useState } from "react";
import { useAuth } from "@/auth/context/auth-context";
import { lang } from "@/src/common/Data/GlobalConstants";
import fetchInternalApi from "@/src/api/fetchInternalApi";
import AppRoutes from "@/src/Routing/AppRoutes";
import Router from "next/router";
import { useMessages } from "@/common/UserNotifications/Message/MessageProvider";

/**
 *   Specific function to be call everytime if we want to login or logout of the api
 */
export const useSessionHook = () => {
    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context
    const msg = useMessages();

    //Set a loading state to communicates to every form that use this hook
    const [isLoading, setIsLoading] = useState(false);

    //Extract the functions inside useHttpClient
    //const {isLoading} = useHttpClient();

    const logout = async () => {
        if (auth.user.isLoggedIn) {
            try {
                //Annonce the start of the loading process
                setIsLoading(true);

                const response = await fetchInternalApi("/api/logout", JSON.stringify({}));

                auth.setUser(response.user);

                if (response.positive) {
                    msg.addFlashMessage({
                        text: lang.successDisconnected,
                        theme: "positive",
                    });
                    await Router.push(`${response.redirectUri}`);
                } else {
                    msg.addMessage({
                        text: response.text,
                        positive: "negative",
                    });
                }

                //End the loading process
                setIsLoading(false);
            } catch (e) {
                //End the loading process
                setIsLoading(false);
                throw e;
            }
        } else {
            //Tell the user he is already logged in
            msg.addMessage({
                text: lang.youreAlreadyDisconnected, //"Vous êtes déjà connecté.",
                theme: "negative",
            });
        }
    };

    /**
     * Authenfication with the API via the /login path and using sendRequest function.
     * @param data
     * @return {Promise<void>}
     */
    const login = async (data) => {
        //Prevent useless request, making sure the use is not logged in.
        if (!auth.user.isLoggedIn) {
            //Annonce the start of the loading process
            setIsLoading(true);

            try {
                const response = await fetchInternalApi("/api/login", JSON.stringify(data));
                auth.setUser(response.user);

                //Display message only if not logged in
                if (!response.positive) {
                    msg.addMessage({
                        text: response.text,
                        theme: "negative",
                    });
                }

                if (response.positive) {
                    //If user not verified, redirect to aconfirmer
                    if (response.user.verify?.isVerified !== true) {
                        msg.addFlashMessage({
                            text: response.text,
                            theme: "primary",
                        });
                        await Router.push(AppRoutes.toConfirm.asPath);
                    } else {
                        msg.addFlashMessage({
                            text: lang.successConnected,
                            theme: "positive",
                        });
                        await Router.push(response.redirectUri);
                    }
                }

                //End the loading process
                setIsLoading(false);
            } catch (e) {
                //End the loading process
                setIsLoading(false);

                throw e;
            }
        } else {
            //Tell the user he is already logged in
            msg.addMessage({
                text: lang.youreAlreadyConnected, //"Vous êtes déjà connecté.",
                theme: "negative",
            });
        }
    };

    return { logout, login, isLoading };
};
