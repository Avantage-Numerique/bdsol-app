

export const sortDescBy = (property) => {
    return (a, b) => {
        return (a[property] > b[property]) ? -1 : ((a[property] < b[property]) ? 1 : 0);
    }
}

export const sortAscBy = (property) => {
    return (a, b) => {
        return (a[property] < b[property]) ? -1 : ((a[property] > b[property]) ? 1 : 0);
    }
}