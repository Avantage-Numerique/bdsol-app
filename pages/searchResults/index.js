//React
import React, {useEffect, useState} from "react"
import {useRouter} from "next/router";
import SearchBar from "@/src/common/Components/SearchBar"
import {clientSideExternalApiRequest, externalApiRequest} from "@/src/hooks/http-hook";
import PersonSimple from '@/DataTypes/Person/Components/layouts/simple/PersonSimple'
import OrganisationSimple from '@/DataTypes/Organisation/components/layouts/simple/OrganisationSimple'
import PageHeader from "@/layouts/Header/PageHeader";


const SearchResults = () => {

    const gridComponents = new Map();
    gridComponents.set("person", PersonSimple);
    gridComponents.set("organisation", OrganisationSimple);

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

            <div className="row home-page__feed-section--container row-cols-1 row-cols-sm-2 row-cols-xl-3">
                {
                    searchList?.length > 0 ?
                    searchList.map((elem, index) => {
                        let TargetSimpleComponent = gridComponents.get(elem.type);
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