import {useEffect, useState} from "react";
import SingleInfo from "../common/layouts/SingleInfo/SingleInfo";
import {lang} from "@/src/common/Data/GlobalConstants";
import {clientSideExternalApiRequest} from '@/src/hooks/http-hook';


const BadgesSection = ({badges,...props}) => {
    
    //Check wether badges exist and is not empty
    if(badges === undefined || (Array.isArray(badges) && badges.length < 1) ){
        return (<></>)
    }
    
    //Fetch badges informations
    const [badgesInfoState, setBadgesInfoState] = useState()
    const [showBadgesState, setShowBadgesState] = useState(<></>)

    useEffect( () => {
        async function fetchBadge(){
            const res = await getBadgesInfo();
            setBadgesInfoState(res);
            UpdateShowBadges();
        }
        fetchBadge();
    }, [])
    
    const UpdateShowBadges = (selected, isAlreadySelected=false) => {
        //Populate badgeArray for each badge earned by entity
        const badgesArray = [];
        badges.forEach(elem => {
            if(badgesInfoState?.[elem] !== undefined){
                badgesArray.push(badgesInfoState[elem])
            }
        });

        const tempShowBadge = [];
        badgesArray.forEach( (elem, index) => {
            const isSelected = elem.name === selected?.name && isAlreadySelected;
            tempShowBadge.push(
                <ul className="list-group list-group-flush d-inline-flex" key={elem.name+"-"+index}>
                    <li className={"list-group-item p-0"} onClick={() => UpdateShowBadges(elem, !isAlreadySelected)}>
                        <button className="btn btn-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <img className="" width="40px" height="40px" src={elem.iconPath} alt={elem.iconAlt}/>
                            <span className="mx-2">{elem?.label ?? "Badge"}</span>
                        </button>
                        {
                            isSelected &&
                            <div className={"px-4"}>
                                {elem.description}
                            </div>
                        }
                    </li>
                </ul>
            )
        })
        setShowBadgesState(tempShowBadge);
    }

    //When badgeInfoState change, reset structure (there to allow badgesInfoState to settle on a value)
    useEffect(() => {
        UpdateShowBadges();
    }, [badgesInfoState])


    return (
        <div className="">
            <SingleInfo title={lang.badges}>
                {showBadgesState}
            </SingleInfo>
        </div>
    )
}

export default BadgesSection;


export const getBadgesInfo = async () => {
    return await clientSideExternalApiRequest(
        '/info/badges',
        { method: 'GET' }
    );
}