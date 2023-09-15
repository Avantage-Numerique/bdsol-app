import React, {useCallback} from "react";
import {lang} from "@/common/Data/GlobalConstants";
import {getModelFromType} from "@/DataTypes/Entity/Types";

/**
 * It's the grid to use in a property that regroupe other entity And showing the entities as tags grid.
 * It use a feed that contain some supra property and the target entity.
 *
 * @param feed {Object} The collection of the entities to put in a grid
 * @param className {string} change the container class with className.
 * @param columnClass {string} add the container of the component simple of the entities with this class.
 * @param subEntityProperty {string} The entity where we can get the data on the relation feed like sponsors.entity
 * @param subBadgeProperty {string} The relation often contain some supra information about the relation. If you this to name or other thing, it will show that relation string. Role, sponsor name.
 * @param noneMessage {string} If set show the target message instead of the lang.noResult value.
 * @return {JSX.Element}
 * @constructor
 */
const EntitiesTagGrid = ({feed, className, columnClass, subEntityProperty, subBadgeProperty, noneMessage}) => {

    const ContainerTag = "ul";
    //subEntityProperty = subEntityProperty ?? 'entity';//

    subBadgeProperty = subBadgeProperty ?? 'name';
    noneMessage = noneMessage ?? lang.noResult;

    const nbColumnsMd = 2;
    const mdColumnMobile = 1;
    const columnsTotal = 12;
    const mobileClasses = `col-${Math.floor(columnsTotal/mdColumnMobile)}`;
    const tabletClasses = `col-md-${Math.floor(columnsTotal/nbColumnsMd)}`;

    const colContainerClass = columnClass ?? `${mobileClasses} ${tabletClasses}`;

    const getKeyString = useCallback((prefix, model, index) => {
        const sep = "-";
        return prefix + model.type + sep + (model._id ?? "") + sep + model.slug + index;
    });

    return (
        <ContainerTag className={`row py-3 ${className ?? ""}`}>
            {
                feed.length > 0 ?
                    feed.map((entity, index) => {
                        const rawData = subEntityProperty ? entity[subEntityProperty] : entity;
                        const type = rawData.type ?? rawData.entityType;
                        const model = getModelFromType(type, rawData);
                        if (model) {
                            model.badge = entity[subBadgeProperty] ?? "";
                            const TagComponent = model.tagComponent;
                            return (
                                <li className={`flex-column ${colContainerClass}`} key={getKeyString("container", model, index)}>
                                    <TagComponent model={model} key={getKeyString("tag", model, index)} />
                                </li>
                            )
                        }
                        //If the model isn't valid on complet. It happen when a model isn't populated.
                        console.error(lang.modelNotValid, rawData);//this is legit console log. Don't remove it unless you found a better way to handle this case <3
                        return (
                            <li className={`flex-column ${colContainerClass} pb-4`} key={"not-valid"+index}>{lang.modelNotValid}</li>
                        )

                    })
                    :
                    <p className={"py-4"}>{noneMessage}</p>
            }
        </ContainerTag>
    )
}

export default EntitiesTagGrid;