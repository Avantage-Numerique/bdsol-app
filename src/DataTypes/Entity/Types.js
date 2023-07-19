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
        this.icon = values.icon;
        this.inSentencePrefix = values.inSentencePrefix;
        this.defaultMainImage = values.defaultMainImage
    }
}
export {Type};

const TYPES = new Map();
TYPES.set(TYPE_MEDIA, new Type({
    slug:"medias",
    label: "Média",
    defaultMainImage: "",
    icon:"file"
}));
TYPES.set(TYPE_ORGANISATION, new Type({
    slug:"organisations",
    label: "Organisation",
    inSentencePrefix: " une ",
    defaultMainImage: "/general_images/organisation-default.jpg",
    icon:"users"
}));
TYPES.set(TYPE_PROJECT, new Type({
    slug:"projets",
    label: "Projet",
    inSentencePrefix: " un ",
    defaultMainImage: "/general_images/project-default.webp",
    icon:"project-diagram"
}));
TYPES.set(TYPE_PERSON, new Type({
    slug:"persons",
    label: "Personne",
    inSentencePrefix: " une ",
    defaultMainImage: "/general_images/person-default.webp",
    icon:"user"
}));
TYPES.set(TYPE_ABSTRACT, new Type({
    slug:"entites",
    label: "Entité",
    inSentencePrefix: " une ",
    defaultMainImage: "/general_images/person-default.webp",
    icon:"book"
}));
TYPES.set(TYPE_TAXONOMY, new Type({
    slug:"categories",
    label: "Catégorie",
    inSentencePrefix: " une ",
    defaultMainImage: "/general_images/project-default.webp",
    icon:"tag"
}));

TYPES.set(TYPE_NOTSET, new Type({
    slug:"undefined",
    label: "undefined",
    inSentencePrefix: "",
    defaultMainImage: "/general_images/person-default.webp",
    icon:"hourglass-end"
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