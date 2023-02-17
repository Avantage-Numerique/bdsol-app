
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

    return (
        <>
            {
                list?.length > 0 && (
                    <ul className="row">
                {
                    list.map( (entity) => {
                        return <li
                        key={"searchTag-"+entity.url}
                        className={`col col-sm-auto ${styles["competency-tag"]}`}
                        onClick={() => submitHandler(entity.url)}>
                                {entity.label}
                            </li>
                    })}
                </ul>
                )
            }
        </>
    );

}
export default SearchTag;