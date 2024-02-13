import React, {useCallback} from "react";
import {lang} from "@/common/Data/GlobalConstants";
import {getModelFromType} from "@/DataTypes/Entity/Types";

/**
 * It's the grid to use in the repertory view.
 * @param feed {Object} The collection of the entities to put in a grid
 * @param className {string} change the container class with className.
 * @param columnClass {string} add the container of the component simple of the entities with this class.
 * @return {JSX.Element}
 * @constructor
 */
const EntitiesGrid = ({feed, className, columnClass}) => {
    const ContainerTag = "div";

    const colContainerClass = columnClass ?? "col g-3";

    const getKeyString = useCallback((prefix, model, index) => {
        const sep = "-";
        return prefix + model.type + sep + (model._id ?? "") + sep + model.slug + index;
    });

    const customStyling = {'maxWidth': '24rem'}
    
    return (
        <ContainerTag className={className + ' justify-content-center'}>
            {
                feed.length > 0 ?
                feed.map((entity, index) => {
                    const model = getModelFromType(entity.type, entity);
                    const SimpleComponent = model.simpleComponent;
                    return (
                        <div style={customStyling} className={`${colContainerClass}`} key={getKeyString("container", model, index)}>
                            <SimpleComponent data={entity} model={model} key={getKeyString("simple", model, index)} />
                        </div>
                    )
                })
                :
                <h5 className={"py-4"}>{lang.noResult}</h5>
            }
        </ContainerTag>
    )
}

export default EntitiesGrid;