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
    const [filter, setFilter] = useState("all")
    const [nearTaxonomyObject, setNearestTaxonomyObject] = useState(undefined)


    const updateFilterState = (filterType) => {
        const filterState = {...filter}

    } 

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
            <div className="py-4">
                <h3>{resultMessage}</h3>
                {
                    filteredList?.length > 0 ?
                    <EntitiesGrid className={"row"} columnClass={"col g-3 col-md-4"} feed={filteredList}></EntitiesGrid>
                    :
                    <div>Aucune entité trouvée, réessayer avec d'autre critère de recherche</div>
                }
            </div>
        )
    }
    const linkedEntityToTaxonomyComponent = () => {
        return (
            <div className="py-4">
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
                                <EntitiesGrid className={"row"} columnClass={"col g-3 col-md-4"} feed={nearTaxonomyObject.linkedEntityToNearestTaxonomy}></EntitiesGrid>
                                :
                                <div>Aucune entité est liée à cette catégorie</div>
                            }
                        </div>
                        
                    )
                }
            </div>
        )
    }

    return (
        <div>
            <PageHeader
                bg={"bg-purplelight"}
                textColor={"text-white"}
                htmlTitle={"Résultats de recherche pour : \"" + router.query.searchIndex + "\""}
                description=""
            >
            </PageHeader>

            <div className="row py-4">

                <div className="col-3 py-4">
                    <div>
                        {
                            nearTaxonomyObject?.otherNearbyTaxonomy.length > 0 &&
                            <>
                                <h4>Vous cherchiez peut-être :</h4>
                                <ul>
                                    { nearTaxonomyObject.otherNearbyTaxonomy.map( (nearTaxo, index) => {
                                        return (
                                            <li key={"nearTaxoList-"+nearTaxo._id}>
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
                            <li className="row py-2 form-check" role="button" key={"filter-CBL-all"} onClick={() => setFilter("all")}>
                                <input className="form-check-input col-1" type="checkbox" checked={filter === "all"} id="filter-CB-all"/>
                                <label className="form-check-label col-8" for="filter-CB-all">Tout les résultats</label>                                
                                <span className="col-3">{(nearTaxonomyObject?.linkedEntityToNearestTaxonomy?.length || 0) + (searchList?.length || 0)}</span>
                            </li>

                            <li className="row py-2 form-check" role="button" key={"filter-CBL-linkedTaxonomy"} onClick={() => setFilter("linkedTaxonomy")}>
                                <input className="form-check-input col-1" type="checkbox" checked={filter === "linkedTaxonomy"} id="filter-CB-linkedTaxonomy"/>
                                <label className="form-check-label col-8" for="filter-CB-linkedTaxonomy">Entité liée suggérée</label>
                                <span className="col-3">{nearTaxonomyObject?.linkedEntityToNearestTaxonomy?.length.toString() ?? "0"}</span>
                            </li>

                            <li className="row py-2 form-check" role="button" key={"filter-CBL-person"} onClick={() => setFilter("Person")}>
                                <input className="form-check-input col-1" type="checkbox" checked={filter === "Person"} id="filter-CB-person"/>
                                <label className="form-check-label col-8" for="filter-CB-person">Personnes</label>
                                <span className="col-3">{searchList.filter( (el) => {return el.type == "Person"}).length.toString() ?? "0"}</span>
                            </li>

                            <li className="row py-2 form-check" role="button" key={"filter-CBL-organisation"} onClick={() => setFilter("Organisation")}>
                                <input className="form-check-input col-1" type="checkbox" checked={filter === "Organisation"} id="filter-CB-organisation"/>
                                <label className="form-check-label col-8" for="filter-CB-organisation">Organisations</label>
                                <span className="col-3">{searchList.filter( (el) => {return el.type == "Organisation"}).length.toString() ?? "0"}</span>
                            </li>

                            <li className="row py-2 form-check" role="button" key={"filter-CBL-project"} onClick={() => setFilter("Project")}>
                                <input className="form-check-input col-1" type="checkbox" checked={filter === "Project"} id="filter-CB-project"/>
                                <label className="form-check-label col-8" for="filter-CB-project">Projets</label>
                                <span className="col-3">{searchList.filter( (el) => {return el.type == "Project"}).length.toString() ?? "0"}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row col-9">
                    {/* If filter set to all results */}
                    {
                        filter === "all" ?
                        <div>
                            {linkedEntityToTaxonomyComponent()}
                            {researchResult()}
                        </div>
                        :
                        <div>
                            {/* else show linked or result by type */}
                            {
                                filter === "linkedTaxonomy" ?
                                <>{linkedEntityToTaxonomyComponent()}</>
                                :
                                <>{researchResult(filter)}</>
                            }                            
                        </div>
                    }

                </div>
            </div>
            
        </div>
    )
}

export default SearchResults