//filter.slug = type. filters.get(slug);
const filters = new Map();
filters.set("tous", "all");
filters.set("personnes", "Person");
filters.set("organisations", "Organisation");
filters.set("projets", "Project");
filters.set("evenements", "Event");
filters.set("equipements", "Equipment");

//reverse Filters, filtersUrl.get(type);
const filtersUrl = new Map([...filters].map(([slug, type]) => [type, slug]));

export {filters, filtersUrl};