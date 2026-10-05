"use client";

import { createContext, useContext, useRef, useState } from "react";

/**
 *
 * @type {import("react").Context<{isLoading: boolean, setIsLoading: (value: boolean) => void, setIsLoadingWTimeout: (timeout?: number) => void}>}
 */
const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    let timer = useRef(null);

    const setIsLoadingWTimeout = (timeout = 8000) => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }

        timer.current = setTimeout(() => {
            setIsLoading(false);
        }, timeout);

        setIsLoading(true);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, setIsLoadingWTimeout }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useNavLoading() {
    return useContext(LoadingContext);
}
