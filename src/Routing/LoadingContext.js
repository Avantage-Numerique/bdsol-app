"use client";

import { createContext, useContext, useState } from "react";
import { isDev } from "../helpers/configHelper";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isDev && (
        <div
          className="fixed-bottom p-3"
          style={{
            zIndex: "6666",
          }}
        >
          <button
            type="button"
            className="btn btn-color-secondary"
            onClick={() => {
              setIsLoading(!isLoading);
            }}
          >
            Toggle loading
          </button>
        </div>
      )}

      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
