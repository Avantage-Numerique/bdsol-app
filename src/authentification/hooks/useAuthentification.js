import {useEffect} from "react";
import Router from "next/router";
import fetchInternalApi from "@/src/api/fetchInternalApi";

export default function useAuthentification({redirectTo = "", redirectIfFound = false} = {}) {

    const {data: user} = fetchInternalApi("/api/user");

    useEffect(() => {
        if (!redirectTo || !user) return;

        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && user?.isLoggedIn)
        ) {
            Router.push(redirectTo);
        }
    }, [user, redirectIfFound, redirectTo]);

    return {user};
}