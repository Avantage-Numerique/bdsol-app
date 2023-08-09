
import { getDateFromIsoString } from "@/src/utils/DateHelper"

const DisplaySchedule = ({feed}, ...props) => {

    //When we have a component to handle time in french with options like "Jeudi, 14 juillet" we can improve this component
    //We could compare startDate and endDate, only write 1 date if it's the same day
    //We can seperate it by a headline "date" followed by name and hours, every day would be separated
    return (
        <>
            {
                feed?.length > 0 ?
                feed.map( (step) => {
                    return (
                        <div className="row">
                            <span className="col-md-2">{step.name}</span>
                            <span className="col-md-3">{getDateFromIsoString(step.startDate)}</span>
                            <span className="col-md-1">{step.startTime}</span>
                            <span className="col-md-1"></span>
                            <span className="col-md-3">{getDateFromIsoString(step.endDate)}</span>
                            <span className="col-md-1">{step.endTime}</span>
                        </div>
                    )
                })
                : <></>
            }
        </>
    )

}
export default DisplaySchedule;