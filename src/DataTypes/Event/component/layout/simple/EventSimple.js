import React from "react"

import {useDateManager} from '@/common/DateManager/DateManager'

/***  Local styling ***/
import styles from './EventSimple.module.scss';
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";

const EventSimple = ({ model }) => {
    const BottomLineContent = () => {
        //Create an instance of the date manager and extract the right class
        const { TimeTag } = useDateManager(model.startDate, model.endDate);

        return (
            <p className="mb-0 text--dark" style={{ fontSize: "0.90rem"}}>
                <b>
                    <TimeTag />
                    {model.endDate && <><span> - </span><TimeTag endingDate /></>}
                </b>
            </p>
        )
    }

    return (
        <EntitySimple model={model} className={`${styles["event-simple"]}`} BottomLineContent={BottomLineContent} />
    )
}

export default EventSimple