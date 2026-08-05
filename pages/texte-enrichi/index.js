import React from "react";

//Context
import PageHeader from "@/layouts/Header/PageHeader";
import PageMeta from "@/src/common/PageMeta/PageMeta";

import styles from "./texte-enrichi.module.scss";

// Éditeurs
import Ckeditor5ClientSide from "./editeurs/ckeditor5-client";
import Tiptap from "./editeurs/tiptap";

/**
 * Really basic page with plain text. This could be dry with an entry or some sort of markdown file.
 * @return {JSX.Element}
 * @constructor
 */
const Index = () => {
    return (
        <div id="texte-enrichi" className={`${styles["texte-enrichi"]}`}>
            <PageMeta title="Test éditeur de texte enrichi" description="À la recherche de la perle rare!" />

            <PageHeader title="Test éditeur de texte enrichi" />

            <div className={"container home-page__main content"}>
                <div className={"row py-4"}>
                    <div className={"col"}>
                        <Ckeditor5ClientSide />

                        <Tiptap />
                    </div>
                </div>
            </div>
            {/* end container */}
        </div>
    );
};

export default Index;
