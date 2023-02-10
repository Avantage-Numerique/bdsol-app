
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

const SearchTag = ({list, textField, ...props}) => {

    
    const submitHandler = async (_id) => {
        Router.push({
            pathname: "/searchResults",
            query: { linkId : _id },
        });
    }

    return (
        <ul className="row">
            { list?.length === 0 ?
                <div>{props.NAMessage}</div>
                :
                list.map( (entity) => {
                    return <li
                            key={"searchTag-"+entity._id}
                            className={`col col-sm-auto ${styles["competency-tag"]}`}
                            onClick={() => submitHandler(entity._id)}>
                                {entity[textField]}
                            </li>
                })
            }
        </ul>
    );

}
export default SearchTag;