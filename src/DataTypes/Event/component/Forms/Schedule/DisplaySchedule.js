


const DisplaySchedule = ({feed}, ...props) => {

    console.log("feed", feed)

    return (
        <>
            {
                feed?.lenght > 0 ?
                feed.map( (step) => {
                    console.log("step", step)
                    return (
                        <div>
                            <span>{step.name}</span>
                            <span>{step.startDate}</span>
                            <span>{step.startTime}</span>
                            <span>{step.endDate}</span>
                            <span>{step.endTime}</span>
                        </div>
                    )
                })
                : <></>
            }
        </>
    )

}
export default DisplaySchedule;