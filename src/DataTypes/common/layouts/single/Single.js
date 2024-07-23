import React, {useCallback} from 'react'

import styles from './Single.module.scss';
import Button from "@/FormElements/Button/Button";
import {lang} from "@/common/Data/GlobalConstants";
import EntityNavBar from "@/DataTypes/common/layouts/Navigation/EntityNavBar";
import {useAuth} from "@/auth/context/auth-context";
import Icon from "@/common/widgets/Icon/Icon";
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";

/**
 * Receive and apply all the rules of a single view for entities
 * @param props.headerMainContent {React.Component} Ajoute le header
 * @param props.children {React.Component}
 * @param props.aside {React.Component}
 * @param props.ModalForm {React.Component}
 * @param props.modalParams {React.Component}
 * @param props.modalMainImageControl {modalControl}
 * @param props.showUpdateMenu {boolean}
 * @param props.breadcrumbParams {boolean}
 * @param props.route {object} The URL object advance to manage some things about it.
 * @return {JSX.Element}
 * @constructor
 */
const Single = (props) => {

    const {
        headerMainContent,
        children,
        aside,
        ModalForm,
        modalParams,
        modalMainImageControl,//Controlling the Image modal from outside single->entityNavBar.
        showUpdateMenu,
        breadcrumbParams,
        route
    } = props;

    const defaultMainImage = props.defaultMainImage ?? "/general_images/person-default.webp";
    const defaultHeaderBg = props.defaultHeaderBg ?? "/general_images/forestBG.jpg";

    const entity = props?.entity ?? {};

    const headerBgImage = entity.headerBG ?? defaultHeaderBg;

    const haveMainImage = entity.mainImage !== undefined && entity.mainImage !== "";
    const mainImage = haveMainImage && entity.mainImage !== "" ? entity.mainImage : {};
    const mainImageRootUrl = haveMainImage ? process.env.NEXT_PUBLIC_API_URL : "";//we dont add api path if it's local.
    const mainImageUrl = entity.mainImage?.url ?? defaultMainImage;
    const mainImageAlt = entity.mainImage?.alt ?? "main image alt";
    const mainImageClass = props.mainImageClass ?? "headers-content__main-image";
    const mainImageAdditionalClass = props.mainImageAdditionnalClass ?? "";
    const showMainImageInHeader = props.showMainImageInHeader ?? true;

    const showCTA = props?.showCTA ?? false;
    const cta = props?.cta ?? "Entrez en contact avec l'auteur";
    const ctaLabel = props?.ctaLabel ?? lang.ctaLabel;
    const ctaUrl = props?.ctaUrl ?? "";

    const showAside = aside ?? false;
    const asideColWidthLg = 4;

    const mainContentColWidthLg = (12 - asideColWidthLg);
    const asideColWidthSm = 6;
    const mainContentColWidthSm = (12 - asideColWidthSm);
    const mainContentClass = showAside ? `col-${mainContentColWidthSm} col-lg-${mainContentColWidthLg}` : "";
    const mainContentContainerClass = showMainImageInHeader ? "single__main-section-with-profile-picture" : "single__main-section";
    const asideClass = `col-auto col-lg-${asideColWidthLg}`;

    const showMenu = showUpdateMenu !== undefined ? showUpdateMenu : true;

    const auth = useAuth();


    const getLabelGenerator = breadcrumbParams.labelGenerator ?? useCallback((param, query) => {
        return {
            "slug": () => breadcrumbParams.title ?? "Error : Add a title name to the breadcrumb.",
            "personnes": "Personnes",
            "organisations": "Organisations",
            "medias": "Médias",
        }[param];
    }, []);

    return (
        <article className={`single ${styles.single}`}>

            <EntityNavBar
                entity={entity}
                containerClass={`${styles["single__top-menu"]}`}
                ModalForm={ModalForm}
                modalParams={modalParams}
                modalMainImageControl={modalMainImageControl}
                showUpdateMenu={showMenu}
            />

            <Breadcrumbs route={route} getLabelGenerator={getLabelGenerator} getHrefGenerator={breadcrumbParams.hrefGenerator} />

            <div className={`${styles['bg-single']}`}>
                <header className={`${styles["single__header"]}`}>

                    {/* Background image */}
                    <figure className={`${styles["single__bg-img"]}`}>
                        <img className={`${styles["single__bg-img__img"]}`} src={headerBgImage} alt=""/>
                        <div className={`dark-transparent-gradient`}></div>
                    </figure>

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
                                        <div className={"d-flex flex-column"}>
                                            { cta && cta !== "" && <p>{cta}</p> }
                                            <Button href={ctaUrl} className={"btn-block"} external>{ctaLabel}&nbsp;<Icon
                                                iconName={"external-link-alt"}/></Button>
                                        </div>
                                    </aside>
                                }
                            </div>
                        </div>


                        {/* Profile picture section */}
                        {
                            showMainImageInHeader &&
                            <div className={`${styles["single-header-content__bottom-container"]}`}>
                                <div
                                    className={`${styles["single-header-content__bottom-row"]} d-flex flex-row justify-content-start`}>
                                    <figure className={`${styles[mainImageClass]} ${styles[mainImageAdditionalClass]}`}>
                                        {haveMainImage &&
                                            <a href={`/medias/${entity.mainImage._id}`}
                                               className={`fs-4 w-100 h-100 position-absolute d-flex align-items-center justify-content-center p-1 ${styles["profile-picture--modification-opt"]}`}>
                                                Afficher
                                            </a>
                                        }
                                        {mainImage &&
                                            <img src={mainImageRootUrl + mainImageUrl} alt={mainImageAlt}/>
                                        }
                                    </figure>
                                    {auth.user.isLoggedIn &&    //mainImage Menu.
                                        <div className={`${styles["single-header-content__nav"]}`}>
                                            <a href={"#"} onClick={modalMainImageControl.displayModal}
                                               className={` ${styles["profile-picture--modification-opt"]}`}>
                                                <img src={"/icones/edit-icon.svg"}
                                                     alt={"Changer l'image"}/> {haveMainImage ? lang.updateImage : lang.addImage}
                                            </a>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </section>

                </header>

                {/*MAIN SECTION*/}
                <section className={`${styles[mainContentContainerClass]} ${styles['bg-single']}`}>
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
            </div>
        </article>
    )
}

export default Single;