import {useCallback} from "react";

import PageHeader from "@/src/layouts/Header/PageHeader";
import { Breadcrumbs } from "@/src/common/Breadcrumbs/Breadcrumbs";
import AppRoutes from "@/src/Routing/AppRoutes";
import Button from "@/src/common/FormElements/Button/Button";

const FAQ = () => {

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "faq": "FAQ",
        }[param];
    }, []);

    return (
        <>
            <PageHeader
                bg={"bg-purplelighter"}
                textColor={"text-white"}
                title={"FAQ"}
            >
                <Breadcrumbs className={"pt-2"} route={AppRoutes.faq} getLabelGenerator={getLabelGenerator} />
            </PageHeader>
            <Button href="/faq/licences">Précisions sur les licences et droits d'auteurs</Button>
        </>
    );
}

export default FAQ;