


class ApiEntityModel {

    /** @param {object} requestData Response object data. And array of entities */
    static getSelectOption(requestData, field){
        console.log("request data", requestData)
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
        console.log("selectOptions", selectOptions.flat())
        return selectOptions.flat();
    }

    static entityTypeHandler( entity, field ) {
        switch (entity.type) {
            case "Person" :
                if(field == "occupations")
                    return ApiEntityModel.occupationsToSelectOptions( entity.occupations ?? entity );
                if(field == "domains")
                    return ApiEntityModel.domainsToSelectOptions( entity.domains );
                if(field == "fullname")
                    return ApiEntityModel.fullnameToSelectOptions( entity );
                break;
            case "Organisation" :
                if(field == "offers")
                    return ApiEntityModel.occupationsToSelectOptions( entity.offers ?? entity );
                if(field == "name")
                    return ApiEntityModel.nameToSelectOptions( entity );
                break;
            case "Project" :
                break;
            case "Taxonomy" :
                    return ApiEntityModel.nameToSelectOptions( entity );
                break;
            default : return [];
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
                    options.push( { value : skill._id, label : skill.name } )
                })
            )
            return options;
        }
        else
            return []
    }

    static fullnameToSelectOptions(entity){
        return { value : entity._id, label : entity.firstName + ' ' + entity.lastName }
    }

    static domainsToSelectOptions(domains){
        return domains.map( (domain) => {
            return { value : domain._id, label : domain.name }
        })
    }

    static nameToSelectOptions(entity){
        return { value : entity._id, label : entity.name }
    }
}

export default ApiEntityModel;