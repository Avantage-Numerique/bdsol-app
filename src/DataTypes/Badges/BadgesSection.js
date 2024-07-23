import {useEffect, useState} from "react";
import SingleInfo from "../common/layouts/SingleInfo/SingleInfo";
import {externalApiCache, lang} from "@/src/common/Data/GlobalConstants";
import {clientSideExternalApiRequest, externalApiRequest} from '@/src/hooks/http-hook';
import Tip from "@/src/common/FormElements/Tip/Tip";

const BadgesSection = ({badges, entityLabel, ...props}) => {

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
    
    const UpdateShowBadges = (selected) => {
        //Populate badgeArray for each badge earned by entity
        const badgesArray = [];
        badges.forEach(elem => {
            if(badgesInfoState?.[elem] !== undefined){
                badgesArray.push(badgesInfoState[elem])
            }
        });

        const tempShowBadge = [];
        badgesArray.forEach( (elem, index) => {
            const tip =
            {
                header: "Détails du badge",
                body: entityLabel ? entityLabel + ' ' + elem.description : elem.description.charAt(0).toUpperCase() + elem.description.slice(1)
            }
            tempShowBadge.push(
                <li key={`badge-${index}`} className={"d-flex align-items-center justify-content-start list-group-item p-0 position-relative"}>
                        <img className="" width="40px" height="40px" src={elem.iconPath} alt={elem.iconAlt}/>
                        <span className="mx-2">{elem?.label ?? "Badge"}</span>
                        <Tip className="" {...tip } dontBasePositionOnButton={true}/>
                </li>
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
                <ul>
                    {showBadgesState}
                </ul>
            </SingleInfo>
        </div>
    )
}

export default BadgesSection;

/**
 * Getter of the data from API about the badges supported. Called with GET Method
 * @param fromServer {boolean} is the called is made from the server or from the client.
 * @return {Promise<*|null>}
 */
export const getBadgesInfo = async (fromServer=false) => {
    if (!externalApiCache.has("badgesInfo)")) {
        let badges;
        const badgeFetchConfig = {
            path: "/info/badges",
            params: { method: 'GET' }
        };
        if (fromServer) {
            badges = await externalApiRequest(
                badgeFetchConfig.path,
                badgeFetchConfig.params
            );
        }
        if (!fromServer) {
            badges = await clientSideExternalApiRequest(
                badgeFetchConfig.path,
                badgeFetchConfig.params
            );
        }

        externalApiCache.set("badgesInfo", badges);
    }
    return externalApiCache.get("badgesInfo");
}