import {useEffect} from "react";
import Router from "next/router";
import fetchInternalApi from "@/src/api/fetchInternalApi";

export default function useUser({redirectTo = "", redirectIfFound = false} = {}) {

    let user = null;

    useEffect(() => {
        const {user} = fetchInternalApi("/api/user");
        console.log("useUser", user);
    }, [])

    useEffect(() => {
        const getUserSession = async () => {
            const {user} = await fetchInternalApi("/api/user");
            return user;
        }
        console.log("useEffect useUser", user);
        user = getUserSession();
        if (!redirectTo || !user) return;

        if (redirectTo
            && !redirectIfFound
            && !user?.tokenVerified
        ) {
            console.log("supposed to redirect.", redirectTo);
            Router.push(redirectTo);
        }
    }, [user, redirectTo]);

    return {user};
}