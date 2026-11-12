/**
 * Dictionary Registry
 * Centralized static imports for all dictionary files to work with modern Next.js ES modules.
 * This replaces dynamic require() calls that don't work with ES modules.
 */

// French Canadian (fr-ca) dictionaries
import { account as frCaAccount } from "./fr-ca/account.js";
import { base as frCaBase } from "./fr-ca/base.js";
import { consult as frCaConsult } from "./fr-ca/consult.js";
import { contribute as frCaContribute } from "./fr-ca/contribute.js";
import { cookies as frCaCookies } from "./fr-ca/cookies.js";
import { dates as frCaDates } from "./fr-ca/dates.js";
import { equipment as frCaEquipment } from "./fr-ca/equipment.js";
import { errors as frCaErrors } from "./fr-ca/errors.js";
import { events as frCaEvents } from "./fr-ca/events.js";
import { filters as frCaFilters } from "./fr-ca/filters.js";
import { licences as frCaLicences } from "./fr-ca/licences.js";
import { medias as frCaMedias } from "./fr-ca/medias.js";
import { messages as frCaMessages } from "./fr-ca/messages.js";
import { meta as frCaMeta } from "./fr-ca/meta.js";
import { moderation as frCaModeration } from "./fr-ca/moderation.js";
import { organisations as frCaOrganisations } from "./fr-ca/organisations.js";
import { pageMeta as frCaPageMeta } from "./fr-ca/pageMeta.js";
import { pagination as frCaPagination } from "./fr-ca/pagination.js";
import { persons as frCaPersons } from "./fr-ca/persons.js";
import { places as frCaPlaces } from "./fr-ca/places.js";
import { projects as frCaProjects } from "./fr-ca/projects.js";
import { referentiel as frCaReferentiel } from "./fr-ca/referentiel.js";
import { taxonomies as frCaTaxonomies } from "./fr-ca/taxonomies.js";
import { validation as frCaValidation } from "./fr-ca/validation.js";
import { versions as frCaVersions } from "./fr-ca/versions.js";

// English Canadian (en-ca) dictionaries
import { account as enCaAccount } from "./en-ca/account.js";
import { base as enCaBase } from "./en-ca/base.js";
import { consult as enCaConsult } from "./en-ca/consult.js";
import { contribute as enCaContribute } from "./en-ca/contribute.js";
import { dates as enCaDates } from "./en-ca/dates.js";
import { equipment as enCaEquipment } from "./en-ca/equipment.js";
import { errors as enCaErrors } from "./en-ca/errors.js";
import { events as enCaEvents } from "./en-ca/events.js";
import { medias as enCaMedias } from "./en-ca/medias.js";
import { messages as enCaMessages } from "./en-ca/messages.js";
import { meta as enCaMeta } from "./en-ca/meta.js";
import { moderation as enCaModeration } from "./en-ca/moderation.js";
import { organisations as enCaOrganisations } from "./en-ca/organisations.js";
import { pageMeta as enCaPageMeta } from "./en-ca/pageMeta.js";
import { pagination as enCaPagination } from "./en-ca/pagination.js";
import { persons as enCaPersons } from "./en-ca/persons.js";
import { places as enCaPlaces } from "./en-ca/places.js";
import { projects as enCaProjects } from "./en-ca/projects.js";
import { referentiel as enCaReferentiel } from "./en-ca/referentiel.js";
import { versions as enCaVersions } from "./en-ca/versions.js";

/**
 * Dictionary registry organized by language
 * Access pattern: DICTIONARY_REGISTRY[lang][filename]
 */
export const DICTIONARY_REGISTRY = {
    "fr-ca": {
        account: frCaAccount,
        base: frCaBase,
        consult: frCaConsult,
        contribute: frCaContribute,
        cookies: frCaCookies,
        dates: frCaDates,
        equipment: frCaEquipment,
        errors: frCaErrors,
        events: frCaEvents,
        filters: frCaFilters,
        licences: frCaLicences,
        medias: frCaMedias,
        messages: frCaMessages,
        meta: frCaMeta,
        moderation: frCaModeration,
        organisations: frCaOrganisations,
        pageMeta: frCaPageMeta,
        pagination: frCaPagination,
        persons: frCaPersons,
        places: frCaPlaces,
        projects: frCaProjects,
        referentiel: frCaReferentiel,
        taxonomies: frCaTaxonomies,
        validation: frCaValidation,
        versions: frCaVersions,
    },
    "en-ca": {
        account: enCaAccount,
        base: enCaBase,
        consult: enCaConsult,
        contribute: enCaContribute,
        dates: enCaDates,
        equipment: enCaEquipment,
        errors: enCaErrors,
        events: enCaEvents,
        medias: enCaMedias,
        messages: enCaMessages,
        meta: enCaMeta,
        moderation: enCaModeration,
        organisations: enCaOrganisations,
        pageMeta: enCaPageMeta,
        pagination: enCaPagination,
        persons: enCaPersons,
        places: enCaPlaces,
        projects: enCaProjects,
        referentiel: enCaReferentiel,
        versions: enCaVersions,
    },
};

/**
 * Get a specific dictionary by language and filename
 * @param {string} lang - Language code (e.g., 'fr-ca', 'en-ca')
 * @param {string} filename - Dictionary filename without extension
 * @returns {object|null} Dictionary object or null if not found
 */
export function getDictionary(lang, filename) {
    return DICTIONARY_REGISTRY[lang]?.[filename] ?? null;
}

/**
 * Get all available dictionary names for a language
 * @param {string} lang - Language code
 * @returns {string[]} Array of dictionary names
 */
export function getAvailableDictionaries(lang) {
    return Object.keys(DICTIONARY_REGISTRY[lang] ?? {});
}
