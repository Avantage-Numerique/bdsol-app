import React from "react";
import Person, {TYPE_PERSON} from "@/DataTypes/Person/Models/Person";
import Organisation, {TYPE_ORGANISATION} from "@/DataTypes/Organisation/models/Organisation";

/**
 * It's the grid to use in the repertory view.
 * @param feed {Object} The collection of the entities to put in a grid
 * @param className {string} change the container class with className.
 * @param columnClass {string} add the container of the component simple of the entities with this class.
 * @return {JSX.Element}
 * @constructor
 */
const EntitiesGrid = ({feed, className, columnClass}) => {

    const entities = new Map();
    entities.set(TYPE_PERSON, Person);
    entities.set(TYPE_ORGANISATION, Organisation);

    const colContainerClass = columnClass ?? "col g-3";

    return (
        <div className={className}>
            {
                feed.length > 0 &&
                feed.map((entity, index) => {

                    const modelClass = entities.get(entity.type);
                    const model = new modelClass(entity);
                    const SimpleComponent = model.simpleComponent;
                    return (
                        <div className={`${colContainerClass}`} key={"container"+model.type+model._id + "-" + model.slug+index}>
                            <SimpleComponent data={model} key={"simple"+model.type+model._id + "-" + model.slug+index} />
                        </div>
                    )
                })
            }
        </div>

    )
}

export default EntitiesGrid;