import React from 'react'

import {
    externalApiRequest
} from '@/src/hooks/http-hook';

//Styling
import styles from './singlePerson.module.scss';

//components
import PersonSingle from '@/DataTypes/Person/Components/layouts/single/PersonSingle'
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import AppRoutes from "@/src/Routing/AppRoutes";


const SinglePersonPage = props => {
    console.log("person single route: ", AppRoutes.singlePerson);
    return (
        <div className={`single-container ${styles["single-person"]}`}>

            <div className="maxWidthPageContainer">
            
                <PersonSingle data={props} route={AppRoutes.personSingle} />

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


