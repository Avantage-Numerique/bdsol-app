//React
import { useEffect, useState } from "react"

//Router
import { useRouter } from "next/router";

//Component
import SearchBar from "@/src/common/Components/SearchBar"
import { sendExternalApiRequest } from "@/src/hooks/http-hook";
import PersonSimple from '@/DataTypes/Person/Components/layouts/simple/PersonSimple'
import OrganisationSimple from '@/DataTypes/Organisation/components/layouts/simple/OrganisationSimple'


const SearchResults = () => {

    const gridComponenents = new Map();
    gridComponenents.set("person", PersonSimple);
    gridComponenents.set("organisation", OrganisationSimple);

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
            <div className="row home-page__feed-section--container row-cols-1 row-cols-sm-2 row-cols-xl-3">
                {
                    searchList?.length > 0 ?
                    searchList.map((elem, index) => {
                        let TargetSimpleComponent = gridComponenents.get(elem.type);
                        TargetSimpleComponent = TargetSimpleComponent ?? OrganisationSimple;
                        return (
                            <div className="col g-3" key={"container"+elem.type+elem._id + "-" + elem.slug+index}>
                                <TargetSimpleComponent data={elem} key={"simple"+elem.type+elem._id + "-" + elem.slug+index} />
                            </div>
                        )
                    })
                    :
                    <div>Aucune entité trouvée, réessayer avec d'autre critère de recherche</div>
                }
            </div>
        </div>
    )
}

export default SearchResults