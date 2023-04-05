import Routes from "@/src/Routing/Routes";


const AppRoutesRaw = {

    accueil : {
        label: "Accueil",
        pathname: "/",
        asPath: "/",
    },

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

    apropos: {
        label: "À propos",
        pathname: "/a-propos",
        asPath: "/a-propos"
    },

    compte: {
        label: "Votre compte",
        pathname: "/compte",
        asPath: "/compte",
        needAuth: true
    },

    contribuer: {
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
export default AppRoutes;