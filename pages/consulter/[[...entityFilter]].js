//Hook
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {withSessionSsr} from "@/src/authentification/session/handlers/withSession";
import {
    ORIGIN_BROWSER,
    ORIGIN_SERVER
} from "@/src/hooks/http-hook";
import {searchByType} from "@/src/hooks/useSearch";

import {isIterable} from "@/src/helpers/obj";
import {capitalize} from "@/src/helpers/str";
import {isDev} from "@/src/helpers/configHelper";

import EntitiesGrid from "@/src/DataTypes/Entity/layouts/EntitiesGrid";
import Icon from "@/src/common/widgets/Icon/Icon";
import Pagination from "@/common/Pagination/Pagination";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";
import Spinner from "@/common/widgets/spinner/Spinner";
import {getBadgesInfo} from "@/src/DataTypes/Badges/BadgesSection";
import {LoadingStates} from "@/common/widgets/loading/LoadingStates";
import {Collapse} from "@/common/Components/Collapse";
import {filters, filtersUrl} from "@/src/filters/consultFilters";
import {paginationConfig} from "@/src/configs/PaginationConfigs";
import PageHeader from "@/layouts/Header/PageHeader";
import Button from "@/src/common/FormElements/Button/Button";
import {useLoading} from "@/src/hooks/useLoading";
import useConsultData, {buildPaginationMeta} from "@/src/hooks/useConsultData";

const ConsultData = (props) => {

    // # INIT SEQ
    // - Get SSR data
    // - Set consultData from  filters
    // - set pagination meta
    // - set init REF constants.

    const uriEntities = props.entityFilters;
    const router = useRouter();

    const clearListRef = useRef(true);//for now always shows only what is fetched.
    const isFirstRenderRef = useRef(true);


    const currentQueryEntityFilterUrl = () => {
        return Array.isArray(props.entityFilters) && props.entityFilters.length > 0 ? props.entityFilters[0] : "tous";
    }

    const currentEntityFilterUrl = currentQueryEntityFilterUrl();
    const {currentLoadingState, setCurrentLoadingState} = useLoading();
    const [consultData, updateConsultData] = useConsultData(props, filters.get(currentEntityFilterUrl));


    /**
     * Utils to manage changes on the entityFilter, only used in btn filter on click handler.
     * @param entityFilter
     * @param currentPage
     * @returns {Promise<void>}
     */
    const filtersRouteHandler = async (entityFilterUrl, currentPage) => {
        const routerParams = {
            pathname: '/consulter/'+entityFilterUrl,
        }

        if (currentPage > 1 && consultData.entities.includes(filters.get(entityFilterUrl))) {
            routerParams.search = `?page=${currentPage}`;
        }
        setCurrentLoadingState(LoadingStates.LOADING);
        await router.push(routerParams)//, undefined, { shallow: true }
    }

    /**
     * On click handler passed to the buttons in the navigation.
     * @param type
     * @returns {Promise<void>}
     */
    const btnFilterOnClickHandler = async (type) => {
        //setFilterState(type);
        const targetTypeUrl = filtersUrl.get(type);
        await filtersRouteHandler(targetTypeUrl, consultData.paginationMeta.currentPage);
    }

    /**
     * Not async function on click handler of the pages button from pagination componenent but need to be call in this context.
     * @param targetPage
     */
    const btnPageOnClickHandler = (targetPage) => {
        sendApiListRequest(Math.abs(targetPage-1) * paginationConfig.pageSize);
    }

    /**
     * Window pushState the current query to have an url change, but no react re-render shenanigans.
     * @param updatedPaginationMeta
     */
    function updateUrlQueryWithCurrentPage(updatedPaginationMeta) {

        if (!updatedPaginationMeta) return;
        if (!updatedPaginationMeta.currentPage || updatedPaginationMeta.currentPage < 1) return;

        const currentQuery = { ...router.query };
        const currentPage = updatedPaginationMeta.currentPage;

        delete currentQuery.entityFilter;//allways delete the base route that are manage with the router.

        if (currentPage === 1) {
            delete currentQuery.page;
        } else {
            currentQuery.page = currentPage.toString();
        }

        const queryVars = new URLSearchParams(currentQuery);
        if (window)
            window.history.pushState({ page: currentPage }, '', `/consulter/${filtersUrl.get(consultData.entities[0])}${queryVars.toString() !== "" ? "?" : ""}${queryVars.toString()}`);
    }

    /**
     * When the router.query change in the end of the load, set
     */
    useEffect(()=> {
        setCurrentLoadingState(LoadingStates.LOADING_COMPLETE);
    },[router.query]);


    /**
     * The first render of the page, do trigger only once, even when we push new path on the router.
     */
    useEffect(()=> {
        if(isFirstRenderRef.current){
            isFirstRenderRef.current = false;
        }
    },[]);


    /**
     * Used in pagination to fetch on client side the new elements to feed the entitygrid. Change the consultData state to force the rerender.
     * @param directSkipNumber
     * @returns {Promise<void>}
     */
    async function sendApiListRequest(directSkipNumber=null){
        //setIsLoading(true);
        setCurrentLoadingState(LoadingStates.LOADING);
        const targetSkip = directSkipNumber ?? 0;
        console.log("sendApiListRequest", directSkipNumber, "filter entities", consultData.entities[0]);
        const res = await searchByType(ORIGIN_BROWSER, consultData.entities[0], {skip:targetSkip});

        const list = res.data;
        let newList;

        if (clearListRef.current) {
            newList = list;
            //setClearList(false);//always set the list as is for now.
        }
        else {
            newList = isIterable(list) ? [...consultData.list, ...list] : [...consultData.list];//if list is an object, put it in, or use only the entitylist
        }

        const totalCurrentCount = newList.length;
        const currentPaginiationMeta = buildPaginationMeta(res?.meta?.pagination, totalCurrentCount);

        //the csr function in useConsultData.
        updateConsultData({
            list: [...newList],
            paginationMeta: {...currentPaginiationMeta},
            entities: [consultData.entities[0]]
        });

        updateUrlQueryWithCurrentPage(currentPaginiationMeta);

        //setShowApplyBtn(false);//loadmore method. To be implemented later on with the new hybrid ssr + csr mode.
        setCurrentLoadingState(LoadingStates.LOADING_COMPLETE);
    }

    /**
     * set a new value to the Ref clearListRef. Used by pagination to allow the load more feature (commented for now).
     * @param clearing
     */
    function updateClearList(clearing){
        clearListRef.current = clearing;
    }


    /**
     * Grid of all the simple fetch and set in the consultData.list property.
     * @type {JSX.Element}
     */
    const entityGrid = (
        <div className="py-4 position-relative">
            {currentLoadingState.state === LoadingStates.LOADING.state &&
                <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} loadingState={currentLoadingState} />
            }
            {
                consultData.list?.length > 0 &&
                <EntitiesGrid
                    className={"row"}
                    columnClass={"col-12 col-sm-6 col-lg-4 col-xl-3 g-4 "}
                    feed={consultData.list.filter(el => el.type !== "Taxonomy")}
                    badgesInfo={props.badgesInfo}
                />
            }
            {currentLoadingState.state === LoadingStates.LOADING_MORE.state &&
                <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} loadingState={currentLoadingState} />
            }
            {
                (currentLoadingState.state === LoadingStates.LOADING_COMPLETE.state || currentLoadingState.state === LoadingStates.DEFAULT.state) &&
                consultData.list?.length <= 0 &&
                <div className={"alert alert-primary p-4 text-center"}>{lang.listNoResult}</div>
            }
        </div>
    )

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
                        <section className={"d-flex justify-content-between align-items-center"}>
                            <h3><Icon iconName="filter"/>Filtres</h3>
                            {isDev &&
                                <Collapse btnLabel={"Filtres actifs"} btnIcon={"filter"} keyId={"filtersActivesCollapse"} show={true}>
                                    <div className="d-flex flex-column justify-content-between my-3">
                                        <div>
                                            <span>filtre actifs&nbsp;:&nbsp;</span>
                                            {uriEntities && uriEntities.length > 0 &&
                                                uriEntities.map((entity, index) => {
                                                    return (
                                                        <span className={"badge text-bg-secondary"} key={entity+index}>
                                                            {entity}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div>
                                            <span>Filtre&nbsp;(état)&nbsp;:&nbsp;</span><span>{JSON.stringify(consultData.entities)}</span>
                                        </div>
                                        <div>
                                            <span>Loading state&nbsp;:&nbsp;</span><span>{currentLoadingState.label}</span>
                                        </div>
                                    </div>
                                </Collapse>
                            }
                        </section>

                        <div style={{gap: "1rem"}} className="d-flex flex-wrap justify-content-center">
                            { consultData.entities && filters.size > 0 &&
                                Array.from(filters).map(([slug, type]) => {
                                    return (
                                        <Button className="mx-1 rounded flex-grow-1"
                                                color={Array.isArray(consultData.entities) && consultData.entities.includes(type) ? "secondary" : null}
                                                outline={Array.isArray(consultData.entities) && consultData.entities.includes(type) ? null : "secondary"}
                                                text_color_over="dark"
                                                onClick={() => btnFilterOnClickHandler(type)}
                                                id={"filter-btn-"+type}
                                                key={"filter-btn-"+type+slug}>
                                            {lang["filter" + capitalize(type)]}
                                        </Button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </section>
            <Pagination
                paginationMeta={consultData.paginationMeta}
                setClearList={updateClearList}
                pageBtnClickHandler={btnPageOnClickHandler}
                loadMore={false}
            >
                <div className="py-4 position-relative">
                    {currentLoadingState.state === LoadingStates.LOADING.state &&
                        <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} loadingState={currentLoadingState} />
                    }
                    {
                        consultData.list?.length > 0 &&
                        <EntitiesGrid
                            className={"row"}
                            columnClass={"col-12 col-sm-6 col-lg-4 col-xl-3 g-4 "}
                            feed={consultData.list.filter(el => el.type !== "Taxonomy")}
                            badgesInfo={props.badgesInfo}
                        />
                    }
                    {currentLoadingState.state === LoadingStates.LOADING_MORE.state &&
                        <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} loadingState={currentLoadingState} />
                    }
                    {
                        (currentLoadingState.state === LoadingStates.LOADING_COMPLETE.state || currentLoadingState.state === LoadingStates.DEFAULT.state) &&
                        consultData.list?.length <= 0 &&
                        <div className={"alert alert-primary p-4 text-center"}>{lang.listNoResult}</div>
                    }
                </div>
            </Pagination>
        </div>
    )
}
export default ConsultData;



/**
 * SSR function handling the main params and all the query before the first load of the page.
 * @param params {Array} with entityFilter
 * @param query
 * @param req
 * @param res
 * @returns {Promise<{props: {pages: number, entityFilters: (*|string[]), allQueries: ({page}|*)}}>}
 */
export const dynamicRouteHandler = async ({params, query, req, res }) => {
    const queryPage = query.page && parseInt(query.page) > 0 ? parseInt(query.page) : 1;
    const badges = await getBadgesInfo(true);
    const entityTypesSlugs = params.entityFilter ?? ['tous'];
    const targetEntityType = filters.get(entityTypesSlugs[0]) ?? 'all';

    const additionalParams = queryPage ? {
        skip: (queryPage-1) * paginationConfig.pageSize//need to adjust the skip to the db
    } : {};

    const ssrDataFirstLoad = await searchByType(ORIGIN_SERVER, targetEntityType, additionalParams);
    return {
        props: {
            pages: queryPage,
            entityFilters: params.entityFilter ?? ['tous'],
            allQueries: query,
            ssrData: ssrDataFirstLoad,
            badgesInfo: badges
        }
    }
};

export const getServerSideProps = withSessionSsr(dynamicRouteHandler);