
//Component
import SearchBar from "@/src/common/Components/SearchBar"


const SearchResults = () => {

    return (
        <div>
            <div>Ici gît tout les espoirs de Frédéric</div>
            <SearchBar></SearchBar>
            <table>
                <thead>
                    <tr>
                        <th>a</th>
                        <th>b</th>
                        <th>c</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //Map item (for each data, insert new row) below
                    }
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SearchResults