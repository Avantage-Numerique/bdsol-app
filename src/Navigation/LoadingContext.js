"use client"

import { createContext, useContext, useState } from "react"
import { isDev } from "../helpers/configHelper"

const LoadingContext = createContext()

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isDev && (
                <div
                    className="position-fixed bottom-0 start-50 translate-middle p-1 opacity-75"
                    style={{
                        zIndex: "6666",
                    }}
                >
                    <button
                        type="button"
                        className="btn btn-color-secondary"
                        onClick={() => {
                            setIsLoading(!isLoading)
                        }}
                    >
                        Toggle loading
                    </button>
                </div>
            )}

            {children}
        </LoadingContext.Provider>
    )
}

export function useLoading() {
    return useContext(LoadingContext)
}
