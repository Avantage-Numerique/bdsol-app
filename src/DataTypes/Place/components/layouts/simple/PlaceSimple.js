import React from "react"

/***  Local styling ***/
import styles from './PlaceSimple.module.scss';
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";

const PlaceSimple = ({ model }) => {
    const BottomLineContent = () => {

        let bottomText = "";
        if(model?.location?.address){
            if(model?.location?.city)
                bottomText = model.location.address + ", " + model.location.city;
            else
                bottomText = model.location.address;
        }

        return (
            <div className="mb-0 text--dark" style={{ fontSize: "0.90rem"}}>
                <div>
                    {bottomText}
                </div>
            </div>
        )
    }

    return (
        <EntitySimple model={model} className={`${styles["place-simple"]}`} BottomLineContent={BottomLineContent} />
    )
}

export default PlaceSimple