import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

/*

    This component is used to remove the styling applied by Rich Text Editors
    to leave us only with a text string

*/

const removeTagsFromString = ( value ) => {

    //Still need to sanitized the data
    const cleanedData = DOMPurify.sanitize( value );
    // Remove all tags from a string
    const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    //Return value
    return cleanedData.replace(htmlRegexG, '');
}

export {removeTagsFromString}