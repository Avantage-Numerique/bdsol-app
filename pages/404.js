import React from "react";
import Error from "@/src/layouts/Errors/Error";
import AppRoutes from "@/src/Routing/AppRoutes";
import Button from "@/FormElements/Button/Button";
import {lang} from "@/common/Data/GlobalConstants";

function Error404() {

    const entities = [
        AppRoutes.organisations,
        AppRoutes.persons,
        AppRoutes.projects,
        AppRoutes.categories,
        AppRoutes.events,
        AppRoutes.equipment
    ];

    return (
        <Error statusCode={404}>
            <h4 className={"mb-3"}>{lang.maybeThisWouldHelp}</h4>
            <div className="col-12" key={`li00${AppRoutes.consult.label}`}>
                <Button href={AppRoutes.consult.pathname} size="large-100">Voir toutes les
                    données</Button>
            </div>
            {false &&
                <nav className="row pt-3 row-cols-1 row-cols-sm-6 gy-3">

                    {
                        entities.map((route, index) => {
                            return (
                                <div className="col" key={`li${index}${route.label}`}>
                                    <Button href={route.pathname} size="large-100"
                                            className={"w-100"}>{route.label}</Button>
                                </div>
                            )
                        })
                    }
                </nav>
            }

        </Error>
    )
}

export default Error404;