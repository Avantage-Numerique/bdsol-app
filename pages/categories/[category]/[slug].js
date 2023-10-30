import {externalApiRequest} from '@/src/hooks/http-hook';
import PageHeader from "@/layouts/Header/PageHeader";
import React, {useCallback} from "react";
import {lang} from "@/common/Data/GlobalConstants";
import CreateTaxonomyForm from "@/DataTypes/Taxonomy/components/Forms/CreateTaxonomy/CreateTaxonomyForm";
import {useRootModal} from '@/src/hooks/useModal/useRootModal';
import Router, {useRouter} from "next/router";
import Button from "@/FormElements/Button/Button";
import {useAuth} from "@/auth/context/auth-context";
import Icon from "@/common/widgets/Icon/Icon";
import AppRoutes from "@/src/Routing/AppRoutes";
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";
import EntitiesGrid from "@/DataTypes/Entity/layouts/EntitiesGrid";
import Head from "next/head";
import {getTitle} from "@/DataTypes/MetaData/MetaTitle";
import {getType, TYPE_TAXONOMY} from "@/DataTypes/Entity/Types";


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

    if(typeof taxonomy.data._id === 'undefined' || entities.data._id)
        return { notFound: true };
    return { props: {
            taxonomy: taxonomy.data,
            data: entities.data
        } };
}


const TaxonomiesSinglePage = (props) => {
    const category = [
        {label: "Compétence", value: "skills"},
        {label: "Domaine", value: "domains"},
        {label: "Technologie", value: "technologies"},
        {label: lang.equipmentType, value: "equipmentType"}
    ]

    const {data, taxonomy} = props;


    //  NEEDED FOR EDIT THE TAXONOMY >
    const auth = useAuth();
    const router = useRouter();
    const closingModalBaseURI = router.asPath;

    //Extract root modal 
    const { Modal, displayModal, closeModal, modalInitValues } = useRootModal();

    const type = getType(TYPE_TAXONOMY);

    const displayUpdateForm = () => {
        displayModal();
    }
    // < NEEDED FOR EDIT THE TAXONOMY


    // > NEEDED for BREADCRUMBS
    const currentTaxonomy = category.find( el => taxonomy.category === el.value );
    const currentTitle = `${currentTaxonomy.label} ${'&mdash;'} ${taxonomy.name}`;

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
    //  < NEEDED for BREADCRUMBS


    return (
        <div>
            <Head>
                <title>{getTitle([taxonomy.name, currentTaxonomy.label, type.labelPlural])}</title>
            </Head>
            <PageHeader
                bg={"bg-primary-lighter"}
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
                        <Button outline={"light"} color="light" onClick={displayUpdateForm}>
                            <Icon iconName={"edit"} /> {lang.proposeContentChangeLabel}
                        </Button>
                    }
                </p>
            </PageHeader>

            {/*  Show the feed in the EntitiesGrid component. It manages an empty list in it, but it make it more readable to show it here too */}
            <EntitiesGrid className="row row-cols-1 row-cols-sm-2 row-cols-xl-3" columnClass={"col g-3"} feed={data}/>

            <Modal {...props}>
                <header className={`d-flex justify-content-end`}>
                    <Button onClick={() => closeModal()}>Fermer</Button>
                </header>
                <div className={`my-4 border-bottom`}></div>

                <CreateTaxonomyForm
                    {...props}
                    uri="update"
                    name={taxonomy.name ?? ''}   //Prefilled value
                    initValues={ taxonomy ?? {} }
                    category={props.requestData?.category}
                    onPositiveResponse={(requestResponse) => {
                        Router.push(`/categories/${requestResponse.data.category}/${requestResponse.data.slug}`);
                        closeModal();
                    }}
                    
                />
            </Modal>
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


