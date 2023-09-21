
const pluck = (array, key) => {
    return array.map(o => o[key]);
}

export {pluck};