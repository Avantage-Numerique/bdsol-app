import Routes from "@/src/Routing/Routes";


const AppRoutesRaw = {

    accueil : {
        pathname: "/",
    },

    persons : {
        pathname: "/persons",
        asPath: "/persons"
    },
    personSingle : {
        pathname: "/persons/[slug]",
        asPath: "/persons/[slug]",
    },
    personSingleMedia : {
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
        pathname: "/categories",
        asPath: "/categories"
    },
    categorySingle : {
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
        pathname: "/organisations",
        asPath: "/organisations",
    },
    organisationSingle : {
        pathname: "/organisations/[slug]",
        asPath: "/organisations/[slug]"
    },
    organisationSingleMedia : {
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
        pathname: "/a-propos",
        asPath: "/a-propos"
    },

    compte: {
        pathname: "/compte",
        asPath: "/compte",
        needAuth: true
    },

    contribuer: {
        pathname: "/contribuer",
        asPath: "/contribuer",
        needAuth: true
    }
}

const AppRoutes = new Routes(AppRoutesRaw);
export default AppRoutes;