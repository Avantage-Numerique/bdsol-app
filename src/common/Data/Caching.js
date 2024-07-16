/**
 * Store request and data here to avoid multiple fetch.
 */
class Caching {

    cacheObjects;

    constructor() {
        this.cacheObjects = {};
        console.log("Caching initiated");
    }

    /**
     * register the key into a property and set the key's value into the cacheObject
     * @param key
     * @param value
     */
    set(key, value) {
        this.register(key, value);
        this.cacheObjects[key] = value;
    }

    /**
     * Basic get from string
     * @param key {string}
     * @return {*|null}
     */
    get(key) {
        if (this.has(key)) {
            return this.cacheObjects[key];
        }
        return null;
    }

    /**
     * boolean check if the key have allready a value.
     * @param key {string}
     * @return {boolean}
     */
    has(key) {
        console.log("has", key, (key in this.cacheObjects), "have a value", typeof this.cacheObjects[key]);
        return (key in this.cacheObjects);
    }

    /**
     * Register the key as a property of the caching object assigning to the that class get / set.
     * @param key {string} the string value of the cache elements.
     * @param value {*} what need to be cached
     * @return {*}
     */
    register (key, value) {
        if (!this[key]) {
            Object.defineProperty(this, key, {
                get() {
                    return this.get(key);
                },
                set(newvalue) {
                    this.set(key, newvalue);
                },
                enumerable: true,
                configurable: true,
            });
        }
    }
}

export default Caching;