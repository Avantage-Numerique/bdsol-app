//filter.slug = type. filters.get(slug);
/**
 * For the consult page mainly, list all the uri slug => in app Type.
 * @type {Map<String, String>}
 */
const filters = new Map();
filters.set("tous", "all");
filters.set("personnes", "Person");
filters.set("organisations", "Organisation");
filters.set("projets", "Project");
filters.set("evenements", "Event");
filters.set("equipements", "Equipment");

/**
 * Reversed Filters, filtersUrl.get(type); In app Type => Uri slug
 * @type {Map<String, String>}
 */
const filtersUrl = new Map([...filters].map(([slug, type]) => [type, slug]));

export {filters, filtersUrl};