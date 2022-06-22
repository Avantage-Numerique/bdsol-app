


export default class NamedRoutes {

    // link to Nextjs router logic/structure and methods. https://nextjs.org/docs/routing/introduction

    // be able to use for these type of routes :
    // basic, like /about
    // Dynamic like /personnes/vincent
    //

    // first idea :
    // - Add route as an urlObject
    /**
     * {
          pathname: '/blog/[slug]',
          query: { slug: 'my-post' },
}
     */
    // - Add these within a dictionnaly as
    routes;

    static _instance;

    initRoutes() {
        this.routes = {};
    }

    getInstance() {
        if (NamedRoutes._instance === undefined) {
            NamedRoutes._instance = new NamedRoutes();
        }
        return NamedRoutes._instance;
    }

    /**
     * Cosntruct the routes object as routeName: route:urlObject
     * @param name {string} The slug of the route to be fetch
     * @param route {object} an urlObject for the route to be passed to Link components
     */
    addRoute(name, route)
    {
        if (!this.routeObjectExist())
        {
            this.initRoutes();
        }
        this.routes[name] = route;
    }


    /**
     *
     * @param name {string}
     * @return {*}
     */
    getRoute(name)
    {
        if (this.routeExists(name))
        {
            return this.route[name];
        }
        return name;
    }


    /**
     * @private
     * This is just for drying the conditions and have a pretier if.
     * @param name {string}
     * @return {boolean}
     */
    routeExists(name) {
        return this.ifExist(this.routes) &&
            this.ifExist(this.route[name])
    }

    ifExist(element) {
        return element !== undefined &&
            element !== null;
    }



}