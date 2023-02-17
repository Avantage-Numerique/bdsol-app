
export const getDefaultEntityStatus = (user) => {
    return {
        state: "pending",
        lastModifiedBy: user.id,
        requestedBy: user.id
    }
}

export const getDefaultUpdateEntityStatus = (user) => {
    return getDefaultEntityStatus(user);
}
export const getDefaultCreateEntityStatus = (user) => {
    return getDefaultEntityStatus(user);
}