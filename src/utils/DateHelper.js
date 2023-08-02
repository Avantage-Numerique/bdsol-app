
export const getDateFromIsoString = (isoString) => {
    if (typeof isoString === "string") {
        //const date = new Date(isoString);//in the format iso ; '2018-04-20T12:00:00Z'
        return isoString.split('T')[0];
    }
    return isoString;
}