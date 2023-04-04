/**
 * Manage the routes accross the app for links, and logics
 * Singleton
 * @constructor
 */
class Routes {

    static _instance;

    constructor(routes=undefined) {
        if (!Routes._instance) {
            Routes._instance = this;
        }
        this.urls = new Map();
        this.locales = ["fr"]//, "en"

        if (routes) {
            this.setup(routes);
        }
        return Routes._instance;
    }

    /**
     *
     * @param rawRoutes
     */
    setup(rawRoutes) {
        for (const route in rawRoutes) {
            this.addUrl(route, rawRoutes[route]);
        }
        this.setAliases(this.urls);
    }

    /**
     * Add an URL to the structure to be used later
     * @param name {string} the name used as the property name (Must be unique indeed)
     * @param urlObject {Route}
     */
    addUrl(name, urlObject) {
        urlObject.name = name;
        this.urls.set(name, new Route(urlObject));
    }


    /**
     * Get an URL to use in Link components and other routing purpose.
     * @param name {string} the target route to get.
     */
    getUrl(name) {
        this.urls.get(name);
    }


    setAliases(routes) {
        for (let [key, route] of routes) {
            this.setProperty(key, route);
        }
    }


    /**
     * Set all the properties into this scope
     * @param property
     * @param routeName
     * @param route
     * @return {*}
     */
    setProperty(property, route) {
        Object.defineProperty(this, property, {
            value: route,
            enumerable: true,
            configurable: true,
        });
    }
}


/**
 *  It's the object used in Routes to be pushed into Link and Breadcrumbs.
 *  @toread https://nodejs.org/api/url.html#legacy-urlobject
 */
class Route {

    /**
     * ROute is an object that manage each page in its routing + breadcrumbs support.
     * @param params.name {string}
     * @param params.pathname {string} the URL structure, it will be used in link
     * @param params.asPath {string} the URL structure as shown in the browser, it will be used in link
     * @param params.query {object} the key pair object to target dynamic elements in the URL.
     * @param params.breadcrumbPathName {string} Optionnal, if not set, it will take the params.pathname as is.
     * @param params.breadcrumbAsPath {string} Optionnal, if not set, it will take the params.pathname as is.
     * @param params.breadcrumbQuery {object} Optionnal, if not set, it will take the params.query as is.
     * @param params.needAuth {boolean} Optionnal, if it's a private Route that need an auth token to access.
     */
    constructor(params) {
        this.name = params.name ?? "";
        this.pathname = params.pathname ?? "";
        this.asPath = params.asPath ?? "";
        this.query = params.query ?? {};
        this.needAuth = params.needAuth ?? false;//over-engenering here I think.

        this.breadcrumbPathName = params.breadCrumbPathName ?? params.pathname;
        this.breadcrumbAsPath = params.breadcrumbAsPath ?? params.asPath;
        this.breadcrumbQuery = params.breadcrumbQuery ?? params.query;
    }
}


export default Routes;