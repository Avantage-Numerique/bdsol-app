export const TYPE_ABSTRACT = "Entity";
export const TYPE_ORGANISATION = "Organisation";
export const TYPE_TAXONOMY = "Taxonomy"
export const TYPE_PROJECT = "Project";
export const TYPE_PERSON = "Person";
export const TYPE_MEDIA = "Media";
export const TYPE_DEFAULT = TYPE_ABSTRACT;
export const TYPE_NOTSET = "undefined";



class Type {
    constructor(values) {
        this.slug = values.slug;
        this.label = values.label;
        this.defaultMainImage = values.defaultMainImage
    }
}
export {Type};

const TYPES = new Map();
TYPES.set(TYPE_MEDIA, new Type({
    slug:"medias",
    label: "Média",
    defaultMainImage: ""
}));
TYPES.set(TYPE_ORGANISATION, new Type({
    slug:"organisations",
    label: "Organisation",
    defaultMainImage: "/general_images/organisation-default.jpg"
}));
TYPES.set(TYPE_PROJECT, new Type({
    slug:"projets",
    label: "Projet",
    defaultMainImage: "/general_images/project-default.webp"
}));
TYPES.set(TYPE_PERSON, new Type({
    slug:"persons",
    label: "Personne",
    defaultMainImage: "/general_images/person-default.webp"
}));
TYPES.set(TYPE_ABSTRACT, new Type({
    slug:"entites",
    label: "Entité",
    defaultMainImage: "/general_images/person-default.webp"
}));
TYPES.set(TYPE_TAXONOMY, new Type({
    slug:"categories",
    label: "Taxonomies",
    defaultMainImage: "/general_images/project-default.webp"
}));

TYPES.set(TYPE_NOTSET, new Type({
    slug:"undefined",
    label: "undefined",
    defaultMainImage: "/general_images/person-default.webp"
}));

export {TYPES};


/**
 * Get the object Type with slug, label and default image.
 * @param type {string}
 * @param returnDefault {boolean}
 * @returns {undefined|Type}
 */
const getType = (type, returnDefault=false) => {
    if (type && TYPES.has(type)) {
        return TYPES.get(type);
    }
    return returnDefault ? TYPES.get(TYPE_DEFAULT) : undefined;
}
export {getType};