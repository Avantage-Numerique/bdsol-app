import {clientSideExternalApiRequest, externalApiRequest, ORIGIN_BROWSER, ORIGIN_SERVER} from "@/src/hooks/http-hook";
import {paginationConfig} from "@/src/configs/PaginationConfigs";


/**
 * POST to api from client side for search type in /consult URI.
 * @param from {String} browser or server
 * @param type {String}
 * @param additionnalQueryParams {Object}
 * @returns {Promise<*[]>}
 */
const searchByType = async (from, type, additionnalQueryParams = {}) => {

    let apiUrl = "/search/type";
    const defaultSearchQuery = {
        skip:0,
        limit:paginationConfig.pageSize
    };
    const searchQuery = {
        ...defaultSearchQuery,
        ...additionnalQueryParams
    }
    const searchParams = {
        method: 'POST'
    }
    // Differents cases, change the default object.
    if(type === "all") {
        apiUrl = "/search/all";
        //keed searchQuery as default.
        searchParams.body = JSON.stringify({data: searchQuery});
    } else {
        searchQuery.type = type;
        searchParams.body = JSON.stringify({data: searchQuery});
    }

    if (from === ORIGIN_BROWSER) {
        return await ccSearchByType(apiUrl, searchParams);
    }
    if (from === ORIGIN_SERVER) {
        return await ssrSearchByType(apiUrl, searchParams);
    }
    return [];
}


/**
 * POST to api from client side for search type in /consult URI.
 * @param apiUrl {String} the target URI to the api.
 * @param params {Object} params and searchQuery
 * @returns {Promise<*[]>}
 */
const ccSearchByType = async (apiUrl, params) => {
    let results = [];
    try {
        results = await clientSideExternalApiRequest(apiUrl, params);
    } catch (error) {
        console.error(error);
    }
    return results;
}

/**
 * POST to api from server side for search type in /consult URI.
 * @param apiUrl {String} the target URI to the api.
 * @param params {Object} params and searchQuery
 * @returns {Promise<*[]>}
 */
const ssrSearchByType = async (apiUrl, params) => {
    let results = [];
    try {
        results = await externalApiRequest(apiUrl, params);
    } catch (error) {
        console.error(error);
    }

    return results;
}

const useSearch = () => {
    return {searchByType, ccSearchByType, ssrSearchByType};
}

export {useSearch, searchByType, ssrSearchByType, ccSearchByType};