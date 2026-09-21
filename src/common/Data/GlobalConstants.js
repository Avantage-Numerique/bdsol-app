import StringDictionary from "@/src/languages/StringDictionary";
import Caching from "@/common/Data/Caching";

/**
 * All the constant that can be loaded and use in lots of file, that don't need to be fetch.
 *
 * @type {{[K:string]: (string | () => string)}}
 */
export const lang = StringDictionary.getInstance([
    "account",
    "base",
    "dates",
    "validation",
    "meta",
    "contribute",
    "consult",
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
    "pageMeta",
    "versions",
    "moderation",
    "licences",
    "filters",
    "pagination",
    "referentiel",
]);

export const now = new Date();

export const modes = {
    CONSULTING: "consulting",
    CONTRIBUTING: "contributing",
};

export const externalApiCache = new Caching();
