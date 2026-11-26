import dynamic from "next/dynamic";

const MapDynamicLoaded = dynamic(() => import("@/src/map/Map"), { ssr: false });

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });

export { MapDynamicLoaded, Marker, Popup, MapContainer, TileLayer };
