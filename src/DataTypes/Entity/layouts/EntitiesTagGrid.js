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
 * @param numberOfCols {number} the number of column to use for it.
 * @param forceType {string} to avoid gettin gthe type from the data, force it.
 * @param notes {string} pass some string for tests or somethings.
 * @return {JSX.Element}
 * @constructor
 */
const EntitiesTagGrid = ({feed, className, columnClass, subEntityProperty, subBadgeProperty, noneMessage, numberOfCols, forceType, notes, regularFlexWrapping}, ...props) => {

    const ContainerTag = "ul";
    //subEntityProperty = subEntityProperty ?? 'entity';//

    subBadgeProperty = subBadgeProperty ?? '';
    noneMessage = noneMessage ?? lang.noResult;

    const nbColumnsLg = numberOfCols ?? 2;
    const nbColumnsMd = numberOfCols ?? 1;
    const mdColumnMobile = 1;
    const columnsTotal = 12;
    const feedLength = feed.length;
    const numberOfRows = Math.floor(feedLength / nbColumnsMd);

    const mobileClasses = `col-${Math.floor(columnsTotal/mdColumnMobile)}`;
    const tabletClasses = `col-md-${Math.floor(columnsTotal/nbColumnsMd)}`;
    const largeClasses = `col-lg-${Math.floor(columnsTotal/nbColumnsLg)}`;

    const colContainerClass = columnClass ?? `${mobileClasses} ${tabletClasses} ${largeClasses}`;

    const forcedType = forceType ?? false;

    const getKeyString = useCallback((prefix, model, index) => {
        const sep = "-";
        return prefix + model.type + sep + (model._id ?? "") + sep + model.slug + index;
    });

    //Using this instead of pt-3 because it is impossible to overide a pt-3 with something smaller passed in the className
    const style = {paddingTop: "1rem"}

    return (
        <ContainerTag style={style} className={`${regularFlexWrapping ? "d-flex flex-wrap justify-content-start" : "row"} ${className ?? ""}`}>
            {
                (Array.isArray(feed) && feedLength > 0) ?
                    feed.map((entity, index) => {
                        const rawData = subEntityProperty ? entity[subEntityProperty] : entity;
                        const entityType = rawData?.type ?? rawData.entityType;
                        const type = typeof forcedType === "string" ? forcedType : entityType;//forced type can be use if the data doesn't contain the types.

                        const model = getModelFromType(type, rawData);

                        //const isLastRow = index >= (feedLength - nbColumnsMd);
                        //const spacingClasses = !isLastRow ? 'pb-4' : '';
                        if (model) {
                            model.badge = entity[subBadgeProperty] ?? "";
                            const TagComponent = model.tagComponent;
                            return (
                                <li className={`d-flex flex-wrap justify-content-start ${!regularFlexWrapping && colContainerClass} pb-4`} key={getKeyString("container", model, index)}>
                                    <TagComponent model={model} key={getKeyString("tag", model, index)} className={"w-100"} />
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
                <p className={"py-4"}> {noneMessage} </p>
            }
        </ContainerTag>
    )
}

export default EntitiesTagGrid;