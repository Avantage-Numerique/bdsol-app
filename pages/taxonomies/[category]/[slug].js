import { externalApiRequest } from '@/src/hooks/http-hook';
import PresentationCard from '@/src/common/Containers/cards/presentationCard';


const TaxonomiesSinglePage = (props) => {
    //console.log("Router.query", window.location.pathname.split("/").pop())

    return (
        <div>
            <a href='/taxonomies'>Retour à la liste des taxonomies</a>
            <div>
                {
                    props.data.length == 0 ?
                    <div>Not found</div>
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
                    })
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

