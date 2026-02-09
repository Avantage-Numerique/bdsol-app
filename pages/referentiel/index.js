import PageMeta from "@/src/common/PageMeta/PageMeta";
import PageHeader from "@/src/layouts/Header/PageHeader";
import { useEffect, useState } from "react";
import { clientSideExternalApiRequest } from "@/src/hooks/http-hook";
import Icon from "@/src/common/widgets/Icon/Icon";
import { lang } from "@/src/common/Data/GlobalConstants";

import styles from "./referentiel.module.scss";

const ReferentialHomePage = () => {
    /**
     * @type {[import('../../../api/src/Referential/Data/types').RefData, (RefData) => void]}
     */
    const [refResponse, setRefResponse] = useState(undefined);

    useEffect(() => {
        const getSelectOptions = async () => {
            const response = await clientSideExternalApiRequest("/ref?json", { method: "GET" });
            setRefResponse(response);
            console.log(response);
        };
        getSelectOptions();
    }, []);

    const baseRoute = "/ref";
    const apiUrl = process.env.API_URL;

    const RefList = (ref) => {
        if (ref === undefined) return <></>;

        return (
            <div>
                {Object.entries(ref).map(([sectionKey, sectionValue]) => (
                    <div key={sectionKey}>
                        <h3>{lang[sectionKey]}</h3>

                        <table className={`${styles.ref}`}>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>URL</th>
                                    <th>Description</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Object.entries(sectionValue).map(([childKey, childValue]) => {
                                    return (
                                        <tr key={childKey}>
                                            <td>{childValue.label}</td>
                                            <td>
                                                <a href={`${apiUrl}${baseRoute}${childValue.url}`}>
                                                    {baseRoute}
                                                    {childValue.url}
                                                </a>
                                            </td>
                                            <td>{childValue.description}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
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
            />

            <p className="py-4">
                <strong>
                    <a href={`${process.env.NEXT_PUBLIC_API_URL}/ref`}>
                        <Icon iconName="link" className="font-bold" /> Lien vers le référentiel complet
                    </a>
                </strong>
            </p>

            {RefList(refResponse)}
        </>
    );
};

export default ReferentialHomePage;
