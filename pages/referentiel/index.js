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
            <PageMeta
                title={"Référentiel"}
                description={"Référentiel d'Avnu et compatibilité avec d'autres ontologies externe"}
            />

            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                htmlTitle={"Référentiel AVNU"}
                subTitle={
                    "Bienvenue dans la zone de geek. Vous retrouverez des liens vers les contrées obscures du référentiel d'AVNU et de ses compatibilités ontologiques !"
                }
            />

            <p className="py-4">
                <a href={`${process.env.NEXT_PUBLIC_API_URL}/compatibility`} className="external-link fw-bold">
                    <Icon iconName="link" className="font-bold" /> Lien vers l&apos;accueil du référentiel AVNU
                </a>
            </p>

            {ontologyTable(refResponse)}
        </>
    );
};

export default CompatibilityHomePage;
