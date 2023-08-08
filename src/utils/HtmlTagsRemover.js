import React from 'react';
import {removeTagsFromString} from "@/src/helpers/html";

/*

    This component is used to remove the styling applied by Rich Text Editors 
    to leave us only with a text string

*/

const HtmlTagsRemover = ( {children, tag, className} ) => {

    //Declare the type of tag in which it will be displayed
    const Wrapper = tag ?? "div";

    //Return value
    return (
        <Wrapper 
            className={className ? className : ""}
            dangerouslySetInnerHTML={{
                __html: removeTagsFromString(children)
            }}
        />
    )

}

export default HtmlTagsRemover