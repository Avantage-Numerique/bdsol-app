import { useHttpClient } from "@/src/hooks/http-hook";
import React, {useState, useEffect, useCallback} from "react";
import PageHeader from "@/src/layouts/Header/PageHeader";
import {lang} from "@/common/Data/GlobalConstants";
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";
import AppRoutes from "@/src/Routing/AppRoutes";

const TaxonomiesCategoryPage = () => {

    const {sendRequest} = useHttpClient();
    const [taxonomiesList, setTaxonomiesList] = useState([]);
    const [taxonomyMenu, setTaxonomyMenu] = useState("occupations")
    const categoryList = [
        {value:"occupations", label:lang.Occupations},
        {value:"domains", label: lang.Domains},
        {value:"technologies", label: lang.Technologies},
        {value:"skills", label: lang.Skills},
    ];
    
    useEffect( () => {

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

        let categoriesPromises = [];
        let taxonomiesFiltered = {};

        for (let category of categoryList) {
            categoriesPromises.push(fetchTaxonomyByCategory(category.value));
        }

        Promise.all(categoriesPromises)
            .then(fetchedCategory => {
                fetchedCategory.map( (category, index) => {
                    taxonomiesFiltered[categoryList[index].value] = category;
                });
                setTaxonomiesList(taxonomiesFiltered)
            });

    }, []);

    const mapArrayToListComponent = (list) => {
        if(list === undefined || list.length === 0)
            return (
                <div>Liste introuvable ou vide</div>
            )
        return (
            list.map( (elem) => 
                <div key={elem.slug} className="col-3 p-2">
                    <a href={`/categories/${elem.category}/${elem.slug}`} className="d-block p-2 border">
                        {elem.name}
                    </a>
                </div>
            )
        )
    }

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "categories": "Toutes les catégories",
        }[param];
    }, []);

    return (
        <div>
            <PageHeader title={`Toutes les catégories`}>
                <Breadcrumbs className={"pt-2"} route={AppRoutes.categories} getLabelGenerator={getLabelGenerator} />
            </PageHeader>
                <ul className="nav nav-pills nav-fill gap-5">
                    {
                        categoryList.map((elem) =>
                            <li key={elem.label+"-categoryMenuBtn"} className="nav-item">
                                <a key={elem.label+"-categoryMenuBtn"} onClick={() => setTaxonomyMenu(elem.value)}
                                    className={`btn btn-outline-primary border nav-link ${elem.value === taxonomyMenu ? "active" : ""}`}>
                                    {elem.label}
                                </a>
                            </li>
                        )
                    }
                </ul>
                {
                    taxonomyMenu !== "" &&
                    <div>
                        <h3 className="py-4">
                            {categoryList.find( el => taxonomyMenu === el.value ).label}{lang.colon}
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