"use client"; // Important : ce code doit s'exécuter côté client

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "./LoadingContext"; // Un contexte personnalisé pour gérer l'état de chargement

import { useRouter } from "next/router";

export default function NavigationEvents() {
    // const pathname = usePathname();
    // const searchParams = useSearchParams();

    const { setIsLoading } = useLoading(); // Fonction pour mettre à jour l'état de chargement

    const router = useRouter();

    let timer;

    const beforeNavigate = () => {
        console.log("beforeNavigate");

        timer = setTimeout(() => {
            console.log("beforeNavigate timeout");

            setIsLoading(true);
        }, 300);
    };

    const afterNavigate = () => {
        console.log("afterNavigate");

        clearTimeout(timer);
        setIsLoading(false);
    };

    useEffect(() => {
        router.events.on("routeChangeStart", beforeNavigate);
        router.events.on("routeChangeComplete", afterNavigate);
        router.events.on("routeChangeError", afterNavigate);

        return () => {
            router.events.off("routeChangeStart", beforeNavigate);
            router.events.off("routeChangeComplete", afterNavigate);
            router.events.off("routeChangeError", afterNavigate);
        };
    }, [router]);

    // useEffect(() => {
    //     setIsLoading(false);
    // }, [pathname, searchParams, setIsLoading]);

    return null;
}
