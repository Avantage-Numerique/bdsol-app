//React
import { useEffect, useState } from "react"

//Router
import { useRouter } from "next/router";

//Component
import SearchBar from "@/src/common/Components/SearchBar"
import Button from "@/src/common/FormElements/Buttons/Button/Button";
import { sendExternalApiRequest } from "@/src/hooks/http-hook";



const SearchResults = () => {

    const [searchList, setSearchList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        let response = [];
        async function searchRequest(){
            const response = await sendExternalApiRequest(
                "/search?"+router.asPath.split("?")[1],
                'GET',
                null
            );
            setSearchList(response);
        }
        searchRequest();
        console.log("res",response);
    }, [router.asPath])

    return (
        <div>
            <div>Ici gît tout les espoirs de Frédéric</div>
            <SearchBar></SearchBar>
            {
            searchList.length == 0 ?
            <div>Aucune entité trouvée, réessayer avec d'autre critère de recherche</div>
            : //if length != 0
            <table className="table table-bordered">
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
            </table>
            }
        </div>
    )
}

export default SearchResults