import SearchTag from "@/common/Components/SearchTag";
import React from "react";

const SkillGroup = ({label, skills}) => {
    return (
        <article className={`d-flex flex-column p-2 mb-2 border-start`}>
            <h5 className="text-dark mb-2">{label}</h5>
            <SearchTag className={"m-0"}
                       list={skills}
            />
        </article>
    )
}

export {SkillGroup}