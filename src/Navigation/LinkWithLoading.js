"use client";

import Link from "next/link";
import { useLoading } from "./LoadingContext"; // Ton contexte custom

export default function LinkWithLoading({ href, children, ...props }) {
  const { setIsLoading } = useLoading();

  const handleClick = (e) => {
    // Démarrer le chargement avant la navigation
    setIsLoading(true);

    // Si c'est un lien externe ou un téléchargement, ne pas intercepter
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      (e.nativeEvent && e.nativeEvent.which === 2)
    ) {
      return;
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
