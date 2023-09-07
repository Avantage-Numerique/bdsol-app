import {format} from 'date-fns';
import {frCA} from 'date-fns/locale';

const locales = {frCA}

// Almost, a copy and paste from the docs. https://date-fns.org/v2.30.0/docs/I18n
export default function (date, formatStr = 'PP') {

    //const locale = window && typeof window.__localeId__ !== "undefined" ? locales[window.__localeId__] : locales["frCA"];
    const locale = locales["frCA"];

    return format(date, formatStr, {
        locale: locale
    })
}