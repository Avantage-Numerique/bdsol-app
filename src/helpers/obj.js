
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

export {pluck, haveAValidValue, isEmpty};