import Person from "@/DataTypes/Person/models/Person";
import Organisation from "@/DataTypes/Organisation/models/Organisation";
import Project from "@/DataTypes/Project/models/Project";
import EntityModel from "@/DataTypes/Entity/models/EntityModel";
import Media from "../Media/models/Media";

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
        this.labelPlural = values.labelPlural;
        this.modelClass = values.modelClass;
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
    labelPlural: "Médias",
    modelClass: Media,
    inSentencePrefix: " un ",
    defaultMainImage: "",
    icon:"file"
}));
TYPES.set(TYPE_ORGANISATION, new Type({
    slug:"organisations",
    label: "Organisation",
    labelPlural: "Organisations",
    modelClass: Organisation,
    inSentencePrefix: " une ",
    defaultMainImage: "/general_images/organisation-default.png",
    icon:"users"
}));
TYPES.set(TYPE_PROJECT, new Type({
    slug:"projets",
    label: "Projet",
    labelPlural: "Projets",
    modelClass: Project,
    inSentencePrefix: " un ",
    defaultMainImage: "/general_images/project-default.png",
    icon:"project-diagram"
}));
TYPES.set(TYPE_PERSON, new Type({
    slug:"persons",
    label: "Personne",
    labelPlural: "Personnes",
    modelClass: Person,
    inSentencePrefix: " une ",
    defaultMainImage: "/general_images/person-default.png",
    icon:"user"
}));
TYPES.set(TYPE_ABSTRACT, new Type({
    slug:"entites",
    label: "Entité",
    labelPlural: "Entités",
    modelClass: EntityModel,
    inSentencePrefix: " une ",
    defaultMainImage: "/general_images/person-default.png",
    icon:"book"
}));
TYPES.set(TYPE_TAXONOMY, new Type({
    slug:"categories",
    label: "Catégorie",
    labelPlural: "Catégories",
    modelClass: EntityModel,
    inSentencePrefix: " une ",
    defaultMainImage: "/general_images/project-default.png",
    icon:"tag"
}));

TYPES.set(TYPE_NOTSET, new Type({
    slug:"undefined",
    label: "undefined",
    labelPlural: "undefined",
    modelClass: "undefined",
    inSentencePrefix: "",
    defaultMainImage: "/general_images/person-default.png",
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

const getModelFromType = (type, data) => {
    const targetType = getType(type);
    if (targetType?.modelClass && targetType?.modelClass !== "undefined") {
        return new targetType.modelClass(data);
    }
    return undefined;
}
export {getModelFromType};