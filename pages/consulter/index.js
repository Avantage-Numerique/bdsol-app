import { useEffect, useState } from "react";

//Component
import PageHeader from "@/layouts/Header/PageHeader";
import Button from "@/src/common/FormElements/Button/Button";

//Utils
import { lang } from "@/src/common/Data/GlobalConstants";
import { clientSideExternalApiRequest } from "@/src/hooks/http-hook";
import EntitiesGrid from "@/src/DataTypes/Entity/layouts/EntitiesGrid";
import Icon from "@/src/common/widgets/Icon/Icon";



const ConsultData = () => {

    const [entityList, setEntityList] = useState([]);
    const [filterState, setFilterState] = useState("all");//For multi choice, it need to be an array at first render
    const [showApplyBtn, setShowApplyBtn] = useState(false)

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
    const getListResponses = () => {
        if(filterState == "all")
            return clientSideExternalApiRequest("/search/?searchIndex=", { method: 'GET'});
        else
            return clientSideExternalApiRequest("/search/type", { method: 'POST', body: JSON.stringify({data : {type: filterState, skip:0}})});
    }
    async function sendApiListRequest(){
        const res = await getListResponses();
        const list = res.data;
        setEntityList(list);
        setShowApplyBtn(false);
    }
    //First render fetch
    useEffect(()=>{ sendApiListRequest() }, [filterState])

    return (
        <div>
            <PageHeader
                bg={"bg-purplelight"}
                textColor={"text-white"}
                htmlTitle={"Consulter les ressources technologiques du Croissant boréal"}
                description="Voir les personnes et organisation sur le territoire, les projets et événements en cours où à venir, et bien plus!">
            </PageHeader>
            <section className="py-4">
                {/* Filter type section */}
                <section>
                    <h3><Icon iconName="filter"/>Filtrer par type de données</h3>
                    <ul className="d-flex justify-content-center">
                        <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-all" onClick={() => setFilterState("all")}>
                            <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState == "all"} id="filter-CB-all"/>
                            <span className="d-flex align-items-center justify-content-between">
                                <span className="form-check-label col-8">Tous les types</span>                                
                            </span>
                        </li>
                        <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-person" onClick={() => setFilterState("Person")}>
                            <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState == "Person"} id="filter-CB-person"/>
                            <span className="d-flex align-items-center justify-content-between">
                                <span className="form-check-label col-8">Personnes</span>
                            </span>
                        </li>
                        <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-organisation" onClick={() => setFilterState("Organisation")}>
                            <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState == "Organisation"} id="filter-CB-organisation"/>
                            <span className="d-flex align-items-center justify-content-between">
                                <span className="form-check-label col-8">Organisations</span>
                            </span>
                        </li>
                        <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-project" onClick={() => setFilterState("Project")}>
                            <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState == "Project"} id="filter-CB-project"/>
                            <span className="d-flex align-items-center justify-content-between">
                                <span className="form-check-label col-8">Projets</span>
                            </span>
                        </li>
                        <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-event" onClick={() => setFilterState("Event")}>
                            <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState == "Event"} id="filter-CB-event"/>
                            <span className="d-flex align-items-center justify-content-between">
                                <span className="form-check-label col-8">Événements</span>
                            </span>
                        </li>
                    </ul>
                </section>
                {/* Filter taxonomy section */}
                <section>
                    <h3><Icon iconName="filter"/>Filtrer par catégories <Button href="/categories">Voir toute les catégories</Button></h3>
                    <div className="d-flex justify-content-center">
                        <div>Category filter 1</div>
                        <div>Category filter 2</div>
                        <div>Category filter 3</div>
                    </div>
                    <div>
                        <Button disabled={!showApplyBtn} onClick={sendApiListRequest}>{lang.apply}</Button>
                    </div>
                </section>
            </section>
            <div className="py-4">
                {/* Entities list section */}
                {
                    entityList?.length > 0 ?
                    <EntitiesGrid className={"row"} columnClass={"col g-3 col-md-4"} feed={entityList.filter(el => el.type !== "Taxonomy")}></EntitiesGrid>
                    :
                    <div>Aucune entité, peut-être que notre petit canard fait une sieste.</div>
                }
            </div>
            <div>
                {/* Pagination section */}
            </div>
        </div>
    )
}
export default ConsultData