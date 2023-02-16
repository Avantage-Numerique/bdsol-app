//React
import { useEffect, useState } from "react"

//Router
import { useRouter } from "next/router";

//Component
import SearchBar from "@/src/common/Components/SearchBar"
import { sendExternalApiRequest } from "@/src/hooks/http-hook";
import PresentationCard from '@/src/common/Containers/cards/presentationCard'


const SearchResults = () => {

    const [searchList, setSearchList] = useState([]);
    const router = useRouter();
    const [searchMessage, setSearchMessage] = useState("");

    useEffect(() => {
        async function searchRequest(){

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
        return sendExternalApiRequest(
            "/search/results?searchIndex="+searchIndex,
            'GET',
            null
        );
    }

    const getIdRouteResponse = (linkId) => {
        return sendExternalApiRequest(
            "/search/"+linkId,
            'GET',
            null
        )
    }

    const getEntityTypeResponse = (entityType) => {
        return sendExternalApiRequest(
            "/"+entityType+"/list",
            'POST',
            JSON.stringify({"data": {}}),
            {'Content-Type': 'application/json'}
        )
    }

    return (
        <div className="maxWidthPageContainer">
            <div>Page de recherche</div>
            <SearchBar id="searchResults-searchBar"></SearchBar>
            <div>Résultats de recherche {searchMessage} :</div>
            <div className={"row"}>
            {
            searchList.length == 0 ?
            <div>Aucune entité trouvée, réessayer avec d'autre critère de recherche</div>
            : //if length != 0
            searchList.map( (entity) => {
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
            {/*<table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Voir</th>
                        <th>Type d'entité</th>
                        <th>Propriété de l'entité 1</th>
                        <th>Propriété de l'entité 2</th>
                        <th>Propriété de l'entité 3</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    searchList.map( (entity, index) => 
                        <tr key={index+"-searchList"}>
                            <td>
                                <Button >
                                    👀
                                </Button>
                            </td>
                            <td>{JSON.stringify(entity)}</td>
                            <td>1 - map index {index}</td>
                            <td>2 - map index {index}</td>
                            <td>3 - map index {index}</td>

                        </tr>
                    
                    )}
                </tbody>
            </table>*/
            }
        </div>
    )
}

export default SearchResults