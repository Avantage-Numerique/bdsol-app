import { useState, useEffect } from "react"

/**
 * Params:
 *  list : occupation list with structure -> [ { ..., skills: [ taxonomyObject1, ... ], status:{} }, {...} ]
 *  textField : The name of the field that you want the tag to show ("name")
 *  NAMessage: Message to show if list is empty ("Aucune entity trouvée")
 * 
 */

const SearchTag = ({list, max, ...props}) => {

    const [searchTagList, setSearchTagList] = useState([]);
    const [moreThanMax, setMoreThanMax] = useState(false);

    //Split into list of skills
    useEffect( () => {
        const setupList = list.map( (elem) => {
            return elem.skills.map( (skill) => {
                return { ...skill, url:"/"+skill.category + "/" + skill.slug }
            })
        }).flat();

        if(setupList.length > max){
            setupList.slice(0, max);
            setMoreThanMax(true);
        }
        
        setSearchTagList(setupList);

    }, [list])

    return (
        <>
            { searchTagList.length > 0 &&
                <p>
                {
                    searchTagList.map( (skill, index) => {
                        if (index < max || max === "-1") {
                            return (
                                <a href={`/categories${skill.url}`} className={`badge text-bg-primarylight me-1`} title={skill.name} rel={"follow"}
                                   key={"searchTag-"+skill.url}>
                                    {skill.name}
                                </a>
                            )
                        }
                    })
                }
                {
                    moreThanMax &&
                    <span className={`badge text-bg-primarylight me-1`} key={"searchTag-showmore"}>
                        &hellip;
                    </span>
                }
                </p>
            }
        </>
    );

}
export default SearchTag;