import React from 'react'

import { sendExternalApiRequest } from '@/src/hooks/http-hook';

//Styling
import styles from './singlePerson.module.scss';

//components
import MainPersonView from '@/DataTypes/Person/Components/Views/MainPersonView/MainPersonView'


const SinglePersonPage = props => {

    return (
        
        <div className={`${styles["single-person"]}`}>

            <div className="maxWidthPageContainer">
            
                <MainPersonView data={props} />

            </div>
            
        </div>
    )
}
    
export default SinglePersonPage;


export async function getServerSideProps(context) {
    const { slug } = context.query;
    
    //Send the request with the specialized hook
    const response = await sendExternalApiRequest(
        `/personnes/${slug}`,
        'GET'
    )

    return { props: response.data };
}

