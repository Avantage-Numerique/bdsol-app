//React
import React, {useEffect, useState} from "react"
import {useRouter} from "next/router";
import {clientSideExternalApiRequest, externalApiRequest} from "@/src/hooks/http-hook";
import PageHeader from "@/layouts/Header/PageHeader";
import EntitiesGrid from "@/src/DataTypes/Entity/layouts/EntitiesGrid";


const SearchResults = () => {

    const [searchList, setSearchList] = useState([]);
    const router = useRouter();
    const [searchMessage, setSearchMessage] = useState("");
    const [filterType, setFilterType] = useState("all")
    const [nearTaxonomyObject, setNearestTaxonomyObject] = useState(undefined)

    useEffect(() => {
        async function searchRequest() {

            let response = [];
            if(router.query.searchIndex){
                response = await getResultsRouteResponse(router.query.searchIndex);
                const nearTaxonomy = await getNearestTaxonomyToSearchIndex(router.query.searchIndex)
                setNearestTaxonomyObject(nearTaxonomy.data)
                setSearchMessage("par texte")
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
        return clientSideExternalApiRequest("/search/results?searchIndex="+searchIndex, { method: 'GET'});
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

    const researchResult = (entityType) => {
        const resultMessage = entityType ? "Résultats pour " + entityType + ":" : "Résultats de recherche :"
        let filteredList = [...searchList];
        if(entityType) {
            filteredList = filteredList.filter( (el) => { return el.type == entityType })
        }
        
        return (
            <>
                <h3>{resultMessage}</h3>
                {
                    filteredList?.length > 0 ?
                    <EntitiesGrid className={"row"} columnClass={"col g-3"} feed={filteredList}></EntitiesGrid>
                    :
                    <div>Aucune entité trouvée, réessayer avec d'autre critère de recherche</div>
                }
            </>
        )
    }
    const linkedEntityToTaxonomyComponent = () => {
        return (
            <>
                <h3>Entité reliée à la catégorie :
                    { 
                        <a href={`/categories/${nearTaxonomyObject?.nearestTaxonomy.category}/${nearTaxonomyObject?.nearestTaxonomy.slug}`}>
                            &nbsp;{nearTaxonomyObject?.nearestTaxonomy?.name}
                        </a>}
                </h3>
                {
                    nearTaxonomyObject?.nearestTaxonomy &&
                    (
                        <div>
                            {
                                nearTaxonomyObject?.linkedEntityToNearestTaxonomy.length > 0 ?
                                <EntitiesGrid className={"row"} columnClass={"col g-3"} feed={nearTaxonomyObject.linkedEntityToNearestTaxonomy}></EntitiesGrid>
                                :
                                <div>Aucune entité est liée à cette catégorie</div>
                            }
                        </div>
                        
                    )
                }
            </>
        )
    }

    return (
        <div>
            <PageHeader
                bg={"bg-purplelight"}
                textColor={"text-white"}
                htmlTitle={"Résultats de recherche" + " pour " + router.query.searchIndex}
                description=""
            >
            </PageHeader>

            <div className="row">

                <div className="col-3">
                    <div>
                        {
                            nearTaxonomyObject?.otherNearbyTaxonomy.length > 0 &&
                            <>
                                <h4>Vous cherchiez peut-être :</h4>
                                <ul>
                                    { nearTaxonomyObject.otherNearbyTaxonomy.map( (nearTaxo) => {
                                        return (
                                            <li>
                                                <a href={`/categories/${nearTaxo?.category}/${nearTaxo?.slug}`}>{nearTaxo.name}</a>
                                            </li>)
                                    })}
                                </ul>
                            </>
                        }
                    </div>
                    <div>
                        <h4>Filtres</h4>
                        <ul>
                            <li className="row" onClick={() => setFilterType("all")}>
                                <div className="col-1">{filterType === "all" ? "🗹" : "☐"}</div>
                                <div className="col-8">Tout les résultats</div>
                                <div className="col-1">{nearTaxonomyObject?.linkedEntityToNearestTaxonomy?.length + searchList.length ?? "0"}</div>
                            </li>
                            <li className="row" onClick={() => setFilterType("linkedTaxonomy")}>
                                <div className="col-1">{filterType === "linkedTaxonomy" ? "🗹" : "☐"}</div>
                                <div className="col-8">Entité liée suggérée</div>
                                <div className="col-1">{nearTaxonomyObject?.linkedEntityToNearestTaxonomy?.length.toString() ?? "0"}</div>
                            </li>
                            <li className="row" onClick={() => setFilterType("Person")}>
                                <div className="col-1">{filterType === "Person" ? "🗹" : "☐"}</div>
                                <div className="col-8">Personnes</div>
                                <div className="col-1">{searchList.filter( (el) => {return el.type == "Person"}).length.toString() ?? "0"}</div>
                            </li>
                            <li className="row" onClick={() => setFilterType("Organisation")}>
                                <div className="col-1">{filterType === "Organisation" ? "🗹" : "☐"}</div>
                                <div className="col-8">Organisations</div>
                                <div className="col-1">{searchList.filter( (el) => {return el.type == "Organisation"}).length.toString() ?? "0"}</div>
                            </li>
                            <li className="row" onClick={() => setFilterType("Project")}>
                                <div className="col-1">{filterType === "Project" ? "🗹" : "☐"}</div>
                                <div className="col-8">Projets</div>
                                <div className="col-1">{searchList.filter( (el) => {return el.type == "Project"}).length.toString() ?? "0"}</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-9">
                    {/* If filter set to all results */}
                    {
                        filterType === "all" ?
                        <>
                            {linkedEntityToTaxonomyComponent()}
                            {researchResult()}
                        </>
                        :
                        <>
                            {/* else show linked or result by type */}
                            {
                                filterType === "linkedTaxonomy" ?
                                <>{linkedEntityToTaxonomyComponent()}</>
                                :
                                <>{researchResult(filterType)}</>
                            }                            
                        </>
                    }

                </div>
            </div>
            
        </div>
    )
}

export default SearchResults