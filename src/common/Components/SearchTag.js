
//Router
import Router from 'next/router';

import styles from './SearchTag.module.scss'

/**
 * Params:
 *  list : object containing a "textField" to show in the tag an "_id" to fetch
 *      example { name: "showing in the tag", _id: "1234...34"}
 *  textField : The name of the field that you want the tag to show ("name")
 *  NAMessage: Message to show if list is empty ("Aucune entity trouvée")
 * 
 */

const SearchTag = ({list, ...props}) => {

    
    const submitHandler = async (url) => {
        Router.push({
            pathname: "/taxonomies"+url,
        });
    }
// ${styles["competency-tag"]}
    return (
        <>
            { list?.length > 0 &&
                <p>
                {
                    list.map( (entity) => {
                        return (
                            <a href={`/taxonomies${entity.url}`} className={`badge text-bg-primarylight me-1`} title={entity.label} rel={"follow"}
                               key={"searchTag-"+entity.url}>
                                {entity.label}
                            </a>
                        )
                    })
                }
                </p>
            }
        </>
    );

}
export default SearchTag;