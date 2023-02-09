import React from 'react' 

import styles from './Single.module.scss'
import Button from "@/FormElements/Button/Button";
import {lang} from "@/common/Data/GlobalConstants";
import EntityNavBar from "@/DataTypes/common/layouts/Navigation/EntityNavBar";
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";
import {useModal} from "@/src/hooks/useModal/useModal";


/*
    Receive and apply all the rules of a single view for entities
*/
const Single = (props) => {

    const {
        headerMainContent,
        children,
        aside,
        modalComponent
    } = props;

    const entity = props?.entity ?? {};
    const headerBgImage = entity.headerBG ?? "/general_images/forestBG.jpg";
    const mainImage = entity.mainImage && entity.mainImage !== "" ? entity.mainImage : {};
    const mainImageUrl = entity.mainImage?.url ?? "/general_images/Dennis_Nedry.webp";
    const mainImageAlt= entity.mainImage?.alt ?? "main image alt";

    const showCTA = props?.showCTA ?? false;
    const cta = props?.cta ?? "Entrez en contact avec l'auteur";
    const ctaLabel = props?.ctaLabel ?? lang.ctaLabel;

    const showAside = aside ?? false;
    const asideColWidthLg = 4;
    const mainCOntentColWidthLg = (12-asideColWidthLg);
    const asideColWidthSm = 6;
    const mainCOntentColWidthSm = (12-asideColWidthSm);
    const mainContentClass = showAside ? `col-${mainCOntentColWidthSm} col-lg-${mainCOntentColWidthLg}` : "";
    const asideClass = `col-auto col-lg-${asideColWidthLg}`;

    return (
        <article className={`${styles.single}`}>
            <header className={`${styles["single__header"]}`}>

                {/* Background image */}
                <figure className={`${styles["single__bg-img"]}`}>
                    <img className={`${styles["single__bg-img__img"]}`} src={headerBgImage} alt=""/>
                    <div className={`dark-transparent-gradient`}></div>
                </figure>

                <EntityNavBar
                    entity={entity}
                    containerClass={`${styles["single__top-menu"]}`}
                    modalComponent={modalComponent}
                />

                {/* Header's content */}
                <section className={`${styles["single__header__content"]}`}>
                    <div className={`container ${styles["single-header-content__main-section"]}`}>
                        <div className={'row'}>
                            <div className={"col-6 col-lg-8"}>
                                {headerMainContent &&
                                    headerMainContent
                                }
                            </div>
                            {showCTA &&
                                <aside className={"col-auto col-lg-4"}>
                                    <div>
                                        <p>{cta}</p>
                                        <Button small>{ctaLabel}</Button>
                                    </div>
                                </aside>
                            }
                        </div>
                    </div>

                    {/* Profile picture section */}
                    <div className={`${styles["single-header-content__bottom-row"]}`}>
                        <figure className={`${styles["headers-content__profil-picture"]}`}>
                            {mainImage &&
                                <img src={mainImageUrl} alt={mainImageAlt} />
                            }
                        </figure>
                    </div>

                </section>

            </header>

            {/*MAIN SECTION*/}
            <section className={`${styles["single__main-section"]}`}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={mainContentClass}>
                            {children}
                        </div>
                        {aside &&
                            <aside className={asideClass}>
                                {aside}
                            </aside>
                        }
                    </div>
                </div>
            </section>

        </article>
    )
}

export default Single