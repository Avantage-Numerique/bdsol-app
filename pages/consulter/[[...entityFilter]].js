//Hook
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {withSessionSsr} from "@/src/authentification/session/handlers/withSession";
import {
    clientSideExternalApiRequest,
    externalApiRequest,
    ORIGIN_BROWSER,
    ORIGIN_SERVER,
    useHttpClient
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

const ConsultData = (props) => {

    //  # INIT SEQ
        //set state list
        //set state filters
        //set pagination meta
        //set init REF constants.

    const uriEntities = props.entityFilters;
    const uriQueries = props.allQueries;

    const entityPerPage = paginationConfig.pageSize;
    const router = useRouter();

    const [entityList, setEntityList] = useState(props.ssrData.data ?? []);
    const [filterState, setFilterState] = useState(filters.get(uriEntities[0]) ?? "all");

    const clearListRef = useRef(true);//for now always shows only what is fetched.
    const isFirstRenderRef = useRef(true);

    /**
     * Construct the pagination meta from target API return.
     * @param pagination {Object}
     * @param total {Number}
     * @param setState {Boolean}
     * @returns {{count, skipped: any, limit, type, pageCount: *, currentPage: (number|*), currentCount}}
     */
    const buildPaginationMeta = (pagination, total, setState=true) => {

        const paginationMetaObj = {
            count: pagination.count,
            skipped: pagination.skipped,
            limit: pagination.limit,
            type: pagination.type,
            pageCount: pagination.pageCount,
            currentPage: pagination.currentPage,
            currentCount: total,
        };
        if (setState) setPaginationMeta(paginationMetaObj);
        return paginationMetaObj;
    }

    const [skipNumber, setSkipNumber] = useState(
        (uriQueries.queryPage != undefined && parseInt(uriQueries.queryPage) > 0 ) ?
            (uriQueries.queryPage - 1) * entityPerPage : 0);

    const initPaginationMeta = buildPaginationMeta(props.ssrData.meta?.pagination ?? {}, props.ssrData?.data?.length ?? 0, false );
    const [paginationMeta, setPaginationMeta] = useState(initPaginationMeta);
    const {currentLoadingState, setCurrentLoadingState} = useLoading();

    console.log("Rendering consult page", uriQueries, "init PaginationMeta", initPaginationMeta, "current Pagination meta", paginationMeta, "skipNumber", skipNumber);

    /**
     * @deprecated param returnKey allow to switch from get value to get key
     * @param label
     * @param returnKey
     * @returns {*|string}
     */
    function getFilterStateFromLabel(label, returnKey=false){
        const sanitizedLabel = String(label);
        const labelToFilter =
        {
            "tous": "all",
            "personnes": "Person",
            "organisations": "Organisation",
            "projets": "Project",
            "evenements": "Event",
            "equipements": "Equipment"
        }
        if(returnKey)
            return Object.keys(labelToFilter).find(key => labelToFilter[key] === sanitizedLabel);
        return labelToFilter?.[sanitizedLabel];
    }

    const filtersRouteHandler = async (entityFilter, currentPage) => {
        const routerParams = {
            pathname: '/consulter/'+entityFilter,
        }

        if (currentPage > 1 && filters.get(entityFilter) === filterState) {
            routerParams.search = `?page=${currentPage}`;
        }

        await router.push(routerParams)//, undefined, { shallow: true }
    }

    const btnFilterOnClickHandler = async (type) => {
        setCurrentLoadingState(LoadingStates.LOADING);
        setFilterState(type);
        const targetType = filtersUrl.get(type);

        await filtersRouteHandler(targetType, paginationMeta.currentPage);
    }

    /**
     * Not async function on click handler of the pages button from pagination componenent but need to be call in this context.
     * @param skip
     */
    const btnPageOnClickHandler = (skip) => {
        //setSkipNumber(skip);
        //sendApiListRequest(skip);
        setCurrentLoadingState(LoadingStates.LOADING);
        filtersRouteHandler(filtersUrl.get(filterState), skip);
    }

    /*useEffect(()=> {
        console.log("SkipNumber changed, so effect goes ?", skipNumber, isFirstRenderRef.current, "clear list ?", clearListRef.current);
        if (!isFirstRenderRef.current) {
            sendApiListRequest();
        }
    }, [skipNumber]);*/

    /*useEffect(() => {
        updatePageQueryInUrl(paginationMeta);
    }, [paginationMeta]);*///, router.query.page, router

    function updatePageQueryInUrl(updatedPaginationMeta) {
        console.log("updatePageQueryInUrl", updatedPaginationMeta, 'skipNumber', skipNumber);
        if (!updatedPaginationMeta) return;
        if (!updatedPaginationMeta.currentPage || updatedPaginationMeta.currentPage < 1) return;

        const currentPageInURL = parseInt(router.query.page) || 1;
        //need this ? `/consulter/${filtersUrl.get(filterState)}`,
        // Ne pas mettre à jour si la page dans l'URL est déjà la bonne
        if (updatedPaginationMeta.currentPage === paginationMeta.currentPage) return;

        const currentQuery = { ...router.query };
        const currentPage = updatedPaginationMeta.currentPage;

        if (currentPage === 1) {
            delete currentQuery.page;
        } else {
            currentQuery.page = currentPage.toString();
        }

        router.push({
            pathname: router.pathname,
            query: currentQuery,
        }, undefined, {
            shallow: true,
            scroll: false
        });
    }

    /*function updatePageUrlInAddressBar() {

        console.log("updatePageUrlInAddressBar", skipNumber, paginationMeta);
        const routerParams = {
            pathname: `/consulter/${filtersUrl.get(filterState)}`,
        }
        // if current page === 1, remove the page params.
        // if not add it with the shallow true.
        if (paginationMeta.currentPage > 1) {
            routerParams.search = `?page=${paginationMeta.currentPage}`;
            router.push(routerParams, undefined, { shallow: true })
        }
        //else {
        //    routerParams.search = '';
        //    router.push(routerParams, undefined, { shallow: true })
        //}
    }*/

    useEffect(()=> {
        //First render => ignore this use effect
        if(isFirstRenderRef.current){
            isFirstRenderRef.current = false;
            return;
        }
    },[filterState]);
/*
    useEffect(()=> {
        if (!isFirstRenderRef.current) {
            //updatePageUrlInAddressBar();
        }
    }, [skipNumber]);*/

    /*useEffect(()=> {
        console.log("paginationMeta changed", skipNumber, paginationMeta);

        const routerParams = {
            pathname: `/consulter/${filtersUrl.get(filterState)}`,
        }
        if (paginationMeta.currentPage > 1) {
            routerParams.search = `?page=${paginationMeta.currentPage}`;
            router.push(routerParams, undefined, { shallow: true })//
        }

    }, [paginationMeta]);*/

    async function sendApiListRequest(directSkipNumber=null){
        //setIsLoading(true);
        setCurrentLoadingState(LoadingStates.LOADING);
        const targetSkip = directSkipNumber ?? 0;
        const res = await searchByType(ORIGIN_BROWSER, filterState, {skip:targetSkip});

        const list = res.data;
        let newList;

        let totalCurrentCount = 0;

        if (clearListRef.current){
            newList = list;
            setClearList(false);
        }
        else {
            newList = isIterable(list) ? [...entityList, ...list] : [...entityList];//if list is an object, put it in, or use only the entitylist
        }
        console.log("cs fetch ", newList.length, res?.meta?.pagination)
        setEntityList(newList);
        totalCurrentCount = newList.length;

        const currentPaginiationMeta = buildPaginationMeta(res?.meta?.pagination, totalCurrentCount);
        //updatePageQueryInUrl(currentPaginiationMeta);

        //setShowApplyBtn(false);
        //setIsLoading(false);
        setCurrentLoadingState(LoadingStates.LOADING_COMPLETE);
    }

    //ClearList setter
    function setClearList(clearing){
        clearListRef.current = clearing;
    }


    /*useEffect( () => {
        //router.query.filtre = filterState;
        //router.query.page = paginationMeta.currentPage;
        console.log("filterState", filterState);
        if(entityTypeList.includes(filterState) || filterState === "all"){
            const tempFilterLabel = getFilterStateFromLabel(filterState, true);
            //router.push({
            //    pathname: '/consulter/'+tempFilterLabel,
            //    search: "?page="+paginationMeta.currentPage,
            //  }, undefined, { shallow: true })
        }
    }, [filterState, paginationMeta])


    const getListResponses = async () => {

        if(filterState === "all")
            return await clientSideExternalApiRequest("/search/all", { method: 'POST', body: JSON.stringify({data : {skip:skipNumber, limit:entityPerPage}})});
        else
            return await clientSideExternalApiRequest("/search/type", { method: 'POST', body: JSON.stringify({data : {type: filterState, skip:skipNumber, limit:entityPerPage}})});
    }
*/


/*
    useEffect(()=> {
        //First render => ignore this use effect
        if(isFirstRenderRef.current){
            isFirstRenderRef.current = false;
            return;
        }
        setClearList(true);
        setSkipNumber(0);
        //handles new request with the filter chosen
        if(skipNumber === 0)
            sendApiListRequest();
        else
            setSkipNumber(0);
    },[filterState]);*/


    const entityGrid = (
        <div className="py-4 position-relative">
            {currentLoadingState.state === LoadingStates.LOADING.state &&
                <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} loadingState={currentLoadingState} />
            }
            {
                entityList?.length > 0 &&
                <EntitiesGrid
                    className={"row"}
                    columnClass={"col-12 col-sm-6 col-lg-4 col-xl-3 g-4 "}
                    feed={entityList.filter(el => el.type !== "Taxonomy")}
                    badgesInfo={props.badgesInfo}
                />
            }
            {currentLoadingState.state === LoadingStates.LOADING_MORE.state &&
                <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} loadingState={currentLoadingState} />
            }
            {
                (currentLoadingState.state === LoadingStates.LOADING_COMPLETE.state || currentLoadingState.state === LoadingStates.DEFAULT_STATE.state) &&
                entityList?.length <= 0 &&
                <div>{lang.listNoResult}</div>
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
                                                        <span href={""} className={"badge text-bg-secondary"} key={entity+index}>
                                                            {entity}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div>
                                            <span>Filtre&nbsp;(état)&nbsp;:&nbsp;</span><span>{filterState}</span>
                                        </div>
                                        <div>
                                            <span>Loading state&nbsp;:&nbsp;</span><span>{currentLoadingState.label}</span>
                                        </div>
                                    </div>
                                </Collapse>
                            }
                        </section>

                        <div style={{gap: "1rem"}} className="d-flex flex-wrap justify-content-center">
                            {filters.size > 0 &&
                                Array.from(filters).map(([slug, type]) => {
                                    return (
                                        <Button className="mx-1 rounded flex-grow-1"
                                                color={filterState === type ? "secondary" : null}
                                                outline={filterState === type ? null : "secondary"}
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
                paginationMeta={paginationMeta}
                setClearList={setClearList}
                pageBtnClickHandler={btnPageOnClickHandler}
                loadMore={false}
            >
                {entityGrid}
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

    console.log("-~+++==== SSR consulter ====+++~-", params, "queryPage", queryPage, "ssrDataFirstLoad lgt", ssrDataFirstLoad.code);
    return {
        props: {
            pages: queryPage,
            entityFilters: params.entityFilter ?? ['tous'],
            allQueries: query,
            ssrData: ssrDataFirstLoad,
            ...badges
        }
    }
};

export const getServerSideProps = withSessionSsr(dynamicRouteHandler);