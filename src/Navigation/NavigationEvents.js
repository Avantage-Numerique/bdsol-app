"use client"; // Important : ce code doit s'exécuter côté client

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useLoading } from "./LoadingContext"; // Un contexte personnalisé pour gérer l'état de chargement

export default function NavigationEvents() {
    const { setIsLoading } = useLoading(); // Fonction pour mettre à jour l'état de chargement

    const router = useRouter();

    let timer = useRef(null);

    const beforeNavigate = () => {
        if (!timer.current) {
            timer.current = setTimeout(() => {
                setIsLoading(true);
            }, process.env.NEXT_PUBLIC_NAV_LOADER_DELAY);
        }
    };

    const afterNavigate = () => {
        resetTimer();
        setIsLoading(false);
    };

    const resetTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    };

    useEffect(() => {
        router.events.on("routeChangeStart", beforeNavigate);
        router.events.on("routeChangeComplete", afterNavigate);
        router.events.on("routeChangeError", afterNavigate);

        return () => {
            router.events.off("routeChangeStart", beforeNavigate);
            router.events.off("routeChangeComplete", afterNavigate);
            router.events.off("routeChangeError", afterNavigate);

            resetTimer();
        };
    }, [router]);

    return null;
}
