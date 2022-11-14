import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';

//Styling
import styles from './singlePerson.module.scss';

//components
import MainPersonView from '@/src/DataTypes/Person/Components/layouts/single/MainPersonView'
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";


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


export const getServerSideProps = withSessionSsr(personSlugSSProps);

export async function personSlugSSProps(context) {
    const { slug } = context.query;

    const response = await externalApiRequest(
        `/persons/${slug}`,
        {
            method: 'GET',
            headers: getUserHeadersFromUserSession(context.req.session.user)
        });

    return { props: response.data };
}


