import React, {useCallback} from "react";
import {lang} from "@/common/Data/GlobalConstants";
import {getModelFromType} from "@/DataTypes/Entity/Types";

/**
 * It's the grid to use in the repertory view.
 * @param feed {Object} The collection of the entities to put in a grid
 * @param noResult Text to replace default if feed is empty. 
 * @param className {string} change the container class with className.
 * @param columnClass {string} add the container of the component simple of the entities with this class.
 * @param badgesInfo {object} badges informations to display badges from entity.badges.
 * @return {JSX.Element}
 * @constructor
 */
const EntitiesGrid = ({feed, className, columnClass, noResult, badgesInfo}) => {
    const ContainerTag = "div";

    const colContainerClass = columnClass ?? "g-4";//"col-12 col-sm-6 col-lg-4 col-xl-3 g-4";

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
                    if (entity !== null) {//check that because upward from drilling here could send sont element null.
                        const model = getModelFromType(entity.type, entity);
                        const SimpleComponent = model.simpleComponent;
                        return (
                            <div style={customStyling} className={`${colContainerClass}`} key={getKeyString("container", model, index)}>
                                <SimpleComponent
                                    data={entity}
                                    model={model}
                                    key={getKeyString("simple", model, index)}
                                    badgesInfo={badgesInfo}
                                    />
                            </div>
                        )
                    }
                })
                :
                <h5 className={"py-4"}>{noResult ?? lang.noResult}</h5>
            }
        </ContainerTag>
    )
}

export default EntitiesGrid;