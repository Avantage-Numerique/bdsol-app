import { useHttpClient } from "@/src/hooks/http-hook";
import { useState, useEffect } from "react";
import PageHeader from "@/src/layouts/Header/PageHeader";

const TaxonomiesCategoryPage = () => {

    const {sendRequest} = useHttpClient();
    const [taxonomiesList, setTaxonomiesList] = useState([]);
    const [taxonomyMenu, setTaxonomyMenu] = useState("occupations")
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
        //Fetch taxonomy list and construct filtered list
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
                <div key={elem.slug} className="col-3 p-2">
                    <a href={`/taxonomies/${elem.category}/${elem.slug}`} className="d-block p-2 border">
                        {elem.name}
                    </a>
                </div>
            )
        )
    }

    return (
        <div>
            <PageHeader title={`Catégories de taxonomies`}/>
                <ul className="nav nav-pills nav-fill gap-5">
                    {
                        categoryList.map((elem) =>
                            <li key={elem+"-categoryMenuBtn"} className="nav-item">
                                <a key={elem+"-categoryMenuBtn"} onClick={() => setTaxonomyMenu(elem)}
                                    className={`btn btn-outline-primary border nav-link ${elem == taxonomyMenu ? "active" : ""}`}>
                                    {elem}
                                </a>
                            </li>
                        )
                    }
                </ul>
                {
                    taxonomyMenu != "" && 
                    <div>
                        <h3 className="py-4">
                            {taxonomyMenu} :
                        </h3>
                        <div className="container">
                            <div className="row">
                                {mapArrayToListComponent(taxonomiesList[taxonomyMenu])}

                            </div>
                        </div>
                    </div>
                }

        </div>
    )
}

export default TaxonomiesCategoryPage