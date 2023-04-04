
const getEntityBaseRouteName = (entityType) => {
    switch (entityType) {
        case "Person":
        case "person":
            return "persons";

        case "Organisation":
        case "organisation":
            return "organisations";

        case "Media":
        case "media":
            return "medias";

        case "Taxonomy":
        case "Categorie":
        case "taxonomy":
        case "categorie":
            return "categories";
    }
}

const getEntityBaseURI = (entityType) => {
    return "/"+getEntityBaseRouteName(entityType)+"/";
}


const getEntityURI = (entityType, slug) => {
    return getEntityBaseURI(entityType) + slug;
}

export {getEntityBaseRouteName, getEntityBaseURI, getEntityURI};