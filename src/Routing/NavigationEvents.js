"use client"; // Important : ce code doit s'exécuter côté client

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "./LoadingContext"; // Un contexte personnalisé pour gérer l'état de chargement

export default function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setIsLoading } = useLoading(); // Fonction pour mettre à jour l'état de chargement

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams, setIsLoading]);

  return null;
}
