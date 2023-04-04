import { externalApiRequest } from '@/src/hooks/http-hook';
import PersonSimple from '@/DataTypes/Person/Components/layouts/simple/PersonSimple'
import OrganisationSimple from '@/DataTypes/Organisation/components/layouts/simple/OrganisationSimple'
import PageHeader from "@/layouts/Header/PageHeader";
import React, {useCallback} from "react";
import {lang} from "@/common/Data/GlobalConstants";
import CreateTaxonomyForm from "@/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm";
import {useModal} from "@/src/hooks/useModal/useModal";
import Router, {useRouter} from "next/router";
import Button from "@/FormElements/Button/Button";
import {useAuth} from "@/auth/context/auth-context";
import Icon from "@/common/widgets/Icon/Icon";
import AppRoutes from "@/src/Routing/AppRoutes";
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";


export async function getServerSideProps(context) {
    const { slug, category } = context.params;

    const entities = await externalApiRequest(
        `/search/${category}/${slug}`,
        {
            method: 'GET',
        });

    const taxonomy = await externalApiRequest(
        `/taxonomies/${category}/${slug}`,
        {
            method: 'GET',
        });
    return { props: {
            taxonomy: taxonomy.data,
            data: entities.data
        } };
}


const TaxonomiesSinglePage = (props) => {

    const category = [
        {label: "Compétence", value: "skills"},
        {label: "Domaine", value: "domains"},
        {label: "Aptitude", value: "abilities", disabled: true},
        {label: "Occupation", value: "occupations", disabled: true},
        {label: "Technologie", value: "technologies"}
    ]

    const {data, taxonomy} = props;


    //  NEEDED FOR EDIT THE TAXONOMY >
    const auth = useAuth();
    const router = useRouter();
    const closingModalBaseURI = router.asPath;
    const {displayModal, modal, closeModal, Modal} = useModal();

    const ModalComponent = CreateTaxonomyForm;
    const modalComponentParams = {
        uri:"update"
    };

    const redirectOnClosingHandler = (requestResponse, closingCallback, targetSlug) => {
        let redirectUrl = "";

        if (closingModalBaseURI !== undefined) {    //Add the baseURI
            redirectUrl += `${closingModalBaseURI}`;
        }

        if (targetSlug !== undefined) {             //Add the slug if it's set
            redirectUrl += `${targetSlug}`;
        }

        if (redirectUrl !== "") {
            Router.push(`${redirectUrl}`);
            closingCallback();
        } else {
            throw(new Error("Un problème est survenu."));
        }
    }

    const displayUpdateForm = () => {
        displayModal();
    }
    // < NEEDED FOR EDIT THE TAXONOMY

    const currentTaxonomy = category.find( el => taxonomy.category === el.value );
    const currentTitle = currentTaxonomy.label + " &mdash; " + taxonomy.name;

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "categories": "Toutes les catégories",
            "category": currentTitle
        }[param];
    }, []);

    const getHrefGenerator = useCallback(() => {
        return {
            "categories": "categories"
        };
    }, []);

    const gridComponents = new Map();
    gridComponents.set("person", PersonSimple);
    gridComponents.set("organisation", OrganisationSimple);

    return (
        <div>
            <PageHeader
                bg={"bg-purplelighter"}
                textColor={"text-white"}
                htmlTitle={currentTitle}
                tags={{
                    list:taxonomy.domains,
                    listProperty: "domain"
                }}
                description={taxonomy.description}
            >
                <Breadcrumbs className={"pt-2"} route={AppRoutes.categorySingle} getLabelGenerator={getLabelGenerator} hrefGenerator={getHrefGenerator} />

                <p className={"pt-2"}>
                    {auth.user.isLoggedIn &&
                        <Button outline color="primary" onClick={displayUpdateForm}>
                            <Icon iconName={"edit"} /> {lang.proposeContentChangeLabel}
                        </Button>
                    }
                </p>
            </PageHeader>
            <div className="row home-page__feed-section--container row-cols-1 row-cols-sm-2 row-cols-xl-3">
                {
                    data?.length > 0 ?
                    data.map((elem, index) => {
                        let TargetSimpleComponent = gridComponents.get(elem.type);
                        TargetSimpleComponent = TargetSimpleComponent ?? OrganisationSimple;
                        return (
                            <div className="col g-3" key={"container"+elem.type+elem._id + "-" + elem.slug+index}>
                                <TargetSimpleComponent data={elem} key={"simple"+elem.type+elem._id + "-" + elem.slug+index} />
                            </div>
                        )
                    })
                    :
                    <h5 className={"py-4"}>{lang.noResult}</h5>
                }
            </div>
            {
                modal.display &&
                <Modal
                    className={`taxonomy-form-modal`}
                    coloredBackground
                    darkColorButton
                    closingFunction={closeModal}
                >
                    <ModalComponent
                        initValues={taxonomy}
                        positiveRequestActions={{
                            callbackFunction: requestResponse => {  //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                                redirectOnClosingHandler(requestResponse, closeModal);
                            }
                        }}
                        {...modalComponentParams}
                    />
                </Modal>
            }
        </div>
    )
}
export default TaxonomiesSinglePage;


//  L'APP a besoin de la BD Pour construire les paths.
/*export async function getStaticPaths() {

    const taxonomies = await externalApiRequest(
        `/taxonomies/list`,
        {
            method: 'GET',
        });

    if (taxonomies.data.length > 0) {

        const paths = taxonomies.data.map((tax) => {
            return {
                params: {
                    category: tax.category,
                    slug: tax.slug,
                },
            };
        });

        return {
            paths: paths,
            fallback: false
        }
    }

    return {
        paths: [],
        fallback: false
    }
}*/


