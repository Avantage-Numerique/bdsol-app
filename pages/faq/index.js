import {useCallback, useState} from "react";
import Link from 'next/link';
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/src/common/Data/GlobalConstants";

//Components
import PageHeader from "@/src/layouts/Header/PageHeader";
import Icon from "@/src/common/widgets/Icon/Icon"

//Utils
import {Breadcrumbs} from "@/src/common/Breadcrumbs/Breadcrumbs";
import AppRoutes from "@/src/Routing/AppRoutes";

//styling
import styles from "./faq.module.scss"

const SubjectRow = props => {

    const {
        index,                  //Index representing this element
        subject,                //Title of the section
        activeSubjectIndex,     //Currently active index in the page
        setActiveSubject,       //function to set this element has the active one
        close,                  //Function to close by setting the state at false
        rows                    //Rows of options with redirection links
    } = props;

    //Variable reloaded for every state change and saying if the current is active of not
    const isActive = index === activeSubjectIndex;

    return (
        <li className={`list-group-item ${styles["pointer"]} ${!isActive && styles["background-hover"]}`}>
            <header 
                onClick={isActive ? close : setActiveSubject} 
                className={`d-flex align-items-center cursor-pointer ${isActive && styles["background-hover"]}`}
            >
                <h5 className="my-2 flex-fill">{subject}</h5>
                <Icon className="fs-3 font-weight-bold mx-2" iconName={`las la-${isActive ? "minus" : "plus"}`}/>
            </header>
            {activeSubjectIndex && isActive &&
                <ul className={`${styles["list-background-odd"]} list-group list-group-flush my-2`}>
                    {
                        rows && rows.map((row, i) => (
                            <Link className={`${styles["pointer"]}`} href={row.tag ? row.link + "#" + row.tag : row.link} key={row.name}>
                                <li className={`${styles["background-hover"]} list-group-item d-flex align-items-center`}>
                                    <p className="flex-fill m-0">{row.name}</p>
                                    <Icon className="fs-3 font-weight-bold" iconName="las la-arrow-right"/>
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            }
        </li>
    )
}

const FAQ = () => {

    //A number for the corresponding subject, or false for every subject closed
    const [activeSubjectIndex, setActiveSubjectIndex] = useState(false);

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "faq": "FAQ",
        }[param];
    }, []);

    const breadcrumbsLabels = {faq:"FAQ"}

    return (
        <>
            <PageMeta 
                title={lang.faq__title}
                description={lang.faq__description}
            />
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                title={"FAQ"}
            >
                <Breadcrumbs className={"pt-2"} route={AppRoutes.faq} labels={breadcrumbsLabels} getLabelGenerator={getLabelGenerator} />
            </PageHeader>
            <section className="my-4">
                <h2 className="my-4">Besoin de plus de précisions sur un sujet ?</h2>
                <ul className="border-top border-bottom m-0 list-group list-group-flush">
                    <SubjectRow 
                        index={1}
                        subject="Les licences"
                        activeSubjectIndex={activeSubjectIndex}
                        setActiveSubject={() => setActiveSubjectIndex(1)}
                        close={() => setActiveSubjectIndex(false)}
                        rows={[
                            {
                                name: "Qu'est-ce qu'une licence?",
                                link: AppRoutes.licences.asPath,
                                tag: "faq-licence-definition"
                            },
                            {
                                name: "Licences supportées par la BDSOL",
                                link: AppRoutes.licences.asPath,
                                tag: "faq-licences-supportees"                                
                            },
                            {
                                name: "Définition des accronymes utilisés",
                                link: AppRoutes.licences.asPath,
                                tag: "faq-licence-accronymes"                                
                            }
                        ]}
                    />
                    <SubjectRow 
                        index={2}
                        subject="À propos de la base de donnée"
                        activeSubjectIndex={activeSubjectIndex}
                        setActiveSubject={() => setActiveSubjectIndex(2)}
                        close={() => setActiveSubjectIndex(false)}
                        rows={[
                            {
                                name: "Avnu, c’est quoi ?",
                                link: AppRoutes.about.asPath,
                                tag: "a-propos"
                            },
                            {
                                name: "À quoi ça sert ?",
                                link: AppRoutes.about.asPath,
                                tag: "a-quoi-ca-sert"
                            },
                            {
                                name: "Utilisation et gouvernance des données",
                                link: AppRoutes.about.asPath,
                                tag: "gouvernance-des-donnees"
                            },
                            {
                                name: "Notre belle équipe",
                                link: AppRoutes.about.asPath,
                                tag: "equipe"
                            },
                        ]}
                    />
                    <SubjectRow
                        index={3}
                        subject="Documents légaux"
                        activeSubjectIndex={activeSubjectIndex}
                        setActiveSubject={() => setActiveSubjectIndex(3)}
                        close={() => setActiveSubjectIndex(false)}
                        rows={[
                            {
                                name: "Charte de valeurs",
                                link: AppRoutes.valuesChart.asPath,
                                tag: ""
                            },
                            {
                                name: "Politique d'utilisation des données",
                                link: AppRoutes.confidentialityPolicy.asPath,
                                tag: ""
                            },
                            {
                                name: "Termes et conditions d'utilisation",
                                link: AppRoutes.termOfUse.asPath,
                                tag: ""
                            },
                        ]}
                    />

                </ul>
            </section>
        </>
    );
}

export default FAQ;