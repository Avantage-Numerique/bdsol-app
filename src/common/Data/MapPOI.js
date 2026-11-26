/**
 * Temp ? object to avoid duplicating coords and zoom while implementing the map components.
 * @type {{[X: string]: {coords: number[], zoom: number}}}
 */
const MapPOI = {
    qc: {
        coords: [47.42, -75],
        zoom: 7.42,
    },

    rouyn: {
        coords: [48.236, -79.015],
        zoom: 14,
    },
};

export default MapPOI;
