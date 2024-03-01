/**
 * Default and choices for cookies
 * @type {{all: boolean, third: boolean, stats: boolean, auth: boolean}}
 */
export const defaultCookiesChoices = {
    choiceMade:false,
    all:false,
    stats:false,
    auth:false,
    third:false//no plan of adding that.
}

export const allCookiesAccepted = {
    choiceMade:true,
    all:true,
    stats:true,
    auth:true,
    third:false//no plan of adding that.
}

export const basicOnlyCookiesAccepted = {
    choiceMade:true,
    all:false,
    stats:false,
    auth:true,
    third:false//no plan of adding that.
}

export const noCookiesAccepted = {
    choiceMade:true,
    all:false,
    stats:false,
    auth:false,
    third:false//no plan of adding that.
}

export const changeCookieChoices = (choices) => {
    choices.choiceMade = false;
    return choices;
}

export default defaultCookiesChoices;