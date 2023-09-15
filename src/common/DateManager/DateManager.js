import {useState} from 'react';

import Format from "@/common/DateManager/Format";
import {frCA} from 'date-fns/locale'

import {DateTag} from "@/common/DateManager/DateTag";
import {lang} from "@/common/Data/GlobalConstants";
import compareAsc from "date-fns/compareAsc";
import {formatDate, setDateTime} from "@/src/helpers/dates";


export const parseDatesFeed = (feed) => {
    let tempFeed = {};
    let feedKeys = [];
    let feedDates = [];

    for (let step of feed) {

        let currentDate = {...step};

        const currentDateObject = setDateTime(step.startDate);
        const currentDateKey = formatDate(currentDateObject);

        currentDate.startDateObject = currentDateObject;
        currentDate.key = currentDateKey;

        if (tempFeed[currentDateKey] === undefined) {
            tempFeed[currentDateKey] = [];
        }

        if (!feedKeys.includes(currentDateKey)) {
            feedKeys.push(currentDateKey);
            feedDates.push(currentDateObject);
        }

        tempFeed[currentDateKey].push(currentDate);
    }

    feedDates = feedDates.sort(compareAsc);

    return {
        initFeed: feed,
        feed: tempFeed,
        feedKeys: feedKeys,
        feedDates: feedDates
    }
};

export const dateManager = (time1, time2 = null) => {

    /*const setDateTime = (time=undefined) => {
        if (typeof time !== "undefined") {
            return new Date(time);
        }
        return null;
    }*/

    const [time, setTime] = useState({
        timeStamp: time1,
        endingTimeStamp: time2,
        initStartTime: time1,
        initEndTime: time2,
        startTime: setDateTime(time1),
        endTime: setDateTime(time2),
        language: frCA,
    });


    const getDate = (date, format = lang.dateFormat, locale= frCA) => {
        const dateObject = setDateTime(date);
        return Format(dateObject, format, {locale:locale});
    }

    /*const formatDate = (dateObject, format = lang.dateFormat, locale= frCA) => {
        if (typeof dateObject === 'object') {
            return Format(dateObject, format, {locale:locale});
        }
        return dateObject;
    }*/

    const TimeTag = ({date, format}) => {

        format = format ?? lang.humanDateFormat;

        const formatedDate = formatDate(setDateTime(date), format);

        return (
            <DateTag value={date} label={formatedDate} />
        );
    }


    //Simple tag that contains the time and hour

    const TimeIntervalSentence = ({tag, className="", showDay=true}) => {
        //Define the tag surrounding
        const Tag = tag ?? 'p';

        const isSameYear = formatDate(time.startTime, lang.yearFormat) === formatDate(time.endTime, lang.yearFormat);
        const isSameMonth = formatDate(time.startTime, lang.monthNumberFormat) === formatDate(time.endTime, lang.monthNumberFormat);
        const isSameDay = formatDate(time.startTime, lang.dayMonthNumberFormat) === formatDate(time.endTime, lang.dayMonthNumberFormat);

        return (
            <Tag className={className}>
                {/* DATE */}
                {/* is one day */}
                {isSameDay && isSameMonth && isSameYear &&
                    <>
                        {showDay &&
                            <>
                                {lang.capitalize("the")} <TimeTag date={time.startTime} format={lang.humanDateFormat} /> {formatDate(time.startTime, lang.yearFormat)}
                                <br/>
                            </>
                        }
                        <TimeTag date={time.startTime} format={lang.timeFormat} /> {lang.hourTo} <TimeTag date={time.endTime} format={lang.timeFormat} />
                    </>
                }
                {/* Same year only */}
                {!isSameDay && !isSameMonth && isSameYear &&
                    <>
                        {lang.capitalize("from")} <TimeTag date={time.startTime} format={time.humanDateFormat} /> <TimeTag date={time.startTime} format={lang.timeFormat} />
                        &nbsp;{lang.to}&nbsp;
                        <TimeTag date={time.endTime} format={lang.humanDateFormat} /> <TimeTag date={time.endTime} format={lang.timeFormat} /> {formatDate(time.startTime, lang.yearFormat)}
                    </>
                }
                {/* Within one month on the same year indeed */}
                {!isSameDay && isSameMonth && isSameYear &&
                    <>
                        {lang.capitalize("from")} <TimeTag date={time.startTime} format={lang.humanDateMonthFormat} /> <TimeTag date={time.startTime} format={lang.timeFormat} /> {lang.to}<br />
                        <TimeTag date={time.endTime} format={lang.humanDateMonthFormat} /> <TimeTag date={time.endTime} format={lang.timeFormat} /> ({formatDate(time.startTime, lang.yearFormat)})
                    </>
                }
                {/* Multi years */}
                {!isSameDay && !isSameMonth && !isSameYear &&
                    <>
                        {lang.capitalize("from")} <TimeTag date={time.startTime} format={lang.fullHumanDateFormat} /> <TimeTag date={time.startTime} format={lang.timeFormat} />
                        &nbsp;{lang.to}&nbsp;
                        <TimeTag date={time.endTime} format={lang.fullHumanDateFormat} /> <TimeTag date={time.endTime} format={lang.timeFormat} />
                    </>
                }
            </Tag>
        )
    }


    return {
        getters: {
            getDate,
            formatDate,
            setTime,
        },
        setters: {
            setDateTime,
            //setHourFormat
        },
        formatDate,
        time,
        TimeTag,
        TimeIntervalSentence: TimeIntervalSentence
    }
}
