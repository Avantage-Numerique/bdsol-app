import { useRouter } from 'next/router';
//import path from 'path';
//import fs from 'fs/promises';
import { sendApiRequest } from '../../../app/hooks/http-hook'


const SinglePersonPage = ({person, hasError}) => {

    //Rooter hook
    const router = useRouter();

    
    if (hasError) {
        return <h1>Une erreur est survenue. Veuillez essayer un autre paramètre. </h1>
    }
    
    if (router.isFallback) {
        return <h1>Loading...</h1>
    }
    
    return (
        <div>
            <h1>Bonjour {person.firstName}</h1>
        </div>
    )
}
    
export default SinglePersonPage

//Single api request function for this page
const getData = async () => {

    const response = await sendApiRequest(
        "/personnes/list", 
        'POST',
        JSON.stringify({"data": {}})
    );

    return response;
}

//Get the right data passed has props for each page
export const getStaticProps = async (context) => {

    const itemSLUG = context.params?.slug;
    const request = await getData()
    const foundPerson = request.data.find((item) => itemSLUG === item.slug);
  
    //If the app doesn't find a match, then display the appropriate information
    if (!foundPerson) {
        return {
            props: { hasError: true },
        }
    }
  
    //If there is a match, pass the data through the person prop
    return {
        props: {
            person: foundPerson
        }
    }
}

//Set the paths corresponding at the slug value for each person
/* 
!!!!!!!  The slug is probably not unique so we will have to find something else !!!!!
*/
export const getStaticPaths = async () => {

    const resquest = await getData();
    const pathsWithParams = resquest.data.map((person) => ({ params: { slug: person.slug }}))

    return { 
        paths: pathsWithParams,
        fallback: true
    }
}


