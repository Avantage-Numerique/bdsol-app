//React
import { useEffect, useState } from "react"

//Component
import SearchBar from "@/src/common/Components/SearchBar"
import Button from "@/src/common/FormElements/Buttons/Button/Button";



const SearchResults = () => {

    const [searchList, setSearchList] = useState([1,2,3]);

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
                    searchList.map( entity =>
                        <tr>
                            <td>
                                <Button>
                                    👀{
                                        //On click ==> Redirect to single-view url : /entity.type/entity.slug
                                    }
                                </Button>
                            </td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                    )}
                </tbody>
            </table>
            }
        </div>
    )
}

export default SearchResults