import PageMeta from "@/src/common/PageMeta/PageMeta";
import PageHeader from "@/src/layouts/Header/PageHeader";
import { useEffect, useState } from "react";
import { clientSideExternalApiRequest } from "@/src/hooks/http-hook";
import Icon from "@/src/common/widgets/Icon/Icon";
import { lang } from "@/src/common/Data/GlobalConstants";

import styles from "./referentiel.module.scss";

const CompatibilityHomePage = () => {
    /**
     * @type {[import('../../../api/src/Referential/Data/types').RefData, (RefData) => void]}
     */
    const [refResponse, setRefResponse] = useState(undefined);

    useEffect(() => {
        const getSelectOptions = async () => {
            const response = await clientSideExternalApiRequest("/compatibility?json", { method: "GET" });
            setRefResponse(response);
        };
        getSelectOptions();
    }, []);

    const baseRoute = "/compatibility";
    const apiUrl = process.env.API_URL;

    const ontologyTable = (ref) => {
        if (ref === undefined || ref.ontologiesMetaData === undefined) return <></>;

        return (
            <div>
                <h3>Ontologies supportées</h3>

                <table className={`${styles.ref}`}>
                    <thead>
                        <tr>
                            <th>Voir la compatibilité avec AVNU</th>
                            <th>Description</th>
                            <th>Documentation externe</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(ref.ontologiesMetaData).map(([ontology, ontologyMetaData]) => (
                            <tr key={ontology}>
                                <td>
                                    <a href={`${apiUrl}${baseRoute}#${ontology}`}>{ontologyMetaData.label}</a>
                                </td>
                                <td>{ontologyMetaData.description}</td>
                                <td>
                                    <a href={ontologyMetaData.referentialUrl} target="_blank" rel="noopener noreferrer">
                                        {ontologyMetaData.referentialUrl}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <>
            <PageMeta title={"Compatibilité"} description={"Compatibilité d'Avnu avec les ontologies externes"} />

            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                htmlTitle={"Compatibilité d'AVNU"}
                subTitle={
                    "Bienvenue dans une zone de geek. Vous y retrouverez des liens vers les contrées obscures de la compatibilité de la base de données d'AVNU avec des ontologies externes !"
                }
            />

            <p className="py-4">
                <a href={`${process.env.NEXT_PUBLIC_API_URL}/compatibility`} className="external-link fw-bold">
                    <Icon iconName="link" className="font-bold" /> Lien vers l&apos;accueil de la compatibilité
                    ontologique d&apos;AVNU
                </a>
            </p>

            {ontologyTable(refResponse)}
        </>
    );
};

export default CompatibilityHomePage;
