import React from "react";
import { MapDynamicLoaded } from "./DynamicMapParts";

//Wrapper to memoize so it doesn't remount on every input update

const MapWrapper = (props) => {
    if (typeof window === "undefined") {
        return <></>;
    }

    return <MapDynamicLoaded {...props} />;
};

export default React.memo(MapWrapper);
