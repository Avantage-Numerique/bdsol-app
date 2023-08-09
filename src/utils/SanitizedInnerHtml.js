import DOMPurify from 'isomorphic-dompurify';

/*

    This component is to be called every time 
    we want to inject html in the code. 

    It centralize the use of dangerouslySetInnerHTML


*/

export const SanitizedInnerHtml = ( {tag, type, className, children, removeQlEditorClass} ) => {

    //Cleaning machine
    const cleanedData = DOMPurify.sanitize( children );
    const typeProps = type ? {type: type} : {};
    const Wrapper = tag ?? "div";

    typeProps.className = "";

    if (className) typeProps.className += className;
    if (!removeQlEditorClass) typeProps.className += " ql-editor p-0 ";


    //If the desired tag is a script tag
    // if(tag === "script")
    //     return (
    //         <Wrapper {...typeProps}
    //             dangerouslySetInnerHTML={{
    //             __html: DOMPurify.sanitize(cleanedData)
    //             }}
    //         />
    //     )

    //By default
    return (
        <Wrapper {...typeProps}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(cleanedData)
            }}
        />
    )

}

export default SanitizedInnerHtml