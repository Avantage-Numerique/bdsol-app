"use client";

import Spinner from "../common/widgets/spinner/Spinner";

import { useNavLoading } from "./LoadingContext";

export default function LoadingIndicator() {
    const { isLoading } = useNavLoading();

    if (!isLoading) return null;

    return (
        <>
            <div className="loading-indicator fixed-top">
                <Spinner />
            </div>
        </>
    );
}
