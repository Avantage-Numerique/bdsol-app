import React from "react";
import styles from "./singleMedia.module.scss";
import { sessionContextInjector } from "@/auth/session/handlers/withSession";
import { externalApiRequest } from "@/src/hooks/http-hook";
import { getUserHeadersFromUserSession } from "@/auth/context/auth-context";
import MediaSingleView from "@/src/DataTypes/Media/components/forms/MediaSingleView/MediaSingleView";

const SingleMediaPage = (props) => {
    return (
        <div className={`${styles["single-media"]}`}>
            <MediaSingleView data={props} />
        </div>
    );
};

export default SingleMediaPage;

export const getServerSideProps = sessionContextInjector(mediaSlugSSProps);

export async function mediaSlugSSProps(context) {
    const { slug } = context.query; //in fact it's the id for now.

    const response = await externalApiRequest(`/medias/data/${slug}`, {
        method: "GET",
        headers: getUserHeadersFromUserSession(context.req.session.user),
    });
    if (typeof response.data._id === "undefined") return { notFound: true };
    /*if (!response.error) {
        response.data.url = process.env.NEXT_PUBLIC_API_URL + response.data.url;
    }*/
    return { props: response.data };
}
