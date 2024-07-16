import PageHeader from "@/layouts/Header/PageHeader";
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";
import AppRoutes from "@/src/Routing/AppRoutes";
import React from "react";
import {lang} from "@/common/Data/GlobalConstants";
import Icon from "@/common/widgets/Icon/Icon";
import {useAuth} from "@/auth/context/auth-context";
import Link from "next/link";

/**
 * Error object for the app Error pages.
 * @param statusCode {Number} Par défault 404
 * @param props.children {any}
 * @return {JSX.Element}
 * @constructor
 */
function Error({statusCode, ...props}) {

    statusCode = statusCode ?? 404;
    const auth = useAuth();

    const errorRoute = AppRoutes[`error${statusCode}`] || AppRoutes.error404;
    const breadcrumbLabels = {
        "404": "404",
        "403": "403",
        "400": "400",
        "500": "500"
    }
    return (
        <div>
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                htmlTitle={`${lang[`title${statusCode}`] || lang.title404}`}
                subTitle={lang[`description${statusCode}`] || lang.description404}
                image={"/general_images/page-404.webp"}
                imageAlt={"URL inexistante"}
                imageRight={false}
            >

                <p className={"pt-2"}>
                    {auth.user.isLoggedIn &&
                        <Link href={AppRoutes.contribute.pathname} className={"btn btn-outline-secondary btn-lg"}>
                            <Icon iconName={"plus"}/> Défini cette nouvelle donnée
                        </Link>
                    }
                    {!auth.user.isLoggedIn &&
                        <Link href={AppRoutes.connection.pathname} className={"btn btn-outline-secondary btn-lg"}>
                            Se connecter pour contribuer
                        </Link>
                    }
                </p>

            </PageHeader>

            <div className="row my-4 py-4">
                <section className="col col-12 col-md-12">
                    <Breadcrumbs className={"pb-4"} route={errorRoute} labels={breadcrumbLabels}/>
                    {props.children}
                </section>
            </div>
        </div>
    )
}

export default Error;