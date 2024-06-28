import React, {useEffect, useRef, useState} from "react";

//Component
import PageHeader from "@/layouts/Header/PageHeader";
import Button from "@/src/common/FormElements/Button/Button";

//hooks
//Utils
import {clientSideExternalApiRequest, useHttpClient} from "@/src/hooks/http-hook";
import EntitiesGrid from "@/src/DataTypes/Entity/layouts/EntitiesGrid";
import Icon from "@/src/common/widgets/Icon/Icon";
//import Pagination from "@/src/common/Components/Pagination";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";
import Spinner from "@/common/widgets/spinner/Spinner";
import { getBadgesInfo } from "@/src/DataTypes/Badges/BadgesSection";


const ConsultData = (props) => {

    const [entityList, setEntityList] = useState([]);
    const [filterState, setFilterState] = useState("all");//For multi choice, it need to be an array at first render
    const [showApplyBtn, setShowApplyBtn] = useState(false);
    const [skipNumber, setSkipNumber] = useState(0);
    const resetPagination = useRef(0)

    const {isLoading, setIsLoading} = useHttpClient();

    //Multi choice filter (as in searchResult page)
    //To reimplement => checkboxes are checked={filterState.includes("Person")}, checkbox for all filter : checked={filterState.length === 0}
    /*const updateFilterState = (filterType) => {
        if(filterType === "all")
            setFilterState([]);
        else {
            const filter = [...filterState]
            //If already in array remove it else push in front
            if(filter.includes(filterType))
                setFilterState(filterState.filter( (el) => { return el !== filterType}));
            else {
                filter.unshift(filterType);
                setFilterState(filter)
            }
        }
        setShowApplyBtn(true)
    } */

    /* const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            domains: {
                value: [],
                isValid: false
            },
            technologies: {
                value: [],
                isValid: true
            },
            skills: {
                value: [],
                isValid: true
            },
        },
        {
            displayResMessage: true
        }
    ) */
    const getListResponses = async () => {
        if(filterState === "all")
            return await clientSideExternalApiRequest("/search/?searchIndex=", { method: 'GET'});
        else
            return await clientSideExternalApiRequest("/search/type", { method: 'POST', body: JSON.stringify({data : {type: filterState, skip:skipNumber}})});
    }

    async function sendApiListRequest(){
        setIsLoading(true);
        const res = await getListResponses();
        const list = res.data;
        setEntityList(list);
        setShowApplyBtn(false);
        setIsLoading(false);
    }
    //First render fetch
    useEffect(()=>{ sendApiListRequest() }, [filterState, skipNumber])

    return (
        <div>
            <PageMeta
                title={lang.consult__title}
                description={lang.consult__description}
            />
            <PageHeader
                bg={"bg-primary-light"}
                textColor={"text-white"}
                htmlTitle={"Consulter les ressources technologiques du Croissant boréal"}
                description="Voir les personnes et organisation sur le territoire, les projets et événements en cours où à venir, et bien plus!">
            </PageHeader>
            <section style={{ width:"100vw", marginLeft:"calc(50% - 50vw)"}}>
                {/* Filter type section */}
                <section className="bg-greyBg">
                    <div className="container py-4">
                        <h3><Icon iconName="filter"/>Filtrer par type de données</h3>
                        <div style={{gap: "1rem"}} className="d-flex flex-wrap justify-content-center">
                            <Button
                                className="mx-1 rounded flex-grow-1"
                                color={filterState === "all" ? "secondary" : null}
                                outline={filterState === "all" ? null : "secondary"}
                                text_color_over="dark"
                                onClick={() => setFilterState("all")}
                                id="filter-btn-all"
                            >
                                Tous les types
                            </Button>
                            <Button className="mx-1 rounded flex-grow-1"
                                color={filterState === "Person" ? "secondary" : null}
                                outline={filterState === "Person" ? null : "secondary"}
                                text_color_over="dark"
                                onClick={() => setFilterState("Person")}
                                id="filter-btn-person"
                            >
                                Personnes
                            </Button>
                            <Button className="mx-1 rounded flex-grow-1"
                                color={filterState === "Organisation" ? "secondary" : null}
                                outline={filterState === "Organisation" ? null : "secondary"}
                                text_color_over="dark"
                                onClick={() => setFilterState("Organisation")}
                                id="filter-btn-organisation"
                            >
                                Organisations
                            </Button>
                            <Button className="mx-1 rounded flex-grow-1"
                                color={filterState === "Project" ? "secondary" : null}
                                outline={filterState === "Project" ? null : "secondary"}
                                text_color_over="dark"
                                onClick={() => setFilterState("Project")}
                                id="filter-btn-project"
                            >
                                Projets
                            </Button>
                            <Button className="mx-1 rounded flex-grow-1"
                                color={filterState === "Event" ? "secondary" : null}
                                outline={filterState === "Event" ? null : "secondary"}
                                text_color_over="dark"
                                onClick={() => setFilterState("Event")}
                                id="filter-btn-event"
                            >
                                Événements
                            </Button>
                            <Button className="mx-1 rounded flex-grow-1"
                                color={filterState === "Equipment" ? "secondary" : null}
                                outline={filterState === "Equipment" ? null : "secondary"}
                                text_color_over="dark"
                                onClick={() => setFilterState("Equipment")}
                                id="filter-btn-equipment"
                            >
                                Équipements
                            </Button>
                        </div>

                    </div>
                </section>
                {/* Filter taxonomy section */}
                {/*
                <section className="bg-greyBg">
                    <div className="container py-4">
                        <h3><Icon iconName="filter"/>Filtrer par catégories <Button className="mx-4" href="/categories">Voir toute les catégories</Button></h3>
                        <div className="row d-flex justify-content-center">
                            <div className="col-4">
                                <p className="mb-1 fw-semibold">Secteur d'activité</p>
                                <Select2
                                    name="domains"
                                    formTools={formTools}
                                    creatable={false}
                                    isMulti={true}

                                    fetch={"/taxonomies/list"}
                                    requestData={{ category: "domains" }}
                                    searchField={"name"}
                                    selectField={"name"}
                                />
                            </div>
                            <div className="col-4">
                                <p className="mb-1 fw-semibold">Technologies utilisées</p>
                                <Select2
                                    name="technologies"
                                    formTools={formTools}
                                    creatable={false}
                                    isMulti={true}

                                    fetch={"/taxonomies/list"}
                                    requestData={{ category: "technologies" }}
                                    searchField={"name"}
                                    selectField={"name"}
                                />
                            </div>
                            <div className="col-4">
                                <p className="mb-1 fw-semibold">Compétences mise en oeuvre</p>
                                <Select2
                                    name="skills"
                                    formTools={formTools}
                                    creatable={false}
                                    isMulti={true}

                                    fetch={"/taxonomies/list"}
                                    requestData={{ category: "skills" }}
                                    searchField={"name"}
                                    selectField={"name"}
                                />
                            </div>
                        </div>
                        {/* <div>
                            <Button disabled={!showApplyBtn} onClick={sendApiListRequest}>{lang.apply}</Button>
                        </div> */}
                    {/*</div>
                </section>*/}
            </section>
            {/*<Pagination
                totalCount={125}
                length={18}
                reset={resetPagination}
                setSkipNumber={setSkipNumber}
            >*/}
                <div className="py-4 position-relative">
                    {isLoading &&
                        <div className={"home-page__feed-section--spinner-container"}>
                            <div>
                                <Spinner reverse/>
                            </div>
                            <p className="text-center"><strong>{lang.loadingData}</strong></p>
                        </div>
                    }
                    {/* Entities list section */}
                    {
                        entityList?.length > 0 &&
                        <EntitiesGrid
                            className={"row"}
                            columnClass={"col-12 col-sm-6 col-lg-4 col-xl-3 g-4 "}
                            feed={entityList.filter(el => el.type !== "Taxonomy")}
                            badgesInfo={props.badgesInfo}
                        />
                    }
                    {
                        !isLoading && entityList?.length <= 0 &&
                        <div>{lang.listNoResult}</div>
                    }
                </div>
            {/*</Pagination>*/}
        </div>
    )
}
export default ConsultData;


export async function getStaticProps() {
    const badgeInfo = await getBadgesInfo();
    return {
        props: {
            badgesInfo : badgeInfo
        }
    }
}