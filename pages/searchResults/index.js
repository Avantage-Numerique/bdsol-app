//React
import React, {useEffect, useState} from "react"
import {useRouter} from "next/router";
import {clientSideExternalApiRequest} from "@/src/hooks/http-hook";
import PageHeader from "@/layouts/Header/PageHeader";
import EntitiesGrid from "@/src/DataTypes/Entity/layouts/EntitiesGrid";


const SearchResults = () => {

    const [searchList, setSearchList] = useState([]);
    const router = useRouter();
    const [searchMessage, setSearchMessage] = useState("");
    const [filter, setFilter] = useState([])
    const [nearTaxonomyObject, setNearestTaxonomyObject] = useState(undefined)


    const updateFilterState = (filterType) => {
        if(filterType == "all")
            setFilter([]);
        else {
            const filterState = [...filter]
            //If already in array remove it else push in front
            if(filterState.includes(filterType))
                setFilter(filterState.filter( (el) => { return el != filterType}));
            else {
                filterState.unshift(filterType);
                setFilter(filterState)
            }
        }
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
        if(entityType == "linkedTaxonomy")
            return linkedEntityToTaxonomyComponent();

        const resultMessage = entityType ? "Résultats pour " + entityType + ":" : "Résultats de recherche :";
        let filteredList = searchList ? [...searchList] : [];
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
                        <EntitiesGrid className={"row"} columnClass={"col g-3 col-md-4"} feed={nearTaxonomyObject.linkedEntityToNearestTaxonomy}></EntitiesGrid>
                        :
                        <p>Aucune entité est liée à cette catégorie</p>
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
                            nearTaxonomyObject?.otherNearbyTaxonomy?.length > 0 &&
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
                        { searchList &&
                            <ul>
                                <li className="row py-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-all" onClick={() => updateFilterState("all")}>
                                    <input readOnly className="form-check-input col-1" type="checkbox" checked={filter.length == 0} id="filter-CB-all"/>
                                    <span className="d-flex align-items-center justify-content-between">
                                        <span className="form-check-label col-8">Tout les résultats</span>                                
                                        <span className="col-3">{(nearTaxonomyObject?.linkedEntityToNearestTaxonomy?.length || 0) + (searchList?.length || 0)}</span>
                                    </span>
                                </li>

                                <li className="row py-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-linkedTaxonomy" onClick={() => updateFilterState("linkedTaxonomy")}>
                                    <input readOnly className="form-check-input col-1" type="checkbox" checked={filter.includes("linkedTaxonomy")} id="filter-CB-linkedTaxonomy"/>
                                    <span className="d-flex align-items-center justify-content-between">
                                        <span className="form-check-label col-8">Entité liée suggérée</span>
                                        <span className="col-3">{nearTaxonomyObject?.linkedEntityToNearestTaxonomy?.length.toString() ?? "0"}</span>
                                    </span>
                                </li>

                                <li className="row py-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-person" onClick={() => {updateFilterState("Person")}}>
                                    <input readOnly className="form-check-input col-1" type="checkbox" checked={filter.includes("Person")} id="filter-CB-person"/>
                                    <span className="d-flex align-items-center justify-content-between">
                                        <span className="form-check-label col-8">Personnes</span>
                                        <span className="col-3">{searchList.filter( (el) => {return el.type == "Person"}).length.toString() ?? "0"}</span>
                                    </span>
                                </li>

                                <li className="row py-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-organisation" onClick={() => updateFilterState("Organisation")}>
                                    <input readOnly className="form-check-input col-1" type="checkbox" checked={filter.includes("Organisation")} id="filter-CB-organisation"/>
                                    <span className="d-flex align-items-center justify-content-between">
                                        <span className="form-check-label col-8">Organisations</span>
                                        <span className="col-3">{searchList.filter( (el) => {return el.type == "Organisation"}).length.toString() ?? "0"}</span>
                                    </span>
                                </li>

                                <li className="row py-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-project" onClick={() => updateFilterState("Project")}>
                                    <input readOnly className="form-check-input col-1" type="checkbox" checked={filter.includes("Project")} id="filter-CB-project"/>
                                    <span className="d-flex align-items-center justify-content-between">
                                        <span className="form-check-label col-8">Projets</span>
                                        <span className="col-3">{searchList.filter( (el) => {return el.type == "Project"}).length.toString() ?? "0"}</span>
                                    </span>
                                </li>
                            </ul>
                        }
                    </div>
                </div>

                <div className="row col-9">
                    {/* If filter set to all results */}
                    {
                        filter.length == 0 ?
                        <div>
                            {linkedEntityToTaxonomyComponent()}
                            {researchResult()}
                        </div>
                        :
                        <div>
                            {/* else show linkedTaxonomy or result by type */}
                            { filter.map( (el) => { return <div key={el}>{researchResult(el)}</div> }) }                         
                        </div>
                    }

                </div>
            </div>
            
        </div>
    )
}

export default SearchResults