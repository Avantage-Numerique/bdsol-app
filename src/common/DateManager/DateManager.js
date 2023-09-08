import {useState} from 'react';

import Format from "@/common/DateManager/Format";
import {frCA} from 'date-fns/locale'

import {DateTag} from "@/common/DateManager/DateTag";
import {lang} from "@/common/Data/GlobalConstants";


export const dateManager = (time1, time2 = null) => {

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
        timeFormat: "H 'h' mm",
        dayFormat: 'dd',
        monthFormat: 'MMM',
        humanDateFormat: 'EEEE d MMM',
        humanDateMonthFormat: 'd MMM',
        humanTimeFormat: '',
        fullHumanDateFormat: 'E d MMM yyyy',
        fullHumanTimeFormat: ''
    });


    const getDate = (date, format=time.dateFormat, locale=time.language) => {
        const dateObject = setDateTime(date);
        return Format(dateObject, format, {locale:locale});
    }

    const formatDate = (dateObject, format = time.dateFormat, locale=time.language) => {
        if (typeof dateObject === 'object') {
            return Format(dateObject, format, {locale:locale});
        }
        return dateObject;
    }

    const TimeTag = ({date, format}) => {

        format = format ?? time.humanDateFormat;

        const formatedDate = formatDate(setDateTime(date), format);

        return (
            <DateTag value={date} label={formatedDate} />
        );
    }


    //Simple tag that contains the time and hour

    const TimeIntervalSentence = ({tag, className="", showDay=true}) => {
        //Define the tag surrounding
        const Tag = tag ?? 'p';

        const isSameYear = formatDate(time.startTime, 'yyyy') === formatDate(time.endTime, 'yyyy');
        const isSameMonth = formatDate(time.startTime, 'LL') === formatDate(time.endTime, 'LL');
        const isSameDay = formatDate(time.startTime, 'LL-dd') === formatDate(time.endTime, 'LL-dd');

        return (
            <Tag className={className}>
                {/* DATE */}
                {/* is one day */}
                {isSameDay && isSameMonth && isSameYear &&
                    <>
                        {showDay &&
                            <>
                                {lang.capitalize("the")} <TimeTag date={time.startTime} format={time.humanDateFormat} /> {formatDate(time.startTime, 'yyyy')}
                                <br/>
                            </>
                        }
                        <TimeTag date={time.startTime} format={time.timeFormat} /> {lang.hourTo} <TimeTag date={time.endTime} format={time.timeFormat} />
                    </>
                }
                {/* Same year only */}
                {!isSameDay && !isSameMonth && isSameYear &&
                    <>
                        {lang.capitalize("from")} <TimeTag date={time.startTime} format={time.humanDateFormat} /> <TimeTag date={time.startTime} format={time.timeFormat} />
                        &nbsp;{lang.to}&nbsp;
                        <TimeTag date={time.endTime} format={time.humanDateFormat} /> <TimeTag date={time.endTime} format={time.timeFormat} /> {formatDate(time.startTime, 'yyyy')}
                    </>
                }
                {/* Within one month on the same year indeed */}
                {!isSameDay && isSameMonth && isSameYear &&
                    <>
                        {lang.capitalize("from")} <TimeTag date={time.startTime} format={time.humanDateMonthFormat} /> <TimeTag date={time.startTime} format={time.timeFormat} /> {lang.to}<br />
                        <TimeTag date={time.endTime} format={time.humanDateMonthFormat} /> <TimeTag date={time.endTime} format={time.timeFormat} /> ({formatDate(time.startTime, 'yyyy')})
                    </>
                }
                {/* Multi years */}
                {!isSameDay && !isSameMonth && !isSameYear &&
                    <>
                        {lang.capitalize("from")} <TimeTag date={time.startTime} format={time.fullHumanDateFormat} /> <TimeTag date={time.startTime} format={time.timeFormat} />
                        &nbsp;{lang.to}&nbsp;
                        <TimeTag date={time.endTime} format={time.fullHumanDateFormat} /> <TimeTag date={time.endTime} format={time.timeFormat} />
                    </>
                }
            </Tag>
        )
    }


    return {
        getters: {
            getDate,
            formatDate,
        },
        setters: {
            setDateTime,
            //setHourFormat
        },
        TimeTag,
        TimeIntervalSentence: TimeIntervalSentence
    }
}
