import React from 'react'
import styles from './singleMedia.module.scss';
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import SingleMediaView from "@/DataTypes/Media/layouts/SingleMediaView";

const SingleMediaPage = props => {

    return (
        <div className={`single ${styles["single-media"]}`}>

            <div className="maxWidthPageContainer">

                <SingleMediaView data={props} />

            </div>

        </div>
    )
}

export default SingleMediaPage;


export const getServerSideProps = withSessionSsr(mediaSlugSSProps);

export async function mediaSlugSSProps(context) {
    const { slug } = context.query;

    return {
        props: {
            slug: slug,
            title: "title",
            alt: "alt",
            description: "description",
            path: "path",
            url: "url",
            licence: "licence",
            fileType: "filetype",
            fileName: "filename",
            extension: "extension",
            entityId: "targetEntity",
            entityType: "type entité",
            uploadedBy: "user qui a upload",
            dbStatus: "status du média",
            status: "status de la mod",
        }
    };
}


