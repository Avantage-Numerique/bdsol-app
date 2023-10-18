import {useEffect, useState} from "react"

/**
 *
 * @param list {array} the list that will be shown as individual element clickable
 * @param max {Number} The max number to be shown, -1 for all.
 * @param props
 * @param props.listProperty {string} the property to be used as a label.
 * @return {JSX.Element}
 * @constructor
 */
const SearchTag = ({list, max, ...props}) => {

    const [searchTagList, setSearchTagList] = useState([]);
    const [moreThanMax, setMoreThanMax] = useState(false);

    max = max ?? "-1";
    const tagBgColor = props.tagBgColor ?? "primary-light";

    useEffect( () => {
        const setupList = list?.map( (listElement) => {
            let targetElement = props.listProperty ? listElement[props.listProperty] : listElement;
            targetElement = targetElement ?? listElement;
            return { ...targetElement, url:"/"+targetElement.category + "/" + targetElement.slug }
        }).flat();

        if(setupList?.length > max && max !== "-1"){
            setupList.slice(0, max);
            setMoreThanMax(true);
        }

        setSearchTagList(setupList);

    }, [list])

    return (
        <>
            { searchTagList?.length > 0 &&
                <p className={`${props.className ?? ''}`}>
                {
                    searchTagList.map( (tag, index) => {
                        if (index < max || max === "-1") {
                            return (
                                <a href={`/categories${tag.url}`} className={`badge text-bg-${tagBgColor} me-1`} title={tag.name} rel={"follow"}
                                   key={"searchTag-"+tag.url}>
                                    {tag.name}
                                </a>
                            )
                        }
                    })
                }
                {
                    moreThanMax &&
                    <span className={`badge text-bg-primary-light me-1`} key={"searchTag-showmore"}>
                        &hellip;
                    </span>
                }
                </p>
            }
        </>
    );

}
export default SearchTag;