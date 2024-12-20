import Routes from "@/src/Routing/Routes";
import {lang} from "@/common/Data/GlobalConstants";

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
        pathname: "/personnes",
        asPath: "/personnes"
    },
    personSingle : {
        label: "Page d'une personne",
        pathname: "/personnes/[slug]",
        asPath: "/personnes/[slug]",
    },
    personSingleMedia : {
        label: "Person",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/personnes/[person.slug]/[slug]",
        breadcrumbAsPath: "/personnes/[person.slug]/[slug]",
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
        pathname: "/evenements",
        asPath: "/evenements",
    },
    eventSingle : {
        label: "Un événement",
        pathname: "/evenements/[slug]",
        asPath: "/evenements/[slug]"
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
        breadcrumbPathName: "/evenements/[event.slug]/[slug]",
        breadcrumbAsPath: "/evenements/[event.slug]/[slug]",
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
        pathname: "/lieux",
        asPath: "/lieux",
    },
    placeSingle : {
        label: "Un lieu",
        pathname: "/lieux/[slug]",
        asPath: "/lieux/[slug]"
    },
    placeSingleEdit : {
        label: "Modifier un événement",
        pathname: "/contribuer/lieux/[slug]",
        asPath: "/contribuer/lieux/[slug]"
    },
    placeCreate : {
        label: "Ajouter un lieux",
        pathname: "/contribuer/lieux",
        asPath: "/contribuer/lieux"
    },
    placeSingleMedia : {
        label: "Média d'un lieu",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/lieux/[place.slug]/[slug]",
        breadcrumbAsPath: "/lieux/[place.slug]/[slug]",
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
        pathname: "/equipement",
        asPath: "/equipement",
    },
    equipmentSingle : {
        label: "Un équipement",
        pathname: "/equipement/[slug]",
        asPath: "/equipement/[slug]"
    },
    equipmentSingleEdit : {
        label: "Modifier un événement",
        pathname: "/contribuer/equipements/[slug]",
        asPath: "/contribuer/equipements/[slug]"
    },
    equipmentCreate : {
        label: "Ajouter un équipement",
        pathname: "/contribuer/equipements",
        asPath: "/contribuer/equipements"
    },
    equipmentSingleMedia : {
        label: "Média d'un équipment",
        pathname: "/medias/[slug]",
        asPath: "/medias/[slug]",
        breadcrumbPathName: "/equipement/[equipment.slug]/[slug]",
        breadcrumbAsPath: "/equipement/[equipment.slug]/[slug]",
        breadcrumbQuery: {
            slug: "slug",
            mediaType: "main-image"
        }
    },


    about: {
        label: "À propos",
        pathname: "/a-propos",
        asPath: "/a-propos",
        teamAsPath:"/a-propos#equipe"
    },

    /*********
     *  Account relative routes
     */
    account: {
        label: "Votre compte",
        pathname: "/compte",
        asPath: "/compte",
        needAuth: true
    },

    register: {
        label: lang.menuLabelCreateAccount,
        pathname: "/compte/inscription",
        asPath: "/compte/inscription",
        needAuth: false
    },

    resetPassword: {
        label: "Réinitialiser",
        pathname: "/compte/reinitialiser",
        asPath: "/compte/reinitialiser",
        needAuth: false
    },

    connection: {
        label: lang.menuLabelConnect,
        pathname: "/compte/connexion",
        asPath: "/compte/connexion",
        needAuth: false
    },

    toConfirm: {
        label: "À confirmer",
        pathname: "/compte/a-confirmer",
        asPath: "/compte/a-confirmer",
        needAuth: true
    },

    confirmed: {
        label: "À confirmer",
        pathname: "/compte/confirme",
        asPath: "/compte/confirme",
        needAuth: true
    },

    consult: {
        label: "Consulter",
        pathname: "/consulter",
        asPath: "/consulter",
        needAuth: false
    },

    contribute: {
        label: "Contribuer",
        pathname: "/contribuer",
        asPath: "/contribuer",
        needAuth: true
    },
 
    error404: {
        label: "Erreur 404",
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
        label: lang.LicencesRouteLabel,
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
        pathname: "/termes-et-conditions-dutilisation",
        asPath: "/termes-et-conditions-dutilisation",
        needAuth: false,
    },

    confidentialityPolicy: {
        label: "Politique de confidentialité",
        pathname: "/politique-de-confidentialite",
        asPath: "/politique-de-confidentialite",
        needAuth: false,
    },

    valuesChart: {
        label: "Charte de valeurs",
        pathname: "/charte-de-valeurs",
        asPath: "/charte-de-valeurs",
        needAuth: false,
    },

    paramsCookies: {
        label: "Paramètres des cookies",
        pathname: "/parametres/cookies",
        asPath: "/parametres/cookies",
        needAuth: false,
    },

    versions: {
        label: "Versions",
        pathname: "/versions",
        asPath: "/versions",
        needAuth: false,
    }
}

const AppRoutes = new Routes(AppRoutesRaw);

/**
 * @property accueil {Route}
 * @property about {Route}
 * @property persons {Route}
 * @property personSingle {Route}
 * @property personSingleMedia {Route}
 * @property categories {Route}
 * @property categorySingle {Route}
 * @property organisations {Route}
 * @property organisationsCreate {Route}
 * @property organisationSingle {Route}
 * @property organisationSingleMedia {Route}
 * @property projects {Route}
 * @property projectSingle {Route}
 * @property projectSingleMedia {Route}
 * @property projectSingleEdit {Route}
 * @property projectCreate {Route}
 * @property events {Route}
 * @property apropos {Route}
 * @property account {Route}
 * @property connection {Route}
 * @property register {Route}
 * @property toConfirm {Route}
 * @property confirmed {Route}
 * @property contribuer {Route}
 * @property error404 {Route}
 * @property paramsCookies {Route}
 * @property contribute {Route}
 * @property consult {Route}
 * @property contact {Route}
 * @property faq {Route}
 * @property equipment {Route}
 * @property licences {Route}
 * @type {Routes}
 */
export default AppRoutes;