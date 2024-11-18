//React
import React, {useEffect, useState} from "react"
import {useRouter} from "next/router";
import {clientSideExternalApiRequest} from "@/src/hooks/http-hook";
import PageHeader from "@/layouts/Header/PageHeader";
import EntitiesGrid from "@/src/DataTypes/Entity/layouts/EntitiesGrid";
import Button from "@/src/common/FormElements/Button/Button";
import Icon from "@/src/common/widgets/Icon/Icon";
import {lang} from "@/src/common/Data/GlobalConstants";
import {getBadgesInfo} from "@/src/DataTypes/Badges/BadgesSection";
import useWebStats from "@/src/monitoring/hooks/useWebStats";

const SearchResults = (props) => {

    const [searchList, setSearchList] = useState([]);
    const router = useRouter();
    const [searchMessage, setSearchMessage] = useState("");
    const [filter, setFilter] = useState([])
    const [nearTaxonomyObject, setNearestTaxonomyObject] = useState(undefined)

    const webStats = useWebStats();
    const updateFilterState = (filterType) => {
        if(filterType === "all")
            setFilter([]);
        else {
            const filterState = [...filter]
            //If already in array remove it else push in front
            if(filterState.includes(filterType))
                setFilter(filterState.filter( (el) => { return el !== filterType}));
            else {
                filterState.unshift(filterType);
                setFilter(filterState)
            }
        }
    }

    useEffect(() => {
        async function searchRequest() {

            let response = [];
            const searchIndex = router.query.searchIndex;
            if(searchIndex){
                response = await getResultsRouteResponse(searchIndex);
                const nearTaxonomy = await getNearestTaxonomyToSearchIndex(searchIndex);
                setNearestTaxonomyObject(nearTaxonomy.data);
                setSearchMessage("par texte");

                const totalSearchRequestResults = response.data?.length ?? 0;
                webStats.push(['trackSiteSearch', searchIndex, (nearTaxonomy?.nearestTaxonomy?.name ?? undefined), totalSearchRequestResults]);
            }
            
            if(router.query.linkId){
                response = await getIdRouteResponse(router.query.linkId);
                setSearchMessage("par taxonomies");
            }

            if(router.query.entityType){
                response = await getEntityTypeResponse(router.query.entityType);
                setSearchMessage("par type d'entité");
            }

            setSearchList(response.data);
        }
        searchRequest();
    }, [router.asPath])

    const getResultsRouteResponse = (searchIndex) => {
        return clientSideExternalApiRequest("/search/?searchIndex="+searchIndex, { method: 'GET'});
    }

    const getIdRouteResponse = (linkId) => {
        return clientSideExternalApiRequest("/search/"+linkId, { method: 'GET'});
    }

    const getEntityTypeResponse = (entityType) => {
        return clientSideExternalApiRequest("/"+entityType+"/list",
            {
                method: 'POST',
                body: JSON.stringify({"data": {}}),
                isBodyJson: true
            }
        )
    }

    const getNearestTaxonomyToSearchIndex = (searchIndex) => {
        return clientSideExternalApiRequest("/search/nearestTaxonomy?searchIndex="+searchIndex, { method: 'GET'});
    }

    const researchResult = (entityType, includeEntitySuggestedByTaxonomy=false) => {
        if(entityType === "linkedTaxonomy")
            return linkedEntityToTaxonomyComponent();

        const resultMessage = entityType ? "Résultats pour " + lang[entityType] + ":" : "Résultats de recherche :";
        let filteredList = searchList ? [...searchList] : [];
        if(entityType) {
            //If include entitySuggested add them to the list
            if(includeEntitySuggestedByTaxonomy){
                filteredList.push(...nearTaxonomyObject.linkedEntityToNearestTaxonomy);
            }
            filteredList = filteredList.filter( (el) => { return el.type === entityType })
        }
        const searchCount = filteredList?.length;


        return (
            <div className="py-4">
                <h3>{resultMessage}</h3>
                {
                    searchCount > 0 ?
                    <EntitiesGrid
                        className={"row"}
                        feed={filteredList.filter(el => el.type !== "Taxonomy")}
                        badgesInfo={props.badgesInfo}
                        columnClass={"col-12 col-sm-6 col-lg-4 g-4 "}
                    ></EntitiesGrid>
                    :
                    <div>Aucune entité trouvée, réessayer avec d'autre critère de recherche</div>
                }
            </div>
        )
    }
    
    const linkedEntityToTaxonomyComponent = () => {
        return (
            <div className="py-4">
                {
                    nearTaxonomyObject?.nearestTaxonomy ?
                        <h3>Entité reliée à la catégorie :
                            {
                                <a href={`/categories/${nearTaxonomyObject?.nearestTaxonomy?.category}/${nearTaxonomyObject?.nearestTaxonomy?.slug}`}>
                                    &nbsp;{nearTaxonomyObject?.nearestTaxonomy?.name}
                                </a>}
                        </h3>
                    :
                    <h3>Aucune suggestion de catégorie pour la recherche "{router.query.searchIndex}"</h3>
                }
                {
                    nearTaxonomyObject?.linkedEntityToNearestTaxonomy.length > 0 ?
                        <EntitiesGrid className={"row"} feed={nearTaxonomyObject.linkedEntityToNearestTaxonomy} badgesInfo={props.badgesInfo}></EntitiesGrid>
                        :
                        <p>Aucune entité est liée à cette catégorie</p>
                }
            </div>
        )
    }

    return (
        <div>
            <PageHeader
                bg={"bg-primary-light"}
                textColor={"text-white"}
                htmlTitle={"Résultats de recherche pour : \"" + router.query.searchIndex + "\""}
                description=""
            >
            </PageHeader>
            <section className="bg-greyBg" style={{ width:"100vw", marginLeft:"calc(50% - 50vw)"}}>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12">
                            <h3><Icon iconName="filter"/>Filtrer par type de données</h3>
                            <div style={{gap: "1rem"}} className="d-flex flex-wrap justify-content-center">
                                <Button
                                    className="mx-2 rounded flex-grow-1"
                                    color={filter.includes("linkedTaxonomy") ? "secondary" : null}
                                    outline={filter.includes("linkedTaxonomy") ? null : "secondary"}
                                    text_color_over="dark"
                                    onClick={() => updateFilterState("linkedTaxonomy")}
                                    id="filter-btn-linkedTaxonomy"
                                >
                                    {"Entités liées suggérées (" + (nearTaxonomyObject?.linkedEntityToNearestTaxonomy?.length.toString() ?? "0") + ")"}
                                </Button>
                                <Button
                                    className="mx-2 rounded flex-grow-1"
                                    color={filter.length === 0 ? "secondary" : null}
                                    outline={filter.length === 0 ? null : "secondary"}
                                    text_color_over="dark"
                                    onClick={() => updateFilterState("all")}
                                    id="filter-btn-all"
                                >
                                    {"Tous les types (" + ((nearTaxonomyObject?.linkedEntityToNearestTaxonomy?.length || 0) + (searchList.filter(elem => elem.type !== "Taxonomy").length || 0)) + ")"}
                                </Button>
                                <Button className="mx-2 rounded flex-grow-1"
                                        color={filter.includes("Person") ? "secondary" : null}
                                        outline={filter.includes("Person") ? null : "secondary"}
                                        text_color_over="dark"
                                        onClick={() => updateFilterState("Person")}
                                        id="filter-btn-person"
                                >
                                    {"Personnes (" + (searchList.filter((el) => {
                                        return el.type === "Person"
                                    }).length.toString() ?? "0") + ")"}
                                </Button>
                                <Button className="mx-2 rounded flex-grow-1"
                                        color={filter.includes("Organisation") ? "secondary" : null}
                                        outline={filter.includes("Organisation") ? null : "secondary"}
                                        text_color_over="dark"
                                        onClick={() => updateFilterState("Organisation")}
                                        id="filter-btn-organisation"
                                >
                                    {"Organisations (" + (searchList.filter((el) => {
                                        return el.type === "Organisation"
                                    }).length.toString() ?? "0") + ")"}
                                </Button>
                                <Button className="mx-2 rounded flex-grow-1"
                                        color={filter.includes("Project") ? "secondary" : null}
                                        outline={filter.includes("Project") ? null : "secondary"}
                                        text_color_over="dark"
                                        onClick={() => updateFilterState("Project")}
                                        id="filter-btn-project"
                                >
                                    {"Projets (" + (searchList.filter((el) => {
                                        return el.type === "Project"
                                    }).length.toString() ?? "0") + ")"}
                                </Button>
                                <Button className="mx-2 rounded flex-grow-1"
                                        color={filter.includes("Event") ? "secondary" : null}
                                        outline={filter.includes("Event") ? null : "secondary"}
                                        text_color_over="dark"
                                        onClick={() => updateFilterState("Event")}
                                        id="filter-btn-event"
                                >
                                    {"Événements (" + (searchList.filter((el) => {
                                        return el.type === "Event"
                                    }).length.toString() ?? "0") + ")"}
                                </Button>
                                <Button className="mx-2 rounded flex-grow-1"
                                        color={filter.includes("Equipment") ? "secondary" : null}
                                        outline={filter.includes("Equipment") ? null : "secondary"}
                                        text_color_over="dark"
                                        onClick={() => updateFilterState("Equipment")}
                                        id="filter-btn-equipment"
                                >
                                    {"Équipement (" + (searchList.filter((el) => {
                                        return el.type === "Equipment"
                                    }).length.toString() ?? "0") + ")"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="row py-4">

            <div className="col-12 col-md-3 py-4">
                    <div>
                        {
                            nearTaxonomyObject?.otherNearbyTaxonomy?.length > 0 &&
                            <>
                                <h4>Vous cherchiez peut-être :</h4>
                                <ul>
                                    { nearTaxonomyObject.otherNearbyTaxonomy.slice(0,8).map( (nearTaxo, index) => {
                                        return (
                                            <li key={index+"nearTaxoList-"+nearTaxo._id}>
                                                <a href={`/categories/${nearTaxo?.category}/${nearTaxo?.slug}`}>{nearTaxo.name}</a>
                                            </li>)
                                    })}
                                </ul>
                            </>
                        }
                    </div>
                </div>

                <div className="row col-12 col-md-9">
                    {/* If filter set to all results */}
                    {
                        filter.length === 0 ?
                        <div>
                            {linkedEntityToTaxonomyComponent()}
                            {researchResult()}
                        </div>
                        :
                        <div>
                            {/* else show linkedTaxonomy or result by type */}
                            { filter.map( (el) => { return <div key={el}>{researchResult(el, true)}</div> }) }                         
                        </div>
                    }

                </div>
            </div>
            
        </div>
    )
}

//Load badges Info
export async function getServerSideProps() {
    const badgeInfo = await getBadgesInfo(true);
    return {
        props: {
            badgesInfo : badgeInfo
        }
    }
}

export default SearchResults