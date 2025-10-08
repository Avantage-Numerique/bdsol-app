"use client";

import Spinner from "../common/widgets/spinner/Spinner";

import { useLoading } from "./LoadingContext";

export default function LoadingIndicator() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <>
      <div className="loading-indicator fixed-top">
        <Spinner />
      </div>
    </>
  );
}
