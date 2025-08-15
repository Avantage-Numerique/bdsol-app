
const pluck = (array, key) => {
    return array.map(o => o[key]);
}

const haveAValidValue = (obj) => {
    let haveValidPropValue = false;
    for (let prop in obj) {
        const value = obj[prop];
        if (value !== null && typeof value !== "undefined" && value !== "" && !Array.isArray(value)) {
            haveValidPropValue = true;
        }
        if (Array.isArray(value) && value.length > 0) {
            haveValidPropValue = true;
        }
    }
    return haveValidPropValue;
}

const isEmpty = (arr) => {
    return Array.isArray(arr) && arr.length === 0;
}

/**
 * check if we can use the three dots on this object.
 * @param obj {any}
 * @returns {boolean} if the object is iterable or not.
 */
const isIterable = (obj) => {
    return obj != null && typeof obj[Symbol.iterator] === 'function';
}

export {pluck, haveAValidValue, isEmpty, isIterable};