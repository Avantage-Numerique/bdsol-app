//React
import { useEffect, useState } from "react"

//Router
import { useRouter } from "next/router";

//Component
import SearchBar from "@/src/common/Components/SearchBar"
import { sendExternalApiRequest } from "@/src/hooks/http-hook";
import PresentationCard from '@/src/common/Containers/cards/presentationCard'
import { Row, Col } from "react-bootstrap";



const SearchResults = () => {

    const [searchList, setSearchList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        let response = [];
        async function searchRequest(){
            let paramToString = "";

            if (router.query != {})
            {
                paramToString += "?" + router.asPath.split("?")[1]
            }
            console.log(paramToString);
            
            const response = await sendExternalApiRequest(
                "/search/results"+paramToString,
                'GET',
                null
            );
            setSearchList(response);
        }
        searchRequest();
        console.log("res",searchList);
    }, [router.asPath])

    return (
        <div>
            <div>Ici gît tout les espoirs de Frédéric</div>
            <SearchBar id="searchResults-searchBar"></SearchBar>
            <Row className={"home-page__feed-section--container"}>
            {
            searchList.length == 0 ?
            <div>Aucune entité trouvée, réessayer avec d'autre critère de recherche</div>
            : //if length != 0
            searchList.map( (entity) => {
                return (
                    <Col md={6} lg={4} className="p-2" key={entity._id + "-" + entity.slug}>
                        <PresentationCard
                            key={entity._id}
                            header={entity.type}
                            data={entity}
                            />
                    </Col>)
            })
            }
            </Row>
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