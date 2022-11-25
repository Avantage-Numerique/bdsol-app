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
            const response = await sendExternalApiRequest(
                "/search/results?"+router.asPath.split("?")[1], //Find a better way than this <---- .split()[1]
                'GET',
                null
            );
            setSearchList(response);
        }
        //searchRequest();
        setSearchList([
            {
                "_id": "637f8906fa5ed32ddcd6488a",
                "lastName": "Landry",
                "firstName": "Sami",
                "nickname": "Patate Molle",
                "description": "<p>Samii</p>",
                "occupations": [
                    {
                        "occupation": {
                            "_id": "63769a7cced149ae444690c1",
                            "category": "occupations",
                            "name": "Illustrateur",
                            "__v": 0,
                            "createdAt": "2022-11-17T20:32:59.621Z",
                            "description": "",
                            "slug": "illustrateur",
                            "source": "",
                            "status": {
                                "state": "Accepted",
                                "lastModifiedBy": "000000000000000000000000",
                                "_id": "637fcf819e388d30db565496"
                            },
                            "updatedAt": "2022-11-24T20:09:37.134Z",
                            "type": "Taxonomy",
                            "id": "63769a7cced149ae444690c1"
                        },
                        "status": {
                            "state": "Pending",
                            "requestedBy": "63769a7a44e110053b12bcf0",
                            "lastModifiedBy": "63769a7a44e110053b12bcf0",
                            "_id": "637f8906fa5ed32ddcd6488c"
                        },
                        "_id": "637f8906fa5ed32ddcd6488b"
                    }
                ],
                "status": {
                    "state": "Pending",
                    "requestedBy": "63769a7a44e110053b12bcf0",
                    "lastModifiedBy": "63769a7a44e110053b12bcf0",
                    "_id": "637f8906fa5ed32ddcd6488d"
                },
                "createdAt": "2022-11-24T15:08:54.692Z",
                "updatedAt": "2022-11-24T15:08:54.692Z",
                "slug": "sami-landry",
                "__v": 0,
                "fullName": "Sami Landry",
                "type": "Person",
                "id": "637f8906fa5ed32ddcd6488a"
            },
            {
                "_id": "637bb9709251f99b14668272",
                "lastName": "24",
                "firstName": "354",
                "nickname": "d",
                "description": "<p>Patate</p>",
                "occupations": [
                    {
                        "occupation": {
                            "_id": "63769a7cced149ae444690b7",
                            "category": "occupations",
                            "name": "Sound designer",
                            "__v": 0,
                            "createdAt": "2022-11-17T20:32:59.622Z",
                            "description": "",
                            "slug": "sound-designer",
                            "source": "",
                            "status": {
                                "state": "Accepted",
                                "lastModifiedBy": "000000000000000000000000",
                                "_id": "637fcf819e388d30db5654ae"
                            },
                            "updatedAt": "2022-11-24T20:09:37.135Z",
                            "type": "Taxonomy",
                            "id": "63769a7cced149ae444690b7"
                        },
                        "status": {
                            "state": "Pending",
                            "requestedBy": "63769a7a44e110053b12bcf0",
                            "lastModifiedBy": "63769a7a44e110053b12bcf0",
                            "_id": "637bb9709251f99b14668274"
                        },
                        "_id": "637bb9709251f99b14668273"
                    },
                    {
                        "occupation": {
                            "_id": "63769a7cced149ae4446908b",
                            "category": "occupations",
                            "name": "Concepteur sonore",
                            "__v": 0,
                            "createdAt": "2022-11-17T20:32:59.621Z",
                            "description": "",
                            "slug": "concepteur-sonore",
                            "source": "",
                            "status": {
                                "state": "Accepted",
                                "lastModifiedBy": "000000000000000000000000",
                                "_id": "637fcf819e388d30db565482"
                            },
                            "updatedAt": "2022-11-24T20:09:37.133Z",
                            "type": "Taxonomy",
                            "id": "63769a7cced149ae4446908b"
                        },
                        "status": {
                            "state": "Pending",
                            "requestedBy": "63769a7a44e110053b12bcf0",
                            "lastModifiedBy": "63769a7a44e110053b12bcf0",
                            "_id": "637bb9709251f99b14668276"
                        },
                        "_id": "637bb9709251f99b14668275"
                    }
                ],
                "status": {
                    "state": "Pending",
                    "requestedBy": "63769a7a44e110053b12bcf0",
                    "lastModifiedBy": "63769a7a44e110053b12bcf0",
                    "_id": "637bb9709251f99b14668277"
                },
                "createdAt": "2022-11-21T17:46:24.447Z",
                "updatedAt": "2022-11-21T17:46:24.447Z",
                "slug": "354-24",
                "__v": 0,
                "fullName": "354 24",
                "type": "Person",
                "id": "637bb9709251f99b14668272"
            },
            {
                "_id": "6377e3543e9afcdf5616155b",
                "lastName": "Petit",
                "firstName": "Alexandra",
                "nickname": "Chat",
                "description": "",
                "occupations": [],
                "status": {
                    "state": "Pending",
                    "requestedBy": "63769a7a44e110053b12bcf0",
                    "lastModifiedBy": "63769a7a44e110053b12bcf0",
                    "_id": "6377e3543e9afcdf5616155c"
                },
                "createdAt": "2022-11-18T19:56:04.238Z",
                "updatedAt": "2022-11-18T19:56:04.238Z",
                "slug": "alexandra-petit",
                "__v": 0,
                "fullName": "Alexandra Petit",
                "type": "Person",
                "id": "6377e3543e9afcdf5616155b"
            },
            {
                "_id": "637f8906fa5ed32ddcd6488a",
                "lastName": "Landry",
                "firstName": "Sami",
                "nickname": "Patate Molle",
                "description": "<p>Samii</p>",
                "occupations": [
                    {
                        "occupation": {
                            "_id": "63769a7cced149ae444690c1",
                            "category": "occupations",
                            "name": "Illustrateur",
                            "__v": 0,
                            "createdAt": "2022-11-17T20:32:59.621Z",
                            "description": "",
                            "slug": "illustrateur",
                            "source": "",
                            "status": {
                                "state": "Accepted",
                                "lastModifiedBy": "000000000000000000000000",
                                "_id": "637fcf819e388d30db565496"
                            },
                            "updatedAt": "2022-11-24T20:09:37.134Z",
                            "type": "Taxonomy",
                            "id": "63769a7cced149ae444690c1"
                        },
                        "status": {
                            "state": "Pending",
                            "requestedBy": "63769a7a44e110053b12bcf0",
                            "lastModifiedBy": "63769a7a44e110053b12bcf0",
                            "_id": "637f8906fa5ed32ddcd6488c"
                        },
                        "_id": "637f8906fa5ed32ddcd6488b"
                    }
                ],
                "status": {
                    "state": "Pending",
                    "requestedBy": "63769a7a44e110053b12bcf0",
                    "lastModifiedBy": "63769a7a44e110053b12bcf0",
                    "_id": "637f8906fa5ed32ddcd6488d"
                },
                "createdAt": "2022-11-24T15:08:54.692Z",
                "updatedAt": "2022-11-24T15:08:54.692Z",
                "slug": "sami-landry",
                "__v": 0,
                "fullName": "Sami Landry",
                "type": "Person",
                "id": "637f8906fa5ed32ddcd6488a"
            },
            {
                "_id": "637bb9709251f99b14668272",
                "lastName": "24",
                "firstName": "354",
                "nickname": "d",
                "description": "<p>Patate</p>",
                "occupations": [
                    {
                        "occupation": {
                            "_id": "63769a7cced149ae444690b7",
                            "category": "occupations",
                            "name": "Sound designer",
                            "__v": 0,
                            "createdAt": "2022-11-17T20:32:59.622Z",
                            "description": "",
                            "slug": "sound-designer",
                            "source": "",
                            "status": {
                                "state": "Accepted",
                                "lastModifiedBy": "000000000000000000000000",
                                "_id": "637fcf819e388d30db5654ae"
                            },
                            "updatedAt": "2022-11-24T20:09:37.135Z",
                            "type": "Taxonomy",
                            "id": "63769a7cced149ae444690b7"
                        },
                        "status": {
                            "state": "Pending",
                            "requestedBy": "63769a7a44e110053b12bcf0",
                            "lastModifiedBy": "63769a7a44e110053b12bcf0",
                            "_id": "637bb9709251f99b14668274"
                        },
                        "_id": "637bb9709251f99b14668273"
                    },
                    {
                        "occupation": {
                            "_id": "63769a7cced149ae4446908b",
                            "category": "occupations",
                            "name": "Concepteur sonore",
                            "__v": 0,
                            "createdAt": "2022-11-17T20:32:59.621Z",
                            "description": "",
                            "slug": "concepteur-sonore",
                            "source": "",
                            "status": {
                                "state": "Accepted",
                                "lastModifiedBy": "000000000000000000000000",
                                "_id": "637fcf819e388d30db565482"
                            },
                            "updatedAt": "2022-11-24T20:09:37.133Z",
                            "type": "Taxonomy",
                            "id": "63769a7cced149ae4446908b"
                        },
                        "status": {
                            "state": "Pending",
                            "requestedBy": "63769a7a44e110053b12bcf0",
                            "lastModifiedBy": "63769a7a44e110053b12bcf0",
                            "_id": "637bb9709251f99b14668276"
                        },
                        "_id": "637bb9709251f99b14668275"
                    }
                ],
                "status": {
                    "state": "Pending",
                    "requestedBy": "63769a7a44e110053b12bcf0",
                    "lastModifiedBy": "63769a7a44e110053b12bcf0",
                    "_id": "637bb9709251f99b14668277"
                },
                "createdAt": "2022-11-21T17:46:24.447Z",
                "updatedAt": "2022-11-21T17:46:24.447Z",
                "slug": "354-24",
                "__v": 0,
                "fullName": "354 24",
                "type": "Person",
                "id": "637bb9709251f99b14668272"
            },
            {
                "_id": "6377e3543e9afcdf5616155b",
                "lastName": "Petit",
                "firstName": "Alexandra",
                "nickname": "Chat",
                "description": "",
                "occupations": [],
                "status": {
                    "state": "Pending",
                    "requestedBy": "63769a7a44e110053b12bcf0",
                    "lastModifiedBy": "63769a7a44e110053b12bcf0",
                    "_id": "6377e3543e9afcdf5616155c"
                },
                "createdAt": "2022-11-18T19:56:04.238Z",
                "updatedAt": "2022-11-18T19:56:04.238Z",
                "slug": "alexandra-petit",
                "__v": 0,
                "fullName": "Alexandra Petit",
                "type": "Person",
                "id": "6377e3543e9afcdf5616155b"
            }
        ])
        console.log("res",response);
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