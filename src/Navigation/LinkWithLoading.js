"use client";

import Link from "next/link";
import { useLoading } from "./LoadingContext"; // Ton contexte custom

export default function LinkWithLoading({ href, children, onClick, ...props }) {
    const { setIsLoading } = useLoading();

    const handleClick = (e) => {
        // Si c'est un lien externe ou un téléchargement, ne pas intercepter
        if (e.metaKey || e.ctrlKey || e.shiftKey || (e.nativeEvent && e.nativeEvent.which === 2)) {
            return;
        }

        // Démarrer le chargement avant la navigation
        setIsLoading(true);
    };

    return (
        <Link
            href={href}
            onClick={(e) => {
                handleClick(e);
                onClick?.(); // si onclick exist
            }}
            {...props}
        >
            {children}
        </Link>
    );
}
