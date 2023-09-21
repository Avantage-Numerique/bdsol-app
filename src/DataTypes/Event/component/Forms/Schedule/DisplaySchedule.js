import {dateManager, parseDatesFeed} from "@/common/DateManager/DateManager";
import {lang} from "@/common/Data/GlobalConstants";
import {formatDate} from "@/src/helpers/dates";
import {useEffect, useState} from "react";

const DisplaySchedule = ({feed}, ...props) => {

    //When we have a component to handle time in french with options like "Jeudi, 14 juillet" we can improve this component
    //We could compare startDate and endDate, only write 1 date if it's the same day
    //We can seperate it by a headline "date" followed by name and hours, every day would be separated

    // sort feed by day
    let lastDate;
    let currentDate;

    /** feed structure
     * endDate: "2023-09-12T23:00:00.000Z"
     * endTime: "19:00"
     * name: "asdasdasdasd"
     * startDate: "2023-09-12T19:00:00.000Z"
     * startTime: "15:00"
     */

    let [parsedFeed, setParsedFeed] = useState({
        initFeed: feed,
        feed: [],
        feedKeys: [],
        feedDates: []
    });

    let newFeed = {};

    useEffect(() => {
        setParsedFeed(parseDatesFeed(feed));
    }, []);


    const DateSchedule = ({feed}) => {
        // list-group-flush
        return (
            <ol className={"list-group"}>
                {
                    feed.length > 0 ?
                        feed.map((step, i) => {
                            const {TimeTag, TimeIntervalSentence} = dateManager(step.startDate, step.endDate);
                            lastDate = {
                                startDate: step.startDate,
                                endDate: step.endDate
                            }
                            return (
                                <li key={step.key + "-" + step.name + "" + String(step.startTime) + "scheduleInfo"}
                                    className={`list-group-item d-flex justify-content-between align-items-center ${i % 2 ? "bg-primaryextratlight" : ""}`}>
                                    <div className="d-flex w-25">
                                        <TimeIntervalSentence showDay={false} tag={"span"}/>
                                    </div>
                                    <label className="flex-grow-1 fw-normal m-0 ps-3">{step.name}</label>
                                </li>
                            )
                        })
                        :
                        <></>
                }
            </ol>
        )
    }


    return (
        <div className={`${props.className ?? ""}`}>
            {
                parsedFeed.feedDates.length > 0 ?
                    parsedFeed.feedDates.map((date, i) => {
                        const key = formatDate(date);
                        const currentFeed = parsedFeed.feed[key] ?? [];

                        return (
                            <>
                                <p key={key + "subtitle"} className={`pt-3`}>
                                    <strong>{lang.capitalize("the")} {formatDate(date, lang.humanDateFormat)}</strong>
                                </p>
                                { currentFeed.length > 0 &&
                                    <DateSchedule feed={currentFeed} />
                                }
                            </>
                        )
                    })
                    :
                    <></>
            }
        </div>
    )

    //basic not date hierarchy
    return (
        <ol className={"list-group list-group-flush"}>
            {
                feed.length > 0 ?
                    feed.map((step, i) => {
                        const {TimeTag, TimeIntervalSentence} = dateManager(step.startDate, step.endDate);
                        lastDate = {
                            startDate: step.startDate,
                            endDate: step.endDate
                        }
                        return (
                            <>
                                <p key={step.key + "-" + step.name + "" + step.startTime + "subtitle"} className={`pt-4`}>
                                    <strong>{lang.capitalize("the")} <TimeTag date={step.startDate} format={lang.humanDateFormat}/></strong>
                                </p>
                                <li key={step.key + "-" + step.name + "" + step.startTime + "scheduleInfo"}
                                    className={`list-group-item d-flex justify-content-between align-items-center ${i % 2 ? "bg-primaryextratlight" : ""}`}>
                                    <div className="d-flex w-25">
                                        <TimeIntervalSentence showDay={false} tag={"span"}/>
                                    </div>
                                    <label className="flex-grow-1 fw-normal m-0 ps-3">{step.name}</label>
                                </li>
                            </>
                        )
                    })
                :
                <></>
            }
        </ol>
    )

}
export default DisplaySchedule;