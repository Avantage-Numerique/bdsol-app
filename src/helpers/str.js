export const removeHtml = (str) => {
    if (typeof str === "string") {
        return str.replace(/(<([^>]+)>)/ig, '');
    }
    return str;
}

// tooked from : https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
export const truncate = (str, n, useWordBoundary) => {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n-1); // the original check
    return (useWordBoundary
        ? subString.slice(0, subString.lastIndexOf(" "))
        : subString) + "&hellip;";
};