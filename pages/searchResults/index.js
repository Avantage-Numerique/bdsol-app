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

    useEffect(() => {
        async function searchRequest() {

            let response = [];
            if(router.query.searchIndex){
                response = await getResultsRouteResponse(router.query.searchIndex);
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
    
    const searchSortDate = () => {
        //updatedAt or createdAt?
        //asc or desc ?
    }
    
    const getResultsRouteResponse = (searchIndex) => {
        return clientSideExternalApiRequest(
            "/search/results?searchIndex="+searchIndex,
            {
                method: 'GET'
            }
        );
    }

    const getIdRouteResponse = (linkId) => {
        return clientSideExternalApiRequest(
            "/search/"+linkId,
            {
                method: 'GET'
            }
        )
    }

    const getEntityTypeResponse = (entityType) => {
        return clientSideExternalApiRequest(
            "/"+entityType+"/list",
            {
                method: 'POST',
                body: JSON.stringify({"data": {}}),
                isBodyJson: true
            }
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

            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3">
                {
                    searchList?.length > 0 ?
                    <div>
                        <h3>Personne</h3>
                        <EntitiesGrid className={"row"} columnClass={"col g-3"} feed={searchList.filter( (elem) => elem.type == "Person")}/>
                        <h3>Organisation</h3>
                        <EntitiesGrid className={"row"} columnClass={"col g-3"} feed={searchList.filter( (elem) => { return elem.type == "Organisation" })}/>
                        <h3>Projet</h3>
                        <EntitiesGrid className={"row"} columnClass={"col g-3"} feed={searchList.filter( (elem) => { return elem.type == "Project" })}/>
                    </div>
                    :
                    <div>Aucune entité trouvée, réessayer avec d'autre critère de recherche</div>
                }
            </div>
        </div>
    )
}

export default SearchResults