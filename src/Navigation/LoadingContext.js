"use client";

import { createContext, useContext, useState } from "react";

/**
 *
 * @type {import("react").Context<{isLoading: boolean, setIsLoading: (value: boolean) => void}>}
 */
const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>;
}

export function useNavLoading() {
    return useContext(LoadingContext);
}
