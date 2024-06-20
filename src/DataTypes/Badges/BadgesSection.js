import { useState, useEffect } from "react";
import SingleInfo from "../common/layouts/SingleInfo/SingleInfo";
import { lang } from "@/src/common/Data/GlobalConstants";
import {clientSideExternalApiRequest} from '@/src/hooks/http-hook';


const BadgesSection = ({badges,...props}) => {
    
    //Check wether badges exist and is not empty
    if(badges == undefined || (Array.isArray(badges) && badges.length < 1) ){
        return (<></>)
    }
    
    //Fetch badges informations
    const [badgesInfoState, setBadgesInfoState] = useState()
    const [showBadgesState, setShowBadgesState] = useState(<></>)

    useEffect( () => {
        const getBadgesInfo = async () => {
            const apiResponse = await clientSideExternalApiRequest(
                '/info/badges',
                { method: 'GET' }
            );
            setBadgesInfoState(apiResponse);
        }
        getBadgesInfo();
        UpdateShowBadges();
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
            const isSelected = elem.name == selected?.name && isAlreadySelected;
            tempShowBadge.push(
                <ul className="list-group list-group-flush d-inline-flex" key={elem.name+"-"+index}>
                    <button type="button" className={"list-group-item"} onClick={() => UpdateShowBadges(elem, !isAlreadySelected)}>
                        <img className="" width="40px" height="40px" src={elem.iconPath} alt={elem.iconAlt} />
                        <span className="mx-2">{elem?.label ?? "Badge"}</span>
                        {
                            isSelected &&
                            <div>
                                {elem.description}
                            </div>
                        }
                    </button>
                </ul>
            )
        })
        setShowBadgesState(tempShowBadge);
    }

    //When badgeInfoState change, reset structure (there to allow badgesInfoState to settle on a value)
    useEffect( () => {
        UpdateShowBadges();
    }, [badgesInfoState])


    return (
        <div className="">
            <SingleInfo title={lang.badges}>
                { showBadgesState }
            </SingleInfo>
        </div>
    )
}

export default BadgesSection;