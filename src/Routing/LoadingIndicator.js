"use client";

import AvnuLoading from "../common/widgets/loading/AvnuLoading";
import DefaultSpinner from "../common/widgets/loading/DefaultSpinner";
import Spinner from "../common/widgets/spinner/Spinner";
import { useLoading } from "./LoadingContext";

export default function LoadingIndicator() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <>
      <div className="fixed-top animate-pulse" style={{ height: "100vh" }}>
        <DefaultSpinner />
      </div>
    </>
  );
}
