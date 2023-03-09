import React from 'react' 

import styles from './Single.module.scss'
import Button from "@/FormElements/Button/Button";
import {lang} from "@/common/Data/GlobalConstants";
import EntityNavBar from "@/DataTypes/common/layouts/Navigation/EntityNavBar";
import {useAuth} from "@/auth/context/auth-context";

/*
    Receive and apply all the rules of a single view for entities
*/
const Single = (props) => {

    const {
        headerMainContent,
        children,
        aside,
        ModalForm,
        modalParams,
        modalMainImageControl,//Controlling the Image modal from outside single->entityNavBar.
        showUpdateMenu
    } = props;

    console.log("Single rendered")


    const defaultMainImage = props.defaultMainImage ?? "/general_images/Dennis_Nedry.webp";
    const defaultHeaderBg = props.defaultHeaderBg ?? "/general_images/forestBG.jpg";

    const entity = props?.entity ?? {};

    const headerBgImage = entity.headerBG ?? defaultHeaderBg;

    const haveMainImage = entity.mainImage !== undefined && entity.mainImage !== "";
    const mainImage = haveMainImage && entity.mainImage !== "" ? entity.mainImage : {};
    const mainImageRootUrl = haveMainImage ? process.env.NEXT_PUBLIC_API_URL : "";//we dont add api path if it's local.
    const mainImageUrl = entity.mainImage?.url ?? defaultMainImage;
    const mainImageAlt= entity.mainImage?.alt ?? "main image alt";
    const mainImageClass = props.mainImageClass ?? "headers-content__main-image";
    const mainImageAdditionalClass = props.mainImageAdditionnalClass ?? "";
    const showMainImageInHeader = props.showMainImageInHeader ?? true;

    const showCTA = props?.showCTA ?? false;
    const cta = props?.cta ?? "Entrez en contact avec l'auteur";
    const ctaLabel = props?.ctaLabel ?? lang.ctaLabel;
    const ctaUrl = props?.ctaUrl ?? "";

    const showAside = aside ?? false;
    const asideColWidthLg = 4;

    const mainContentColWidthLg = (12-asideColWidthLg);
    const asideColWidthSm = 6;
    const mainContentColWidthSm = (12-asideColWidthSm);
    const mainContentClass = showAside ? `col-${mainContentColWidthSm} col-lg-${mainContentColWidthLg}` : "";
    const mainContentContainerClass = showMainImageInHeader ? "single__main-section-with-profile-picture" : "single__main-section";
    const asideClass = `col-auto col-lg-${asideColWidthLg}`;

    const showMenu = showUpdateMenu !== undefined ? showUpdateMenu : true;

    const auth = useAuth();

    return (
        <article className={`single ${styles.single}`}>
            <header className={`${styles["single__header"]}`}>

                {/* Background image */}
                <figure className={`${styles["single__bg-img"]}`}>
                    <img className={`${styles["single__bg-img__img"]}`} src={headerBgImage} alt=""/>
                    <div className={`dark-transparent-gradient`}></div>
                </figure>

                <EntityNavBar
                    entity={entity}
                    containerClass={`${styles["single__top-menu"]}`}
                    ModalForm={ModalForm}
                    modalParams={modalParams}
                    modalMainImageControl={modalMainImageControl}
                    showUpdateMenu={showMenu}
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
                                    <div className={"d-flex flex-column"}>
                                        <p>{cta}</p>
                                        <Button href={ctaUrl} className={"btn-block"} external>{ctaLabel}</Button>
                                    </div>
                                </aside>
                            }
                        </div>
                    </div>


                    {/* Profile picture section */}
                    {
                        showMainImageInHeader &&
                        <div className={`${styles["single-header-content__bottom-container"]}`}>
                            <div className={`${styles["single-header-content__bottom-row"]} d-flex flex-row justify-content-start`}>
                                <figure className={`${styles[mainImageClass]} ${styles[mainImageAdditionalClass]}`}>
                                    { haveMainImage &&
                                        <a href={`/medias/${entity.mainImage._id}`} className={`fs-4 w-100 h-100 position-absolute d-flex align-items-center justify-content-center p-1 ${styles["profile-picture--modification-opt"]}`}>
                                            Afficher
                                        </a>
                                    }
                                    {mainImage &&
                                        <img src={mainImageRootUrl+mainImageUrl} alt={mainImageAlt} />
                                    }
                                </figure>
                                {auth.user.isLoggedIn &&    //mainImage Menu.
                                    <div className={`${styles["single-header-content__nav"]}`}>
                                        <a href={"#"} onClick={modalMainImageControl.displayModal} className={` ${styles["profile-picture--modification-opt"]}`}>
                                            <img src={"/icones/edit-icon.svg"} alt={"Changer l'image"}/>  {haveMainImage ? lang.updateImage : lang.addImage}
                                        </a>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </section>

            </header>

            {/*MAIN SECTION*/}
            <section className={`${styles[mainContentContainerClass]}`}>
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