import {useState} from 'react';
//import moment from "moment";
//import 'moment/locale/fr';
import Format from "@/common/DateManager/Format";
import {frCA} from 'date-fns/locale'

import {DateTag} from "@/common/DateManager/DateTag";
import {lang} from "@/common/Data/GlobalConstants";

/**********
 *
 *      +++++++++ FORMATS OPTIONS +++++++++++
 *      moment().format('LT');   // 15:26
 *      moment().format('LTS');  // 15:26:40
 *      moment().format('L');    // 2023-08-08
 *      moment().format('l');    // 2023-8-8
 *      moment().format('LL');   // 8 août 2023
 *      moment().format('ll');   // 8 août 2023
 *      moment().format('LLL');  // 8 août 2023 15:26
 *      moment().format('lll');  // 8 août 2023 15:26
 *      moment().format('LLLL'); // mardi 8 août 2023 15:26
 *      moment().format('llll'); // mar. 8 août 2023 15:27
 *
 * */


export const useDateManager = (time1, time2 = null) => {

    const setDateTime = (time=undefined) => {
        if (typeof time !== "undefined") {
            return new Date(time);
        }
        return null;
    }

    const [time, setTime] = useState({
        timeStamp: time1,
        endingTimeStamp: time2,
        initStartTime: time1,
        initEndTime: time2,
        startTime: setDateTime(time1),
        endTime: setDateTime(time2),
        language: frCA,
        dateFormat: 'yyyy-LL-dd',
        timeFormat: 'H \h mm',
        dayFormat: 'dd',
        monthFormat: 'MMM',
        humanDateFormat: 'EEEE d MMM',
        humanTimeFormat: '',
        fullHumanDateFormat: 'E d MMM yyyy',
        fullHumanTimeFormat: ''
    });



    /******
     *
     *    UTIL FUNCTIONS
     *
     */

    //GENERAL FUNCTIONS
    //@todo refactor var and methods names, with Date and Time (hour is too confusing since we may need to support hours, minutes, etc.)
    //const getDateMoment = (date, format) => moment(date).locale(time.language).format(format || time.dateFormat);
   // const getHourMoment = (hour, format) => moment(hour).locale(time.language).format(format || time.hourFormat);

    const getDate = (date, format=time.dateFormat, locale=time.language) => {
        console.log("getDate", date, format, locale);
        const dateObject = setDateTime(date);
        return Format(dateObject, format, {locale:locale});
    }

    const formatDate = (dateObject, format = time.dateFormat, locale=time.language) => {
        if (typeof dateObject === 'object') {
            return Format(dateObject, format, {locale:locale});
        }
        return dateObject;
    }

    //GETTERS FOR SPECIFICS
    //const getStartingDate = (format = null) => getDateMoment(time.timeStamp, format);

    //const getEndingDate = time.endingTimeStamp ? (format = null) => getDateMoment(time.endingTimeStamp, format) : null ;

    //const getStartingHour =  (format = null) => getHourMoment(time.timeStamp, format);

    //const getHour = getStartingHour;//why ??

    //const getEndingHour = time.endingTimeStamp ? (format = null) => getHourMoment(time.endingTimeStamp, format) : null;

    //SETTERS
    //const setDateFormat = format => setTime({...time, dateFormat: format});
    //const setHourFormat = format => setTime({...time, hourFormat: format});

    /********
     *
     *   Components that shape the display of time
     *
     */
    //Simple tag that display a time element
    /*const TimeTag = ({format, endingDate = false}) => {

        //Define the variables to fill with proper dates and format
        // I don't understand the check to the bool ending date ??
        const content = endingDate ? getEndingDate(format) : getStartingDate(format);
        const dateTime = endingDate ? getEndingDate() : getStartingDate();

        console.log("TimeTag", format, endingDate, content, dateTime);
        console.log("TimeTag", getEndingDate(), getStartingDate());
        return (
            <DateTag value={dateTime} label={content} />
        );
    }*/

    const TimeTag = ({date, format}) => {

        format = format ?? time.humanDateFormat;

        //Define the variables to fill with proper dates and format
        // I don't understand the check to the bool ending date ??

        //to change the format, use the state.

        //const content = date ? getEndingDate(time.dateFormat) : getStartingDate(time.dateFormat);
        //const dateTime = date ? getEndingDate() : getStartingDate();
        const formatedDate = formatDate(setDateTime(date), format);
        console.log("TimeTag", formatedDate, date);
        return (
            <DateTag value={date} label={formatedDate} />
        );
    }


    //Simple tag that contains the time and hour

    const TimeIntervalSentence = ({tag, className="", format=undefined}) => {
        //Define the tag surrounding
        const Tag = tag ?? 'p';

        if (typeof format === "undefined") {
            format = time.fullHumanDateFormat;
        }

        const isSameYear = formatDate(time.startTime, 'yyyy') === formatDate(time.endTime, 'yyyy');
        const isSameMonth = formatDate(time.startTime, 'LL') === formatDate(time.endTime, 'LL');
        const isSameDay = formatDate(time.startTime, 'LL-dd') === formatDate(time.endTime, 'LL-dd');

        return (
            <Tag className={className}>
                {/* is one day */}
                {isSameDay && isSameMonth && isSameYear &&
                    <>
                        {lang.capitalize("the")} <TimeTag date={time.startTime} format={time.humanDateFormat} /> {formatDate(time.startTime, 'yyyy')}
                    </>
                }
                {/* Same year only */}
                {!isSameDay && !isSameMonth && isSameYear &&
                    <>
                        {lang.capitalize("from")} <TimeTag date={time.startTime} format={time.humanDateFormat} /> {lang.to} <TimeTag date={time.endTime} format={time.humanDateFormat} /> {formatDate(time.startTime, 'yyyy')}
                    </>
                }
                {/* Within one month */}
                {!isSameDay && isSameMonth && isSameYear &&
                    <>
                        {lang.capitalize("from")} <TimeTag date={time.startTime} format={'d'} /> {lang.to} <TimeTag date={time.endTime} format={'d'} /> {formatDate(time.startTime, time.monthFormat)} {formatDate(time.startTime, 'yyyy')}
                    </>
                }
                {/* Multi years */}
                {!isSameDay && !isSameMonth && !isSameYear &&
                    <>
                        {lang.capitalize("from")} <TimeTag date={time.startTime} format={time.fullHumanDateFormat} /> {lang.to} <TimeTag date={time.endTime} format={time.fullHumanDateFormat} />
                    </>
                }
            </Tag>
        )

        return (
            <Tag className={className}>
                Du
                <TimeTag />
                au
                <TimeTag endingDate />
                ({time.startTime} {time.endTime}
            </Tag>
        )
    }


    return {
        getters: {
            //getStartingDate,
            getDate,
            //getEndingDate,
            //getStartingHour,
            //getHour,
            //getEndingHour
        },
        setters: {
            //setDateFormat,
            //setHourFormat
        },
        TimeTag,
        TimeIntervalSentence: TimeIntervalSentence
    }
}
