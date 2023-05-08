import React, {useCallback} from "react";
import Person from "@/DataTypes/Person/Models/Person";
import Organisation from "@/DataTypes/Organisation/models/Organisation";
import Project from "@/DataTypes/Project/models/Project";
import {lang} from "@/common/Data/GlobalConstants";
import {TYPE_DEFAULT, TYPE_ORGANISATION, TYPE_PERSON, TYPE_PROJECT} from "@/DataTypes/Entity/Types";
import EntityModel from "@/DataTypes/Entity/models/EntityModel";

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

    const entities = new Map();
    entities.set(TYPE_PERSON, Person);
    entities.set(TYPE_ORGANISATION, Organisation);
    entities.set(TYPE_PROJECT, Project);
    entities.set(TYPE_DEFAULT, EntityModel);

    const colContainerClass = columnClass ?? "col g-3";

    const getKeyString = useCallback((prefix, model, index) => {
        const sep = "-";
        return prefix + model.type + sep + (model._id ?? "") + sep + model.slug + index;
    });

    return (
        <ContainerTag className={className}>
            {
                feed.length > 0 ?
                feed.map((entity, index) => {
                    const modelClass = entity.type ? entities.get(entity.type) : entities.get(TYPE_DEFAULT);
                    if (modelClass) {
                        const model = new modelClass(entity);
                        const SimpleComponent = model.simpleComponent;
                        return (
                            <div className={`${colContainerClass}`} key={getKeyString("container", model, index)}>
                                <SimpleComponent data={entity} model={model} key={getKeyString("simple", model, index)} />
                            </div>
                        )
                    }
                    return (
                        <div key={`container${index}`}>empty</div>
                    )
                })
                :
                <h5 className={"py-4"}>{lang.noResult}</h5>
            }
        </ContainerTag>
    )
}

export default EntitiesGrid;