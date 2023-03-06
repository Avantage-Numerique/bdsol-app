
/**
 * Params:
 *  list : object containing a "textField" to show in the tag an "_id" to fetch
 *      example { name: "showing in the tag", _id: "1234...34"}
 *  textField : The name of the field that you want the tag to show ("name")
 *  NAMessage: Message to show if list is empty ("Aucune entity trouvée")
 * 
 */

const SearchTag = ({list, ...props}) => {


    const searchTagLength = list?.length;
    const max = props.max ?? -1;
    const listIsLargerThanMax = max > 0 && searchTagLength > max;
    const searchTagList = listIsLargerThanMax ? list.slice(0, max) : list;

    return (
        <>
            { searchTagLength > 0 &&
                <p>
                {
                    searchTagList.map( (entity, index) => {
                        if (index < max || max === -1) {
                            return (
                                <a href={`/taxonomies${entity.url}`} className={`badge text-bg-primarylight me-1`} title={entity.label} rel={"follow"}
                                   key={"searchTag-"+entity.url}>
                                    {entity.label}
                                </a>
                            )
                        }
                    })
                }
                {
                    listIsLargerThanMax &&
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