import {getDateFromIsoString} from "@/src/utils/DateHelper"

const DisplaySchedule = ({feed}, ...props) => {

    //When we have a component to handle time in french with options like "Jeudi, 14 juillet" we can improve this component
    //We could compare startDate and endDate, only write 1 date if it's the same day
    //We can seperate it by a headline "date" followed by name and hours, every day would be separated
    return (
        <ol>
            {
                feed?.length > 0 ?
                feed.map((step, i) => {
                    return (
                        <div key={step.name + "" + step.startTime} className={`d-flex py-1 px-2 rounded-1 align-items-center ${i % 2 ? "bg-primaryextratlight": ""}`}>
                            <h6 className="flex-grow-1 fw-normal m-0">{step.name}</h6>
                            <div style={{width: "9ch"}} className="d-flex flex-wrap justify-content-end ml-1">
                                <time className="" dateTime={getDateFromIsoString(step.startDate)}>{getDateFromIsoString(step.startDate)}</time>
                                <time className="" dateTime={step.startTime}>{step.startTime}</time>
                            </div>
                            <div style={{width: "9ch"}} className="d-flex flex-wrap justify-content-end ml-1">
                                <time className="" dateTime={getDateFromIsoString(step.endDate)}>{getDateFromIsoString(step.endDate)}</time>
                                <time className="" dateTime={step.endTime}>{step.endTime}</time>
                            </div>
                        </div>
                    )
                })
                : <></>
            }
        </ol>
    )

}
export default DisplaySchedule;