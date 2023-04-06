import PageHeader from "@/layouts/Header/PageHeader";
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";
import AppRoutes from "@/src/Routing/AppRoutes";
import React from "react";
import {lang} from "@/common/Data/GlobalConstants";

/**
 * Error object for the app Error pages.
 * @param statusCode {Number} Par défault 404
 * @param props.children {any}
 * @return {JSX.Element}
 * @constructor
 */
function Error({statusCode, ...props}) {

    statusCode = statusCode ?? 404;
    return (
        <div>
            <PageHeader
                bg={"bg-purplelighter"}
                textColor={"text-white"}
                htmlTitle={lang[`title${statusCode}`] || lang.title404}
                subTitle={lang[`description${statusCode}`] || lang.description404}
            >
                <Breadcrumbs className={"pt-2"} route={AppRoutes[`error${statusCode}`] || AppRoutes.error404} />
            </PageHeader>

            <div className="row my-4 py-4">
                <section className="col col-12 col-md-12">
                    {props.children}
                </section>
            </div>
        </div>
    )
}

export default Error;