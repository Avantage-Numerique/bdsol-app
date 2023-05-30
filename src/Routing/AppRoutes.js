import Routes from "@/src/Routing/Routes";

/*

    IDÉE : Implémenter les app route en format hiérarchique afin que chaque path hérite du parent jusqu'au basepath. 
    Permet de tout changer en une seule modification

*/
const AppRoutesRaw = {

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
        label: "Média d'une personne",
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
    projectSingleCreate : {
        label: "Ajouter un projet",
        pathname: "/contribuer/projets",
        asPath: "/contribuer/projets"
    },
    projectSingleMedia : {
        label: "Média d'un projet",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/projets/[projet.slug]/[slug]",
        breadcrumbAsPath: "/projets/[projet.slug]/[slug]",
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
 * @property apropos {Route}
 * @property compte {Route}
 * @property contribuer {Route}
 * @property error404 {Route}
 * @type {Routes}
 */
export default AppRoutes;