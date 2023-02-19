import { externalApiRequest } from '@/src/hooks/http-hook';
import PersonSimple from '@/DataTypes/Person/Components/layouts/simple/PersonSimple'
import OrganisationSimple from '@/DataTypes/Organisation/components/layouts/simple/OrganisationSimple'


const TaxonomiesSinglePage = (props) => {
    //console.log("Router.query", window.location.pathname.split("/").pop())

    const gridComponenents = new Map();
    gridComponenents.set("person", PersonSimple);
    gridComponenents.set("organisation", OrganisationSimple);

    return (
        <div>
            <a href='/taxonomies'>Retour à la liste des taxonomies</a>
            <div className="row home-page__feed-section--container row-cols-1 row-cols-sm-2 row-cols-xl-3">

                {
                    props.data?.length > 0 ?
                    props.data.map((elem, index) => {
                        let TargetSimpleComponent = gridComponenents.get(elem.type);
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

//export const getServerSideProps = withSessionSsr(getEntitiesLinkedWithTaxonomy);

export async function getServerSideProps(context) {
    const { slug, category } = context.query;

    const response = await externalApiRequest(
        `/search/${category}/${slug}`,
        {
            method: 'GET',
        });

    return { props: {data:response.data} };
}

