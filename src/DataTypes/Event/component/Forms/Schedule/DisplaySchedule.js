import {dateManager} from "@/common/DateManager/DateManager";

const DisplaySchedule = ({feed}, ...props) => {

    //When we have a component to handle time in french with options like "Jeudi, 14 juillet" we can improve this component
    //We could compare startDate and endDate, only write 1 date if it's the same day
    //We can seperate it by a headline "date" followed by name and hours, every day would be separated

    // sort feed by day

    return (
        <ol className={"list-group list-group-flush"}>
            {
                feed?.length > 0 ?
                feed.map((step, i) => {
                    const startTime = "";
                    const endTime = "";
                    const { TimeTag, TimeIntervalSentence } = dateManager(step.startDate, step.endDate);
                    return (
                        <li key={step.name + "" + step.startTime} className={`list-group-item d-flex justify-content-between align-items-center ${i % 2 ? "bg-primaryextratlight": ""}`}>
                            <div className="d-flex w-25">
                                <TimeIntervalSentence showDay={false} tag={"span"} />
                            </div>
                            <label className="flex-grow-1 fw-normal m-0 ps-3">{step.name}</label>
                        </li>
                    )
                })
                : <></>
            }
        </ol>
    )

}
export default DisplaySchedule;