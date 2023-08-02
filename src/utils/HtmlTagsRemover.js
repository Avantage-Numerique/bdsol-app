import React from 'react'; 
import DOMPurify from 'isomorphic-dompurify';

/*

    This component is used to remove the styling applied by Rich Text Editors 
    to leave us only with a text string

*/

const HtmlTagsRemover = ( {children, tag, className} ) => {

    //Declare the type of tag in which it will be displayed
    const Wrapper = tag ?? "div";
    //Still need to sanitized the data 
    const cleanedData = DOMPurify.sanitize( children );
    // Remove all tags from a string
    const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    //Extract the text of the new data
    const cleanedText = cleanedData.replace(htmlRegexG, ''); 
    //Return value
    return (
        <Wrapper 
            className={className ? className : ""}
            dangerouslySetInnerHTML={{
                __html: cleanedText
            }}
        />
    )

}

export default HtmlTagsRemover