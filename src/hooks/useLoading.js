import {LoadingStates} from "@/common/widgets/loading/LoadingStates";
import {useState} from "react";

export const useLoading = () => {

    //State that determine if the request is in progress
    const [isLoading, setIsLoading] = useState(false);
    const [currentLoadingState, setLoadingState] = useState(LoadingStates.DEFAULT);

    return {isLoading, setIsLoading, setLoadingState, currentLoadingState};
}