//Component
import PageHeader from "@/layouts/Header/PageHeader";
import Button from "@/src/common/FormElements/Button/Button";

//Hook
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {withSessionSsr} from "@/src/authentification/session/handlers/withSession";

//Utils
import {clientSideExternalApiRequest, useHttpClient} from "@/src/hooks/http-hook";
import EntitiesGrid from "@/src/DataTypes/Entity/layouts/EntitiesGrid";
import Icon from "@/src/common/widgets/Icon/Icon";
import Pagination from "@/common/Pagination/Pagination";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";
import Spinner from "@/common/widgets/spinner/Spinner";
import {getBadgesInfo} from "@/src/DataTypes/Badges/BadgesSection";


const ConsultData = (props) => {
    const entityPerPage = 2;
    const entityTypeList = ["Person", "Organisation", "Project", "Event", "Equipment"]
    const router = useRouter();
    const [entityList, setEntityList] = useState([]);
    const [filterState, setFilterState] = useState(getFilterStateFromLabel(props.entityFilter) ?? "all");//For multi choice, it need to be an array at first render
    const [skipNumber, setSkipNumber] = useState(router?.query?.page ? (router.query.page - 1) * entityPerPage : 0);
    const clearListRef = useRef(false);
    const isFirstRenderRef = useRef(true);
    const [paginationMeta, setPaginationMeta] = useState({});
    const {isLoading, setIsLoading} = useHttpClient();


    function getFilterStateFromLabel(label, returnKey=false){
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
            return Object.keys(labelToFilter).find(key => labelToFilter[key] === label);
        return labelToFilter?.[label];
    }

    useEffect( () => {
        //router.query.filtre = filterState;
        //router.query.page = paginationMeta.currentPage;
        if(entityTypeList.includes(filterState) || filterState == "all"){
            const tempFilterLabel = getFilterStateFromLabel(filterState, true);
            router.push({
                pathname: '/consulter/'+tempFilterLabel,
                search: "?page="+paginationMeta.currentPage,
              }, undefined, { shallow: true })

        }
    }, [filterState, paginationMeta])


    const getListResponses = async () => {
        if(filterState === "all")
            return await clientSideExternalApiRequest("/search/all", { method: 'POST', body: JSON.stringify({data : {skip:skipNumber, limit:entityPerPage}})});
        else
            return await clientSideExternalApiRequest("/search/type", { method: 'POST', body: JSON.stringify({data : {type: filterState, skip:skipNumber, limit:entityPerPage}})});
    }

    async function sendApiListRequest(){
        setIsLoading(true);
        const res = await getListResponses();
        const list = res.data;
        if(clearListRef.current){
            setEntityList(list); //If not loadMore or changing page/filter
            setClearList(false);
        }
        else {
            setEntityList([...entityList, ...list]); //If loadMore scroll
        }
        const paginationMetaObj =
        {
            count: res?.meta?.pagination?.count,
            skipped: res?.meta?.pagination?.skipped,
            limit: res?.meta?.pagination?.limit,
            type: res?.meta?.pagination?.type,
            pageCount: res?.meta?.pagination?.pageCount,
            currentPage: res?.meta?.pagination?.currentPage
        };
        setPaginationMeta(paginationMetaObj);
        //setShowApplyBtn(false);
        setIsLoading(false);
    }

    //ClearList setter
    function setClearList(bool){
        clearListRef.current = bool;
    }

    //Fetchs and first fetch
    useEffect(()=> { sendApiListRequest(); }, [skipNumber])
    useEffect(()=> {
        //First render => ignore this use effect
        if(isFirstRenderRef.current){
            isFirstRenderRef.current = false;
            return;
        }
            
        setClearList(true);
        //handles new request with the filter chosen
        if(skipNumber == 0)
            sendApiListRequest();
        else
            setSkipNumber(0);
    },[filterState])

    const entityFilter = () => {
        const buttonList = [];
        entityTypeList.forEach((type, index) => {
            buttonList.push(
                <Button className="mx-1 rounded flex-grow-1"
                    color={filterState === type ? "secondary" : null}
                    outline={filterState === type ? null : "secondary"}
                    text_color_over="dark"
                    onClick={() => setFilterState(type)}
                    id={"filter-btn-"+type}
                    key={"filter-btn-"+type+index}
                >
                    {lang[type]}
                </Button>
            )
        });
        return buttonList;
    }

    const entityGrid = (
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
                        <h3><Icon iconName="filter"/>Filtres</h3>
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
                            {entityFilter()}
                        </div>

                    </div>
                </section>
            </section>
                <Pagination
                    paginationMeta={paginationMeta}
                    setClearList={setClearList}
                    setSkipNumber={setSkipNumber}
                    loadMore={true}
                >
                    {entityGrid}
                </Pagination>
        </div>
    )
}
export default ConsultData;


export const getServerSideProps = withSessionSsr(getContextAndBadge);

export async function getContextAndBadge(context) {
    const { entityFilter } = context.query;
    const badgeInfo = await getBadgesInfo(true);
    return {
        props: {
            badgesInfo : badgeInfo,
            entityFilter: entityFilter
        }
    }
}