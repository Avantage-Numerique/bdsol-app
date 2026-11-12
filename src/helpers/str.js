/**
 * @param {string} str
 */
export const removeHtml = (str) => {
    if (typeof str === "string") {
        return str.replace(/(<([^>]+)>)/gi, "");
    }
    return str;
};

// tooked from : https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
export const truncate = (str, n, useWordBoundary) => {
    if (str.length <= n) {
        return str;
    }
    const subString = str.slice(0, n - 1); // the original check
    return (useWordBoundary ? subString.slice(0, subString.lastIndexOf(" ")) : subString) + "&hellip;";
};

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

import { htmlToText } from "html-to-text";

/**
 * Function to cleanup HTML string, preserving newlines
 *
 * @param {string} input HTML string to cleanup
 */
function _htmlToText(input) {
    return htmlToText(input, { wordwrap: false }).replace(/\n+/g, "\n\n").trim();
}
export { _htmlToText as htmlToText };

/**
 * Function to cleanup HTML string, preserving newlines
 *
 * @param {string} input HTML string to cleanup
 */
function _htmlToTextSingleParagraph(input) {
    return htmlToText(input, {
        wordwrap: false,
        selectors: [
            { selector: "a", options: { ignoreHref: true } },
            { selector: "ul", options: { itemPrefix: " ‣ " } },
        ],
        decodeEntities: true,
    })
        .replace(/\n+/g, "\n\n")
        .trim();
}
export { _htmlToTextSingleParagraph as htmlToTextSingleParagraph };
