import React from 'react'

import { sendApiRequest } from '@/src/hooks/http-hook';

//Styling
import styles from './singlePerson.module.scss';

//components
import MainPersonView from '@/DataTypes/Person/Components/Views/MainPersonView/MainPersonView'


const SinglePersonPage = props => {

                console.log(props)

  
    return (
        <div className={`${styles["single-person"]}`}>

            <div className="maxWidthPageContainer">
            
                <MainPersonView data={props} />

            </div>
            
        </div>
    )
}
    
export default SinglePersonPage


export async function getServerSideProps(context) {
    const { slug } = context.query;
    
    //Send the request with the specialized hook
    const response = await sendApiRequest(
        `/personnes/${slug}`,
        'GET'
    )
  
    console.log(response.data);
    return { props: response.data };
}


