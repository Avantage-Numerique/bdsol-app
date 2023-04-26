export const TYPE_ABSTRACT = "Entity";
export const TYPE_ORGANISATION = "Organisation";
export const TYPE_PROJECT = "Project";
export const TYPE_PERSON = "Person";
export const TYPE_MEDIA = "Media";

export const TYPE_DEFAULT = TYPE_ABSTRACT;


class Type {
    constructor(values) {
        this.slug = values.slug;
        this.label = values.label;
    }
}
export {Type};

const TYPES = new Map();
TYPES.set(TYPE_MEDIA, new Type({slug:"medias", label: "Média"}));
TYPES.set(TYPE_ORGANISATION, new Type({slug:"organisations", label: "Organisation"}));
TYPES.set(TYPE_PROJECT, new Type({slug:"projets", label: "Projet"}));
TYPES.set(TYPE_PERSON, new Type({slug:"persons", label: "Personne"}));
TYPES.set(TYPE_ABSTRACT, new Type({slug:"entites", label: "Entité"}));


export {TYPES};

