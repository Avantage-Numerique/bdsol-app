import { lang } from "@/common/Data/GlobalConstants";
import Format from "@/common/DateManager/Format";
import { frCA } from "date-fns/locale";

const dateToISO = (date) => {
    return date.toISOString();
};

const isSameDay = (date1, date2) => {
    return date1 > date2;
};

const setDateTime = (time = undefined) => {
    if (typeof time !== "undefined") {
        return new Date(time);
    }
    return null;
};

const getDate = (date, format = lang.dateFormat, locale = frCA) => {
    const dateObject = setDateTime(date);
    return Format(dateObject, format, locale);
};

const formatDate = (dateObject, format = lang.dateFormat, locale = frCA) => {
    if (typeof dateObject === "object") {
        return Format(dateObject, format, { locale: locale });
    }
    return dateObject;
};

/**
 * Get the current time from a new Data and with only the getTime method.
 * @returns {number}
 */
const currentTime = () => {
    const d = new Date();
    return d.getTime();
};

/**
 * Check if a string is a valid date string.
 * @param {string} dateString
 * @returns {boolean}
 */
const isValidDateString = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

export { dateToISO, isSameDay, setDateTime, getDate, formatDate, currentTime, isValidDateString };
