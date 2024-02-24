import StringDictionary from "@/src/languages/StringDictionary";

/**
 * All the constant that can be loaded and use in lots of file, that don't need to be fetch.
 */

export const lang = StringDictionary.getInstance([
    "base",
    "dates",
    "validation",
    "meta",
    "contribute",
    "medias",
    "organisations",
    "persons",
    "projects",
    "taxonomies",
    "events",
    "places",
    "equipment",
    "errors",
    "messages",
    "cookies",
]);

export const now = new Date();