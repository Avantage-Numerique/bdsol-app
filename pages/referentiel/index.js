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
            <PageMeta title={lang.ref__title} description={lang.ref__description} />

            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                htmlTitle={"Référentiel AVNU"}
                subTitle={
                    "Bienvenue dans la zone de geek. Vous retrouverez des liens vers des contrées obscures de l'ontologie d'Avnu"
                }
            />

            <p className="py-4">
                <a href={`${process.env.NEXT_PUBLIC_API_URL}/ref`} className="external-link fw-bold">
                    <Icon iconName="link" className="font-bold" /> Lien vers l&apos;accueil du référentiel complet
                </a>
            </p>

            {RefList(refResponse)}
        </>
    );
};

export default ReferentialHomePage;
