import React from 'react'
import DOMPurify from 'isomorphic-dompurify';

/*

    This component is to be called every time 
    we want to inject html in the code. 

    It centralize the use of dangerouslySetInnerHTML

*/

const SanitizedInnerHtml = ( {tag, type, className, children, removeQlEditorClass} ) => {
    //Cleaning machine
    const cleanedData = DOMPurify.sanitize( children );
    //Set the wrapper
    const Wrapper = tag || "div";
    //Initialize the object
    let typeProps = {};
    if(type && (tag === "script")) 
        typeProps["type"] = type

    if(tag != "script"){
        typeProps.className = "";
        if (className) typeProps.className += className;
        if (!removeQlEditorClass) typeProps.className += " ql-editor p-0 ";
    }
    
    //By default
    return (
        <Wrapper {...typeProps} dangerouslySetInnerHTML={{__html: cleanedData}} />
    ) 

}

export default SanitizedInnerHtml