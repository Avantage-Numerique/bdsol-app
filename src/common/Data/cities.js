/**
 * Temp ? object to avoid duplicating coords and zoom while implementing the map components.
 * @type {{[X: string]: {coords: number[], zoom: number}}}
 */
const cities = {
    qc: {
        coords: [47.255, -75.551],
        zoom: 8,
    },

    rouyn: {
        coords: [48.236, -79.015],
        zoom: 14,
    },
};

export default cities;
