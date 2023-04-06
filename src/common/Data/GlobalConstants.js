import StringDictionary from "@/src/languages/StringDictionary";

/**
 * All the constant that can be loaded and use in lots of file, that don't need to be fetch.
 */

export const lang = StringDictionary.getInstance([
    "base",
    "organisations",
    "persons",
    "errors",
]);

export const now = new Date();