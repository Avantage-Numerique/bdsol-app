import {utcToZonedTime, zonedTimeToUtc} from 'date-fns-tz';
import Format from "@/common/DateManager/Format";


const defaultTimeZone = 'America/Montreal';

// Almost, a copy and paste from the docs. https://date-fns.org/v2.30.0/docs/I18n
// All format strings : https://date-fns.org/v2.30.0/docs/format
const dateTimeStringToUTC = (str, timeZone=defaultTimeZone) =>{
    //assume the format here ?'2018-09-01 18:01:36.386',
    return zonedTimeToUtc(str, timeZone);
}

const dateTimeStringUTCToZonedTime = (str, timeZone=defaultTimeZone) =>{
    //assume the format here ?'2018-09-01 18:01:36.386',
    return utcToZonedTime(str, timeZone);
}

const apiDateToDateInput = (str) => {
    const apiDate = dateTimeStringUTCToZonedTime(str);
    return Format(apiDate, 'yyyy-LL-dd');
}

const apiDateToTimeInput = (str) => {
    const apiDate = dateTimeStringUTCToZonedTime(str);
    return Format(apiDate, 'HH:mm');
}


export {dateTimeStringToUTC, dateTimeStringUTCToZonedTime, apiDateToTimeInput, apiDateToDateInput};