import {TYPE_PERSON, TYPES} from "@/DataTypes/Entity/Types";


export const getDefaultImageByEntityType = (type=TYPE_PERSON) => {
    const typesParams = TYPES.get(type);
    return typesParams.defaultMainImage;
}