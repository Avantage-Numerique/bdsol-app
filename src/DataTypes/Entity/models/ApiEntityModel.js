import {getColor} from "@/src/styles/datatypeStyle";
import {
    TYPE_EQUIPMENT,
    TYPE_EVENT,
    TYPE_ORGANISATION,
    TYPE_PERSON,
    TYPE_PLACE,
    TYPE_PROJECT,
    TYPE_TAXONOMY
} from "../Types";


class ApiEntityModel {

    /**
     * @param {object} requestData Response object data. And array of entities
     * @param {object} field Response object data. And array of entities
     * @parem field {any}
     * */
    static getSelectOption(requestData, field){
        //If requestData is a string
        if(typeof requestData == "string")
            return requestData === "" ? null : [{label: requestData, value: requestData}];
        //If requestData is not an array
        if(!Array.isArray(requestData))
            return ApiEntityModel.entityTypeHandler(requestData, field)

        //if requestData is an array, check not empty
        if(requestData?.length === 0)
            return [];
        //parse option for every item
        let selectOptions = []
        requestData.forEach(elem => {
            selectOptions.push( ApiEntityModel.entityTypeHandler(elem, field) )
        });
        return selectOptions.flat();
    }

    static entityTypeHandler( entity, field ) {
        switch (entity?.type) {
            case TYPE_PERSON :
                if(field === "occupations")
                    return ApiEntityModel.occupationsToSelectOptions( entity.occupations ?? entity );
                if(field === "domains")
                    return ApiEntityModel.domainsToSelectOptions( entity.domain );
                if(field === "fullname")
                    return ApiEntityModel.fullnameToSelectOptions( entity );
                break;
            case TYPE_ORGANISATION :
                if(field === "offers")
                    return ApiEntityModel.occupationsToSelectOptions( entity.offers ?? entity );
                if(field === "name")
                    return ApiEntityModel.nameToSelectOptions( entity );
                break;
            case TYPE_PROJECT :
                if(field === "domains")
                    return ApiEntityModel.domainsToSelectOptions( entity.domain );
                break;
            case TYPE_TAXONOMY :
                    return ApiEntityModel.nameToSelectOptions( entity );
                break;
            case TYPE_EVENT :
                    return ApiEntityModel.nameToSelectOptions( entity );
                break;
            case TYPE_PLACE :
                    return ApiEntityModel.locationToSelectOptions( entity );
                break;
            case TYPE_EQUIPMENT :
                    return ApiEntityModel.equipmentToSelectOptions( entity );
                break;

            default : 
                if(field === "domains")
                    return ApiEntityModel.domainsToSelectOptions( entity );
                return [];
        }
    }

    static occupationsToSelectOptions(elemArray) {
        //If there's no occupations group return []
        if(elemArray === undefined)
            return []
        
        //For each occupations group, transmute every skills into options
        if(elemArray.length > 0) {
            let options = [];
            elemArray.forEach( (elem) =>
                elem.skills.forEach( (skill) => {
                    options.push( { value : skill._id, label : skill.name, color : getColor(skill) } )
                })
            )
            return options;
        }
        else
            return []
    }

    static fullnameToSelectOptions(entity){
        return [{ value : entity._id, label : entity.firstName + ' ' + entity.lastName, color : getColor(entity) }]
    }

    static domainsToSelectOptions(domains){
        //If domains is from entity formState
        if(domains?.length === undefined && domains?.domain)
            return [{ value : domains.domain._id, label : domains.domain.name, color : getColor(domains.domain) }]

        if (Array.isArray(domains)) {
            //Else if domains are from request db taxonomies
            return domains.map( (domain) => {
                if (domain !== null) {
                    return [{ value : domain._id, label : domain.name, color : getColor(domain) }]
                }
                return null;
            });
        }

        return;
    }

    static equipmentToSelectOptions(equipment){
        //If domains is from entity formState
        if(!Array.isArray(equipment)) {
            return [{ value : equipment._id, label : equipment.label, color : getColor(equipment) }];
        }
        
        //Else if domains are from request db taxonomies
        return equipment.map( (equipment) => {
            return [{ value : equipment._id, label : equipment.label, color : getColor(equipment) }]
        })
    }

    static nameToSelectOptions(entity){
        return [{ value : entity._id, label : entity.name, color : getColor(entity) }]
    }

    static locationToSelectOptions(entity){
        if(entity.address)
            return [{ value: entity._id, label : entity.address + ', ' + entity.name}]
        else
            return [{ value: entity._id, label : entity.name}]
    }
}

export default ApiEntityModel;