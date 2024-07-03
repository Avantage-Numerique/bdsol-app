import React from "react"

/***  Local styling ***/
import EntitySimple from "@/DataTypes/common/layouts/EntitySimple/EntitySimple";

const PersonSimple = ({ model, ...props }) => {
    return (
        <EntitySimple {...props} model={model} />
    )
}

export default PersonSimple