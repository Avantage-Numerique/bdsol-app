import { useHttpClient } from "@/src/hooks/http-hook";
import { useState, useEffect } from "react";

const TaxonomiesCategoryPage = () => {

    const {sendRequest} = useHttpClient();
    const [taxonomiesList, setTaxonomiesList] = useState([]);
    const [taxonomyMenu, setTaxonomyMenu] = useState("")
    const categoryList = ["occupations", "domains", "abilities", "skills"];


    const fetchTaxonomyByCategory = async (category) => {
        if(!category){return}

        const response = await sendRequest(
            "/taxonomies/list",
            'POST',
            JSON.stringify({
                "data": {
                    "category": category
                }}),
            { 'Content-Type': 'application/json' }
        );
        
        return response.data
    }
    
    useEffect( () => {

        let taxonomiesFiltered = {};
        //Fetch taxonomy list
        categoryList.forEach( async (category) => {
            const response = await fetchTaxonomyByCategory(category);
            if(response)
                taxonomiesFiltered[category] = response;
        })

        setTaxonomiesList(taxonomiesFiltered);
    }, [])

    const mapArrayToListComponent = (list) => {
        if(list == undefined || list.length == 0)
            return (
                <div>Liste introuvable ou vide</div>
            )
        return (
            list.map( (elem) => 
                <div key={elem.slug}>
                    <a href={`/taxonomies/${elem.slug}`}>{elem.name}</a>
                </div>
            )
        )
    }

    return (
        <div>
            <div>
                Les différentes catégories de taxonomies disponible :
            </div>
            <div>
                {
                    categoryList.map((elem) =>
                        <div key={elem+"-categoryMenuBtn"} onClick={() => setTaxonomyMenu(elem)}>
                            {elem}
                        </div>
                    )
                }
            </div>
                {
                    taxonomyMenu != "" && 
                    <div>
                        <h3>
                            {taxonomyMenu} :
                        </h3>
                        <div>
                            {mapArrayToListComponent(taxonomiesList[taxonomyMenu])}
                        </div>
                    </div>
                }

        </div>
    )
}

export default TaxonomiesCategoryPage