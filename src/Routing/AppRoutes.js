import Routes from "@/src/Routing/Routes";

/*

    IDÉE : Implémenter les app route en format hiérarchique afin que chaque path hérite du parent jusqu'au basepath. 
    Permet de tout changer en une seule modification

*/
const AppRoutesRaw = {

    app : {
        label: "avnu.ca",
        pathname: "/",
        asPath: "/",
    },

    accueil : {
        label: "Accueil",
        pathname: "/",
        asPath: "/",
    },

    /*************
     *  Person
     */
    persons : {
        label: "Toutes les personnes",
        pathname: "/persons",
        asPath: "/persons"
    },
    personSingle : {
        label: "Page d'une personne",
        pathname: "/persons/[slug]",
        asPath: "/persons/[slug]",
    },
    personSingleMedia : {
        label: "Person",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/persons/[person.slug]/[slug]",
        breadcrumbAsPath: "/persons/[person.slug]/[slug]",
        breadcrumbQuery: {
            slug: "slug",
            mediaType: "main-image"
        }
    },
    personSingleEdit : {
        label: "Modifier une personne",
        pathname: "/contribuer/personnes/[slug]",
        asPath: "/contribuer/personnes/[slug]",
    },
    personCreate : {
        label: "Ajouter une personne",
        pathname: "/contribuer/personnes",
        asPath: "/contribuer/personnes",
    },

    /**************
     * 
     *  Categorie
     * 
     */
    categories : {
        label: "Toutes les catégories",
        pathname: "/categories",
        asPath: "/categories"
    },
    categorySingle : {
        label: "Une catégorie",
        pathname: "/categories/[category]/[slug]",
        asPath: "/categories/[category]/[slug]",
        breadcrumbPathName: "/categories/[category]",
        breadcrumbAsPath: "/categories/[category]",
        query: {
            category: "",
            slug: "",
        }
    },

    /******************
     *  Organisation
     ***/
    organisations : {
        label: "Toutes les organisations",
        pathname: "/organisations",
        asPath: "/organisations",
    },
    organisationSingle : {
        label: "Une organisation",
        pathname: "/organisations/[slug]",
        asPath: "/organisations/[slug]"
    },
    organisationSingleMedia : {
        label: "Média d'une organisation",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/organisations/[organisation.slug]/[slug]",
        breadcrumbAsPath: "/organisations/[organisation.slug]/[slug]",
        breadcrumbQuery: {
            slug: "slug",
            mediaType: "main-image"
        }
    },
    organisationsCreate : {
        label: "Ajouter une organisation",
        pathname: "/contribuer/organisations",
        asPath: "/contribuer/organisations",
    },
    organisationsSingleEdit : {
        label: "Modifier une organisation",
        pathname: "/contribuer/organisations/[slug]",
        asPath: "/contribuer/organisations/[slug]",
    },

    /*************
     *  Project
     ***/
    projects : {
        label: "Tous les projets",
        pathname: "/projets",
        asPath: "/projets",
    },
    projectSingle : {
        label: "Un projet",
        pathname: "/projets/[slug]",
        asPath: "/projets/[slug]"
    },
    projectSingleEdit : {
        label: "Modifier un projet",
        pathname: "/contribuer/projets/[slug]",
        asPath: "/contribuer/projets/[slug]"
    },
    projectCreate : {
        label: "Ajouter un projet",
        pathname: "/contribuer/projets",
        asPath: "/contribuer/projets"
    },
    projectSingleMedia : {
        label: "Média d'un projet",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/projets/[project.slug]/[slug]",
        breadcrumbAsPath: "/projets/[project.slug]/[slug]",
        breadcrumbQuery: {
            slug: "slug",
            mediaType: "main-image"
        }
    },

    /*************
     *  Event
     ***/
    events : {
        label: "Tous les événement",
        pathname: "/events",
        asPath: "/events",
    },
    eventSingle : {
        label: "Un événement",
        pathname: "/events/[slug]",
        asPath: "/events/[slug]"
    },
    eventSingleEdit : {
        label: "Modifier un événement",
        pathname: "/contribuer/evenements/[slug]",
        asPath: "/contribuer/evenements/[slug]"
    },
    eventCreate : {
        label: "Ajouter un événement",
        pathname: "/contribuer/evenements",
        asPath: "/contribuer/evenements"
    },
    eventSingleMedia : {
        label: "Média d'un événement",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/events/[event.slug]/[slug]",
        breadcrumbAsPath: "/events/[event.slug]/[slug]",
        breadcrumbQuery: {
            slug: "slug",
            mediaType: "main-image"
        }
    },

    /*************
     *  Place
     ***/
    places : {
        label: "Tous les lieux",
        pathname: "/places",
        asPath: "/places",
    },
    placeSingle : {
        label: "Un lieu",
        pathname: "/places/[slug]",
        asPath: "/places/[slug]"
    },
    placeSingleEdit : {
        label: "Modifier un événement",
        pathname: "/contribuer/lieux/[slug]",
        asPath: "/contribuer/lieux/[slug]"
    },
    placeCreate : {
        label: "Ajouter un événement",
        pathname: "/contribuer/lieux",
        asPath: "/contribuer/lieux"
    },
    placeSingleMedia : {
        label: "Média d'un lieu",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/places/[place.slug]/[slug]",
        breadcrumbAsPath: "/places/[place.slug]/[slug]",
        breadcrumbQuery: {
            slug: "slug",
            mediaType: "main-image"
        }
    },
    /*************
     *  Equipment
     ***/
    equipment : {
        label: "Tous les équipements",
        pathname: "/equipment",
        asPath: "/equipment",
    },
    equipmentSingle : {
        label: "Un équipement",
        pathname: "/equipment/[slug]",
        asPath: "/equipment/[slug]"
    },
    equipmentSingleEdit : {
        label: "Modifier un événement",
        pathname: "/contribuer/equipements/[slug]",
        asPath: "/contribuer/equipements/[slug]"
    },
    equipmentCreate : {
        label: "Ajouter un événement",
        pathname: "/contribuer/equipements",
        asPath: "/contribuer/equipements"
    },
    equipmentSingleMedia : {
        label: "Média d'un équipment",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/equipment/[equipment.slug]/[slug]",
        breadcrumbAsPath: "/equipment/[equipment.slug]/[slug]",
        breadcrumbQuery: {
            slug: "slug",
            mediaType: "main-image"
        }
    },


    about: {
        label: "À propos",
        pathname: "/a-propos",
        asPath: "/a-propos"
    },

    account: {
        label: "Votre compte",
        pathname: "/compte",
        asPath: "/compte",
        needAuth: true
    },

    contribute: {
        label: "Contribuer",
        pathname: "/contribuer",
        asPath: "/contribuer",
        needAuth: true
    },
 
    error404: {
        label: "Error 404",
        pathname: "/404",
        asPath: "/404"
    },

    faq: {
        label: "FAQ",
        pathname: "/faq",
        asPath: "/faq",
        needAuth: false,
    },

    licences: {
        label: "Licences",
        pathname: "/faq/licences",
        asPath: "/faq/licences",
        needAuth: false,
    },

    contact: {
        label: "Contactez-nous",
        pathname: "/nous-joindre",
        asPath: "/nous-joindre",
        needAuth: false,
    },

    termOfUse: {
        label: "Conditions d'utilisation",
        pathname: "/termes-et-conditions-d'utilisation",
        asPath: "/termes-et-conditions-d'utilisation",
        needAuth: false,
    },

    confidentialityPolicy: {
        label: "Politique de confidentialité",
        pathname: "/politique-d'utilisation-des-donnees",
        asPath: "/politique-d'utilisation-des-donnees",
        needAuth: false,
    },

    valuesChart: {
        label: "Charte de valeurs",
        pathname: "/charte-de-valeurs",
        asPath: "/charte-de-valeurs",
        needAuth: false,
    }


}

const AppRoutes = new Routes(AppRoutesRaw);

/**
 * @property accueil {Route}
 * @property persons {Route}
 * @property personSingle {Route}
 * @property personSingleMedia {Route}
 * @property categories {Route}
 * @property categorySingle {Route}
 * @property organisations {Route}
 * @property organisationSingle {Route}
 * @property organisationSingleMedia {Route}
 * @property projects {Route}
 * @property projectSingle {Route}
 * @property projectSingleMedia {Route}
 * @property projectSingleEdit {Route}
 * @property projectCreate {Route}
 * @property events {Route}
 * @property apropos {Route}
 * @property compte {Route}
 * @property contribuer {Route}
 * @property error404 {Route}
 * @type {Routes}
 */
export default AppRoutes;