import {useHttpClient} from "@/src/hooks/http-hook";
import React, {useCallback, useEffect, useState} from "react";
import PageHeader from "@/src/layouts/Header/PageHeader";
import {lang} from "@/common/Data/GlobalConstants";
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";
import AppRoutes from "@/src/Routing/AppRoutes";

//Styling 
import styles from './index_categories.module.scss';
import Head from "next/head";
import {getTitle} from "@/DataTypes/MetaData/MetaTitle";
import {getType, TYPE_TAXONOMY} from "@/DataTypes/Entity/Types";
import Link from "next/link";

const TaxonomiesCategoryPage = () => {

    const {sendRequest} = useHttpClient();
    const [taxonomiesList, setTaxonomiesList] = useState([]);
    const [taxonomyMenu, setTaxonomyMenu] = useState("skills")
    const categoryList = [
        {value:"domains", label: lang.Domains},
        {value:"technologies", label: lang.Technologies},
        {value:"skills", label: lang.Skills},
        {value:"equipmentType", label: lang.equipmentType}
    ];
    const type = getType(TYPE_TAXONOMY);
    
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
                <div
                    className="col-6 col-sm-4 col-md-3 p-sm-1 p-md-2 d-flex"
                    key={elem.slug}
                >
                    <Link 
                        className={`border d-flex justify-content-between align-items-center w-100 p-sm-1 p-md-2 rounded ${styles["list-tag"]}`}
                        href={`/categories/${elem.category}/${elem.slug}`}
                    >
                        
                            <span>{elem.name}</span>
                            {
                                elem.meta?.count > 0 ?
                            <span className={"badge bg-primary"}>{elem.meta?.count}</span>
                            :
                            ""}
                    
                    </Link>
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
            <Head>
                <title>{getTitle([type.labelPlural])}</title>
            </Head>
            <PageHeader title={`Toutes les catégories`}>
                <Breadcrumbs className={"pt-2"} route={AppRoutes.categories} getLabelGenerator={getLabelGenerator} />
            </PageHeader>
                {/* Page inner menu */}
                <menu className="nav nav-pills nav-fill gap-5">
                    {
                        categoryList.map((elem) =>
                            <div key={elem.label+"-categoryMenuBtn"} className="nav-item">
                                <button key={elem.label+"-categoryMenuBtn"} onClick={() => setTaxonomyMenu(elem.value)}
                                    className={`btn btn-outline-primary border nav-link ${elem.value === taxonomyMenu ? "active" : ""}`}>
                                    {elem.label}
                                </button>
                            </div>
                        )
                    }
                </menu>
                {
                    taxonomyMenu !== "" &&
                    <div>
                        <h3 className="py-4">
                            {categoryList.find( el => taxonomyMenu === el.value ).label}{lang.colon}
                        </h3>
                        <div className="container pb-5">
                            <div className="row gx-2">
                                {mapArrayToListComponent(taxonomiesList[taxonomyMenu])}
                            </div>
                        </div>
                    </div>
                }

        </div>
    )
}

export default TaxonomiesCategoryPage