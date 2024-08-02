import {init, push} from "@socialgouv/matomo-next";

/**
 *  Layer to manage the Matomo API and the Lib @socialgouv/matomo-next
 *  It use the singleton patern and it's available throught the useWebStats hooks.
 */
class Matomo {
    static _instance;
    url;//string
    id;//string
    _cookieChoices;
    currentSearchCount= 0;
    parameters = [];
    baseUrl;
    siteId;

    constructor() {
        this.parameters = [];
        this.url = process.env.NEXT_PUBLIC_MATOMO_URL;
        this.id = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
    }

    static instance() {
        if (Matomo._instance === undefined) {
            Matomo._instance = new Matomo();
        }
        return Matomo._instance;
    }

    init(applicationCookiesParams) {
        this.cookieChoices = applicationCookiesParams;
        init(
            {
                url: this.url,
                siteId: this.id,
                //onRouteChangeComplete: this.onRouteChangeComplete,
                //excludeUrlsPatterns: [/^\/login.php/, /\?token=.+/],
                disableCookies: this.cookieChoices?.stats === true,
            }
        );
    }

    set cookieChoices(cookiesChoices) {
        this._cookieChoices = cookiesChoices;
    }
    get cookieChoices() {
        return this._cookieChoices
    }

    push(stats) {
        push(stats);
    }

    onRouteChangeComplete(path) {
        //needed for the searchCount uri query var ?
        if (path.startWidth("/searchResults")) {
            this.push(['trackSiteSearch', searchIndex, (nearTaxonomy?.nearestTaxonomy?.name ?? undefined), totalSearchRequestResults]);
            //push(["trackSiteSearch", q !== null && q !== void 0 ? q : ""]);
        }
    };

}

export {Matomo};