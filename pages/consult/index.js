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
    const [filterState, setFilterState] = useState([]);
    const [showApplyBtn, setShowApplyBtn] = useState(false)

    const updateFilterState = (filterType) => {
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
    }
    const getListResponses = () => {
        if(filterState.length == 0)
            return clientSideExternalApiRequest("/search/?searchIndex=", { method: 'GET'});
    }
    async function sendApiListRequest(){
        const res = await getListResponses();
        const list = res.data;
        setEntityList(list);
        setShowApplyBtn(false);
    }
    //First render fetch
    useEffect(()=>{ sendApiListRequest() },[])

    return (
        <div>
            <PageHeader
                bg={"bg-purplelight"}
                textColor={"text-white"}
                htmlTitle={"Consulter les ressources technologiques du Croissant boréal"}
                description="Voir les personnes et organisation sur le territoire, les projets et événements en cours où à venir, et bien plus!">
            </PageHeader>
            <div>
                {/* Filter type section */}
                <h3><Icon iconName="filter"/>Filtrer par type de données</h3>
                <ul className="d-flex justify-content-center">
                    <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-all" onClick={() => updateFilterState("all")}>
                        <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState.length === 0} id="filter-CB-all"/>
                        <span className="d-flex align-items-center justify-content-between">
                            <span className="form-check-label col-8">Tous les types</span>                                
                        </span>
                    </li>
                    <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-person" onClick={() => {updateFilterState("Person")}}>
                        <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState.includes("Person")} id="filter-CB-person"/>
                        <span className="d-flex align-items-center justify-content-between">
                            <span className="form-check-label col-8">Personnes</span>
                        </span>
                    </li>
                    <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-organisation" onClick={() => updateFilterState("Organisation")}>
                        <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState.includes("Organisation")} id="filter-CB-organisation"/>
                        <span className="d-flex align-items-center justify-content-between">
                            <span className="form-check-label col-8">Organisations</span>
                        </span>
                    </li>
                    <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-project" onClick={() => updateFilterState("Project")}>
                        <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState.includes("Project")} id="filter-CB-project"/>
                        <span className="d-flex align-items-center justify-content-between">
                            <span className="form-check-label col-8">Projets</span>
                        </span>
                    </li>
                    <li className="row p-2 form-check flex-nowrap d-flex" role="button" key="filter-CBL-event" onClick={() => updateFilterState("Event")}>
                        <input readOnly className="form-check-input col-1" type="checkbox" checked={filterState.includes("Event")} id="filter-CB-event"/>
                        <span className="d-flex align-items-center justify-content-between">
                            <span className="form-check-label col-8">Événements</span>
                        </span>
                    </li>
                </ul>
                {/* Filter taxonomy section */}
                <h3><Icon iconName="filter"/>Filtrer par catégories <Button>Voir toute les catégories</Button></h3>
                <div className="d-flex justify-content-center">
                    <div>Category filter 1</div>
                    <div>Category filter 2</div>
                    <div>Category filter 3</div>
                </div>
                <div>
                    <Button disabled={!showApplyBtn} onClick={sendApiListRequest}>{lang.apply}</Button>
                </div>
            </div>
            <div className="py-4">
                {/* Entities list section */}
                {
                    entityList?.length > 0 ?
                    <EntitiesGrid className={"row"} columnClass={"col g-3 col-md-4"} feed={entityList.filter(el => el.type !== "Taxonomy")}></EntitiesGrid>
                    :
                    <div>Aucune entité, peut-être que notre petit canard fait une sieste</div>
                }
            </div>
            <div>
                {/* Pagination section */}
            </div>
        </div>
    )
}
export default ConsultData