//Component
import PageHeader from "@/layouts/Header/PageHeader";
import Button from "@/src/common/FormElements/Button/Button";

//Hook
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {withSessionSsr} from "@/src/authentification/session/handlers/withSession";

//Utils
import {
    clientSideExternalApiRequest,
    externalApiRequest,
    ORIGIN_BROWSER,
    ORIGIN_SERVER,
    useHttpClient
} from "@/src/hooks/http-hook";
import EntitiesGrid from "@/src/DataTypes/Entity/layouts/EntitiesGrid";
import Icon from "@/src/common/widgets/Icon/Icon";
import Pagination from "@/common/Pagination/Pagination";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";
import Spinner from "@/common/widgets/spinner/Spinner";
import {getBadgesInfo} from "@/src/DataTypes/Badges/BadgesSection";
import nextConfig from "@/next.config";
import {LoadingStates} from "@/common/widgets/loading/LoadingStates";
import {isDev} from "@/src/helpers/configHelper";
import {Collapse} from "@/common/Components/Collapse";
import {isIterable} from "@/src/helpers/obj";
import {filters, filtersUrl} from "@/src/filters/consultFilters";
import {capitalize} from "@/src/helpers/str";
import {paginationConfig} from "@/src/configs/PaginationConfigs";
import {searchByType, ssrSearchByType} from "@/src/hooks/useSearch";


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

    const clearListRef = useRef(false);
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
    const {isLoading, setIsLoading, currentLoadingState, setLoadingState} = useHttpClient();

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
        if (currentPage > 1) {
            routerParams.search = `?page=${currentPage}`;
        }

        await router.push(routerParams)//, undefined, { shallow: true }
    }

    const btnFilterOnClickHandler = async (type) => {
        setFilterState(type);
        const targetType = filtersUrl.get(type);
        console.log("targetType", targetType);
        await filtersRouteHandler(targetType, paginationMeta.currentPage);
    }

    /**
     * Not async function on click handler of the pages button from pagination componenent but need to be call in this context.
     * @param skip
     */
    const btnPageOnClickHandler = (skip) => {
        setSkipNumber(skip);
        sendApiListRequest(skip);
    }


    /*useEffect(()=> {
        console.log("SkipNumber changed, so effect goes ?", skipNumber, isFirstRenderRef.current, "clear list ?", clearListRef.current);
        if (!isFirstRenderRef.current) {
            sendApiListRequest();
        }

    }, [skipNumber]);*/

    function updatePageUrlInAddressBar() {

        console.log("updatePageUrlInAddressBar", skipNumber, paginationMeta);
        const routerParams = {
            pathname: `/consulter/${filtersUrl.get(filterState)}`,
        }
        if (paginationMeta.currentPage > 1) {
            routerParams.search = `?page=${paginationMeta.currentPage}`;
            router.push(routerParams, undefined, { shallow: true })//
        }
    }

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
        setIsLoading(true);
        setLoadingState(LoadingStates.LOADING);
        const targetSkip = directSkipNumber ?? skipNumber;
        const res = await searchByType(ORIGIN_BROWSER, filterState, {skip:targetSkip});
        console.log("sendApiListRequest", res);
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

        setEntityList(newList);
        totalCurrentCount = newList.length;

        buildPaginationMeta(res?.meta?.pagination, totalCurrentCount);

        //setShowApplyBtn(false);
        setIsLoading(false);
        setLoadingState(LoadingStates.LOADING_COMPLETE);
    }

    //ClearList setter
    function setClearList(bool){
        clearListRef.current = bool;
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
            {isLoading &&
                <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} />
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
            {isLoading && currentLoadingState.state === LoadingStates.LOADING_MORE.state &&
                <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} />
            }
            {
                !isLoading && entityList?.length <= 0 &&
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
                                    <div className="d-flex flex-wrap justify-content-between my-3">
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
                                            <span>State&nbsp;:&nbsp;</span><span>{filterState}</span>
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
                setSkipNumber={setSkipNumber}
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
    const queryPage = query.page && parseInt(query.page) > 0 ? parseInt(query.page) : null;
    const badges = await getBadgesInfo(true);
    const entityTypesSlugs = params.entityFilter ?? ['tous'];
    const targetEntityType = filters.get(entityTypesSlugs[0])?? 'all';

    const additionalParams = queryPage ? {
        skip: queryPage
    } : {};

    console.log("-~+++==== SSR consulter ====+++~-", entityTypesSlugs, "entityTypesSlugs[0]", entityTypesSlugs[0]);

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