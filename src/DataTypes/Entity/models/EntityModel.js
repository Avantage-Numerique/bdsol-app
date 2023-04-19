
export const TYPE_ABSTRACT = "Entity";
export const TYPE_DEFAULT = TYPE_ABSTRACT;

class EntityModel {

    /**
     * Abstract model for the entity in the app.
     * @param raw {object} All the params to setup this.
     * @param raw.simpleConponent {Component} the component for the simple view.
     * @param raw.singleComponent {Component} the component for the single view.
     * @param params {object} pass some params.
     */
    constructor(raw, params={}) {

        this._type = raw.type ?? TYPE_DEFAULT;

        this._simpleComponent = raw.simpleComponent ?? undefined;
        this._singleComponent = raw.singleComponent ?? undefined;
    }


    //  GETTER / SETTER

    /**
     * Get the type of the current model
     * @return {*|string}
     */
    get type () {
        return this._type;
    }

    /**
     * Get the simple component
     * @return {*}
     */
    get simpleComponent() {
        return this._simpleComponent;
    }

    /**
     * Get the single component
     * @return {*}
     */
    get singleComponent() {
        return this._singleComponent;
    }


    //  UTILS

    /**
     * Declare all the model property to be accessible to it.
     * @param raw {object} the raw data to declare property from.
     */
    setProperties(raw) {
        for (const key in raw) {
            this.defineModelProperty(key, raw[key]);
        }
    }


    /**
     * Set all the properties into this scope
     * @param property {string}
     * @param value {any}
     * @return none
     */
    defineModelProperty(property, value) {
        if (!this.hasOwnProperty(key)) {
            Object.defineProperty(this, property, {
                value: value,
                enumerable: true,
                configurable: true,
            });
        }
    }

}

export default EntityModel;