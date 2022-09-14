

// LocalStorage Callbacks.


export const setLocalStorage = (objectName, value) => {
    localStorage.setItem(objectName, JSON.stringify(value));
};


export const getLocalStorage = (objectName) => {
    const storedData = localStorage.getItem(objectName);
    if (storedData) return JSON.parse(storedData);

    return null;
};


export const deleteTargetLocalStorage = (objectName) => {
    localStorage.removeItem(objectName);
};


export const isLocalStorageAccessible = () => {
    return localStorage !== null;
}