import PageMeta from "@/src/common/PageMeta/PageMeta";
import PageHeader from "@/src/layouts/Header/PageHeader";
import { useEffect, useState } from "react";
import { clientSideExternalApiRequest } from "@/src/hooks/http-hook";

const ReferentialHomePage = () => {
    const [refResponse, setRefResponse] = useState(undefined);

    useEffect(() => {
        const getSelectOptions = async () => {
            const response = await clientSideExternalApiRequest("/ref?json", { method: "GET" });
            setRefResponse(response);
        };
        getSelectOptions();
    }, []);

    /*
        Takes in an object with :
            Type 1. keys are titles and values are string representing api urls
            Type 2. keys are titles, and values are arrays of objects of type 1.
        Returns a jsx with appropriate hierarchy of "titles" and links
    */
    function recursiveObjectCrawler(subElem, isTitle = false) {
        if (subElem === undefined) return <></>;

        const Tag = isTitle ? "h2" : "h3";
        //if item is string return value as url
        if (typeof subElem === "string") {
            return (
                <a target="_blank" href={subElem}>
                    {subElem}
                </a>
            );
        }

        //if item is array
        if (Array.isArray(subElem)) {
            return (
                <>
                    {subElem.map((item, i) => (
                        <>
                            <div key={i}>{recursiveObjectCrawler(item)}</div>
                        </>
                    ))}
                </>
            );
        }

        //if item is object
        if (typeof subElem === "object") {
            return (
                <>
                    {Object.entries(subElem).map(([key, value]) => (
                        <>
                            <Tag key={key}>{key}</Tag>
                            {recursiveObjectCrawler(value)}
                        </>
                    ))}
                </>
            );
        }
    }

    return (
        <>
            <PageMeta title={"Référentiel"} description={"Description de l'ontologie d'Avnu"} />
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                htmlTitle={"Consulter les projets"}
                subTitle={
                    "Bienvenue dans la zone de geek. Vous retrouverez des liens vers des contrées obscures de l'ontologie d'Avnu"
                }
            ></PageHeader>
            {recursiveObjectCrawler(refResponse, true)}
        </>
    );
};

export default ReferentialHomePage;
