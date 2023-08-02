export const removeHtml = (str) => {
    if (typeof str === "string") {
        return str.replace(/(<([^>]+)>)/ig, '');
    }
    return str;
}