import dynamic from "next/dynamic";
import React from "react";

//Wrapper to memoize so it doesn't remount on every input update

const MapDynamicLoaded = dynamic(() => import('@/src/map/Map'), { ssr: false });

const MapWrapper = (props) => {
  return (
    <MapDynamicLoaded
      latLng={props?.latLng}
      setLatLng={props?.setLatLng}
      locationList={props?.locationList}
      coordinatePopUp={props?.coordinatePopUp}
      height={props?.height}
      width={props?.width}
      centerAt={props?.centerAt}
    />
  );
};

export default React.memo(MapWrapper);