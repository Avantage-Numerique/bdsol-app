import { externalApiRequest } from '@/src/hooks/http-hook';
import PersonSimple from '@/DataTypes/Person/Components/layouts/simple/PersonSimple'
import OrganisationSimple from '@/DataTypes/Organisation/components/layouts/simple/OrganisationSimple'
import PageHeader from "@/layouts/Header/PageHeader";
import React from "react";


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

    const {data, taxonomy} = props;

    const gridComponents = new Map();
    gridComponents.set("person", PersonSimple);
    gridComponents.set("organisation", OrganisationSimple);

    return (
        <div>
            <PageHeader
                bg={"bg-purplelight"}
                textColor={"text-white"}
                htmlTitle={taxonomy.category.capitalize() + " &mdash; " + taxonomy.name}
                subTitle={taxonomy.description}
                description=""
            >
                <p className={"pt-4"}>
                    <a href='/categories' className={"btn btn-outline-light"}>Retour à la liste des taxonomies</a>
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
                    <div>Aucun résultats</div>

                }

                {/*
                    props.data.length == 0 ?
                    <div>f</div>
                    :
                    props.data.map( (entity) => {
                    return (
                        <div className="col col-md-6 col-lg-4 p-2" key={entity._id + "-" + entity.slug}>
                            <PresentationCard
                                key={entity._id}
                                header={entity.type}
                                data={entity}
                                />
                        </div>)
                    })*/
                }
            </div>
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


