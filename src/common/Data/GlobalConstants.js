import StringDictionary from "@/src/languages/StringDictionary";

/**
 * All the constant that can be loaded and use in lots of file, that don't need to be fetch.
 */

export const lang = StringDictionary.getInstance([
    "base",
    "validation",
    "status",
    "contribute",
    "medias",
    "organisations",
    "persons",
    "projects",
    "taxonomies",
    "events",
    "errors",
    "messages",
]);

export const now = new Date();