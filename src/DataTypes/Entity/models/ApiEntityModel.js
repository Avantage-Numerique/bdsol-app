import { getColor } from "@/src/styles/datatypeStyle";
import { TYPE_ORGANISATION, TYPE_PERSON, TYPE_PROJECT, TYPE_TAXONOMY } from "../Types";



class ApiEntityModel {

    /** @param {object} requestData Response object data. And array of entities */
    static getSelectOption(requestData, field){
        //If requestData is a string
        if(typeof requestData == "string")
            return requestData == "" ? null : [{label: requestData, value: requestData}];
        //If requestData is not an array
        if(requestData.length == undefined)
            return ApiEntityModel.entityTypeHandler(requestData, field)

        //if requestData is an array
        let selectOptions = []
        requestData.forEach(elem => {
            selectOptions.push( ApiEntityModel.entityTypeHandler(elem, field) )
        });
        return selectOptions.flat();
    }

    static entityTypeHandler( entity, field ) {
        switch (entity.type) {
            case TYPE_PERSON :
                if(field == "occupations")
                    return ApiEntityModel.occupationsToSelectOptions( entity.occupations ?? entity );
                if(field == "domains")
                    return ApiEntityModel.domainsToSelectOptions( entity.domain );
                if(field == "fullname")
                    return ApiEntityModel.fullnameToSelectOptions( entity );
                break;
            case TYPE_ORGANISATION :
                if(field == "offers")
                    return ApiEntityModel.occupationsToSelectOptions( entity.offers ?? entity );
                if(field == "name")
                    return ApiEntityModel.nameToSelectOptions( entity );
                break;
            case TYPE_PROJECT :
                if(field == "domains")
                    return ApiEntityModel.domainsToSelectOptions( entity.domain );
                break;
            case TYPE_TAXONOMY :
                    return ApiEntityModel.nameToSelectOptions( entity );
                break;
            default : 
                if(field == "domains")
                    return ApiEntityModel.domainsToSelectOptions( entity );
                return [];
        }
    }

    static occupationsToSelectOptions(elemArray) {
        //If there's no occupations group return []
        if(elemArray == undefined)
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
        if(domains.length == undefined)
            return [{ value : domains.domain._id, label : domains.domain.name, color : getColor(domains.domain) }]
        
        //Else if domains are from request db taxonomies
        return domains.map( (domain) => {
            return [{ value : domain._id, label : domain.name, color : getColor(domain) }]
        })
    }

    static nameToSelectOptions(entity){
        return [{ value : entity._id, label : entity.name, color : getColor(entity) }]
    }
}

export default ApiEntityModel;