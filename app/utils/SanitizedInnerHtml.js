import DOMPurify from 'isomorphic-dompurify';

/*

    This component is to be called every time 
    we want to inject html in the code. 

    It centralize the use of dangerouslySetInnerHTML


*/

export const SanitizedInnerHtml = ( {tag, type, children} ) => {

    //Cleaning machine
    const cleanedData = DOMPurify.sanitize( children );

    //If the desired tag is a script tag
    if(tag === "script")
        return (
            <script 
                type={type ? type : ""}
                dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(cleanedData)
                }}
            />
        )

    //By default
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(cleanedData)
            }}
        />
    )

}

export default SanitizedInnerHtml