import React from "react"
import moment from"moment";
import 'moment/locale/fr';

import {useDateManager} from '@/common/DateManager/DateManager'

/***  Local styling ***/
import styles from './eventSimple.module.scss'
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";
import {replacePathname} from "@/src/helpers/url";

const EventSimple = ({ model }) => {

    const link = "/"+replacePathname(model.singleRoute.pathname, {slug: model.slug});

    const BottomLineContent = () => {


        //Create an instance of the date manager and extract the right class
        const { TimeIntervalSentence } = useDateManager(model.startDate, model.endDate);

        return (
            <>
                <TimeIntervalSentence />
            </>
        )
    }

    return (
        <EntitySimple model={model} className={`${styles["event-simple"]}`} BottomLineContent={BottomLineContent} />
    )
}

export default EventSimple