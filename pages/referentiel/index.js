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
            console.log(response);
        };
        getSelectOptions();
    }, []);

    const RefList = (ref) => {
        if (ref == undefined) return <></>;
        return (
            <div>
                {Object.entries(ref).map(([sectionKey, sectionValue]) => (
                    <div key={sectionKey}>
                        <h3>{sectionKey}</h3>
                        <ul>
                            {Object.entries(sectionValue).map(([childKey, childValue]) => (
                                <li key={childKey}>
                                    <a href={`${process.env.NEXT_PUBLIC_API_URL}/ref${childValue.url}`}>
                                        {childValue.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

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
            <h2>
                <a href={`${process.env.NEXT_PUBLIC_API_URL}/ref`}>Référentiel</a>
            </h2>
            {RefList(refResponse)}
        </>
    );
};

export default ReferentialHomePage;
