import PageHeader from "@/layouts/Header/PageHeader";
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";
import AppRoutes from "@/src/Routing/AppRoutes";
import React from "react";
import {lang} from "@/common/Data/GlobalConstants";

function Error404() {

    const statusCode = 404;
    return (

        <div>
            <PageHeader
                bg={"bg-purplelighter"}
                textColor={"text-white"}
                htmlTitle={lang.title404}
                subTitle={lang.description404}
            >
                <Breadcrumbs className={"pt-2"} route={AppRoutes.error404} />
            </PageHeader>

            <div className="container">
                <div className="row my-4 py-4">

                    {/* Feed section */}
                    <section className="col col-12 col-md-9">
                        <p>{statusCode}</p>
                    </section>

                    {/* Aside section */}
                    <aside className="col col-12 col-md-3">
                        aside
                    </aside>

                </div>
            </div>
        </div>
    )
}

export default Error404;