import {useCallback, useState} from "react";
import Link from 'next/link';

//Components
import PageHeader from "@/src/layouts/Header/PageHeader";
import Button from "@/src/common/FormElements/Button/Button";
import Icon from "@/src/common/widgets/Icon/Icon"

//Utils
import { Breadcrumbs } from "@/src/common/Breadcrumbs/Breadcrumbs";
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
    const isActive = index == activeSubjectIndex;

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

    return (
        <>
            <PageHeader
                bg={"bg-purplelighter"}
                textColor={"text-white"}
                title={"FAQ"}
            >
                <Breadcrumbs className={"pt-2"} route={AppRoutes.faq} getLabelGenerator={getLabelGenerator} />
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
                                link: "/faq/licences",
                                tag: "faq-licence-definition"
                            },
                            {
                                name: "Licences supportées par la BDSOL",
                                link: "/faq/licences",
                                tag: "faq-licences-supportees"                                
                            },
                            {
                                name: "Définition des accronymes utilisés",
                                link: "/faq/licences",
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
                                name: "Qu'est-ce que la BDSOL?",
                                link: "/faq/a-propos",
                                tag: "a-propos"
                            },
                            {
                                name: "À quoi va servir la base de données ?",
                                link: "/faq/a-propos",
                                tag: "a-quoi-va-servir-la-base-de-donnees"
                            },
                            {
                                name: "Qui pourra utiliser la base de données ?",
                                link: "/faq/a-propos",
                                tag: "qui-pourra-utiliser-la-base-de-donnees"
                            },
                            {
                                name: "Utilisation et gouvernance des données",
                                link: "/faq/a-propos",
                                tag: "gouvernance-des-donnees"
                            },
                        ]}
                    />

                </ul>
            </section>
        </>
    );
}

export default FAQ;