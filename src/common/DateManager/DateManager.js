import { useState } from 'react';
import moment from"moment";
import 'moment/locale/fr';

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

    const [time, setTime] = useState({
        timeStamp: time1,
        endingTimeStamp: time2,
        language: 'fr-CA',
        dateFormat: 'll',
        hourFormat: 'LT'
    })

    /******
     * 
     *    UTIL FUNCTIONS
     * 
     */

    //GENERAL FUNCTIONS
    const getDateMoment = (date, format) => moment(date).locale(time.language).format(format || time.dateFormat);
    const getHourMoment = (hour, format) => moment(hour).locale(time.language).format(format || time.hourFormat);

    //GETTERS FOR SPECIFICS 
    const getStartingDate = (format = null) => getDateMoment(time.timeStamp, format);
    const getDate = getStartingDate;
    const getEndingDate = time.endingTimeStamp ? (format = null) => getDateMoment(time.endingTimeStamp, format) : null ;
    const getStartingHour =  (format = null) => getHourMoment(time.timeStamp, format);
    const getHour = getStartingHour;
    const getEndingHour = time.endingTimeStamp ? (format = null) => getHourMoment(time.endingTimeStamp, format) : null;

    console.log("TESTING  ", 
        "state", time,
        "getStartingDate :", getStartingDate(),
        "getDate :", getDate(),
        "getEndingDate :", getEndingDate(),
        "getStartingHour :", getStartingHour(),
        "getHour :", getHour(),
        "getEndingHour :", getEndingHour()
    )
    //SETTERS
    const setDateFormat = format => setTime({...time, dateFormat: format})
    const setHourFormat = format => setTime({...time, hourFormat: format})

    /********
     * 
     *   Components that shape the display of time
     * 
     */
    //Simple tag that display a time element
    const TimeTag = ({format='L', endingDate = false}) => {
        
        //Define the variables to fill with proper dates and format
        const content = endingDate ? getEndingDate() : getStartingDate();
        const dateTime = endingDate ? getEndingDate(format) : getStartingDate(format);

        return ( 
            <time dateTime={dateTime}>
                &nbsp;{content}&nbsp;
            </time> 
        )
    }

    const TimeIntervalSentence = ({tag, className=""}) => {

        //Define the tag surrounding 
        const Tag = tag ?? 'p';
    
        return (
            <Tag className={className}>
                Du
                <TimeTag />
                au
                <TimeTag endingDate />
            </Tag>
        )
    }


    return {
        getters: {
            getStartingDate,
            getDate,
            getEndingDate,
            getStartingHour,
            getHour,
            getEndingHour
        },
        setters: {
            setDateFormat,
            setHourFormat
        },
        TimeTag,
        TimeIntervalSentence: TimeIntervalSentence
    }
}

    /* Main class to hold the data of a time element
    class TimeViewer {
        constructor(languageCode = "fr") {
            //Language code. French by default
            this.language = languageCode;
            //Default formats
            this.dateDefaultFormat = 'll';    //Only date
            this.hourDefaultFormat = 'LT';    //Only hour

            moment.locale(this.language); 

        }

        setDateDefaultFormat( newDefault ){ this.dateDefaultFormat = newDefault }
        setHourDefaultFormat( newDefault ){ this.hourDefaultFormat = newDefault }

        //Main method to return the formatted element
        //getTime( time, format ){ return moment(time).locale(this.language).format(format)}

    }

    class SingleTimeViewer extends TimeViewer {
        constructor(time, languageCode){
            super(languageCode)

            this.timeStamp = time
        }
    }

    class IntervalTimeViewer extends TimeViewer {
        constructor(startingTime, endingTime, languageCode){
            super(languageCode)

            //Starting
            this.startingTimeStamp = startingTime;
            //Ending
            this.endingTimeStamp = endingTime;
        }

        getStartDate( format = this.dateDefaultFormat ) {
            return moment(this.startingTimeStamp).locale(this.language).format(format)
        }
        getStartHour( format = this.this.hourDefaultFormat ) {
            return moment(this.startingTimeStamp).locale(this.language).format(format)
        }
        getEndDate( format = this.dateDefaultFormat ) {
            return moment(this.endingTimeStamp).locale(this.language).format(format)
        }
        getEndHour( format = this.this.hourDefaultFormat ) {
            return moment(this.startingendingTimeStampTimeStamp).locale(this.language).format(format)
        }
        //Extract data to generate a component
        getTimeTagIntervalData( format = this.dateDefaultFormat ){
            return {
                dateTime, 
                content
            }
        }
  
    }*/
