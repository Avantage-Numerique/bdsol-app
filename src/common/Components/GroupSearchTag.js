import React, { useState } from "react"
import SearchTag from "@/common/Components/SearchTag";

/**
 * A group of search tag list
 * @param list {array} the list that will be shown as individual element clickable
 * @param max {Number} The max number to be shown, -1 for all.
 * @param props
 * @param props.groupLabelProperty {string} the property to be used as a label of the group.
 * @param props.groupSubListProperty {string} the property to be used as the target list of each group.
 * @param props.groupSubListTagProperty {string} the property to be used as the target list tag property
 * @return {JSX.Element}
 * @constructor
 */
const GroupSearchTag = ({list, max, ...props}) => {

    const [tagGroup] = useState([list]);//setTagGroup
    //const [moreThanMax, setMoreThanMax] = useState(false);

    max = max ?? "-1";

    /*useEffect( () => {

        const setupList = list.map( (elem) => {
            return elem.skills.map( (skill) => {
                return { ...skill, url:"/"+skill.category + "/" + skill.slug }
            })
        }).flat();

        if(setupList.length > max){
            setupList.slice(0, max);
            setMoreThanMax(true);
        }
        setTagGroup(setupList);

    }, [list]);*/


    return (
        <>
            { searchTagList.length > 0 &&
                <p>
                    {
                        tagGroup.map( (group, index) => {
                            if (index < max || max === "-1") {
                                return (
                                    <>
                                        <h4>{group[props.groupLabelProperty]}</h4>
                                        <SearchTag
                                            className="row"
                                            list={group[props.groupSubListProperty]}
                                            listProperty={props.groupSubListTagProperty}
                                            max={max}
                                        />
                                    </>
                                );
                            }
                        })
                    }
                </p>
            }
        </>
    );

}
export default GroupSearchTag;