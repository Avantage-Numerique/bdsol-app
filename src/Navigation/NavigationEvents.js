"use client"; // Important : ce code doit s'exécuter côté client

import nextConfig from "@/next.config";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { useLoading } from "./LoadingContext"; // Un contexte personnalisé pour gérer l'état de chargement

export default function NavigationEvents() {
    const { setIsLoading } = useLoading(); // Fonction pour mettre à jour l'état de chargement

    const router = useRouter();

    let timer;

    const beforeNavigate = () => {
        console.log("beforeNavigate");

        timer = setTimeout(() => {
            console.log("beforeNavigate timeout");

            setIsLoading(true);
        }, nextConfig.publicRuntimeConfig.navLoaderDelay);
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

    return null;
}
