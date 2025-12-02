import { LoadingStates } from "@/common/widgets/loading/LoadingStates";
import { useState } from "react";

export const useLoading = (currentState = LoadingStates.DEFAULT) => {
    //State that determine if the request is in progress
    const [isLoading, setIsLoading] = useState(false);
    const [currentLoadingState, setCurrentLoadingState] = useState(currentState);

    return {
        isLoading,
        setIsLoading,
        setCurrentLoadingState,
        currentLoadingState,
    };
};
