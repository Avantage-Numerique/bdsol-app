import React from "react"

import {dateManager} from '@/common/DateManager/DateManager'

/***  Local styling ***/
import styles from './EventSimple.module.scss';
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";

const EventSimple = ({ model }) => {

    const BottomLineContent = () => {
        //Create an instance of the date manager and extract the right class
        const { TimeIntervalSentence } = dateManager(model.startDate, model.endDate);

        return (
            <p className="m-0 text--dark text-center">
                <TimeIntervalSentence tag={"strong"} showDay={false} withPreposition={false} />
            </p>
        )
    }

    return (
        <EntitySimple 
            model={model} 
            className={`${styles["event-simple"]}`} 
            BottomLineContent={BottomLineContent} 
        />
    )
}

export default EventSimple