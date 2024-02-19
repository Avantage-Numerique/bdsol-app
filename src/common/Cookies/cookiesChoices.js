/**
 * Default and choices for cookies
 * @type {{all: boolean, third: boolean, stats: boolean, auth: boolean}}
 */
export const defaultCookiesChoices = {
    all:false,
    stats:false,
    auth:false,
    third:false//no plan of adding that.
}

export const allCookiesAccepted = {
    all:true,
    stats:true,
    auth:true,
    third:false//no plan of adding that.
}

export const basicOnlyCookiesAccepted = {
    all:false,
    stats:false,
    auth:true,
    third:false//no plan of adding that.
}

export const noCookiesAccepted = {
    all:false,
    stats:false,
    auth:false,
    third:false//no plan of adding that.
}

export default defaultCookiesChoices;