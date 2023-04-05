import React from "react";
import Error from "@/src/layouts/Errors/Error";
import AppRoutes from "@/src/Routing/AppRoutes";
import Button from "@/FormElements/Button/Button";

function Error404() {

    const entities = [
        AppRoutes.organisations,
        AppRoutes.persons,
        AppRoutes.categories,
    ];


    return (
        <Error statusCode={404}>
            <h4 className={"mb-3"}>Peut-être qu'une de ces sections vous aideras</h4>
            <nav className="row pt-3 row-cols-1 row-cols-sm-3 gy-3">
                {
                    entities.map((route, index) => {
                        return (
                            <div className="col" key={`li${index}${route.label}`}>
                                <Button href={route.pathname} size="large-100">{route.label}</Button>
                            </div>
                        )
                    })
                }
            </nav>
        </Error>
    )
}

export default Error404;