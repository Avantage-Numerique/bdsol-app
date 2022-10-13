import React from 'react'

import { sendExternalApiRequest } from '@/src/hooks/http-hook';

//Styling
import styles from './singlePerson.module.scss';

//components
import MainPersonView from '@/DataTypes/Person/Components/Views/MainPersonView/MainPersonView'
import {getUserHeadersFromUserSession} from "@/auth/context/auth-context";
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";


const SinglePersonPage = props => {

                console.log(props);

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
    
    //Send the request with the specialized hook
    const response = await sendExternalApiRequest(
        `/personnes/${slug}`,
        'GET',
        getUserHeadersFromUserSession(context.ctx.req.session.user, false)
    );
  
    console.log(response.data);
    console.log(context.ctx.req.session.user);
    return { props: response.data };
}


