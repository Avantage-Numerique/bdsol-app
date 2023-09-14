
export const getDefaultEntityMeta = (user) => {
    return {
        state: "pending",
        lastModifiedBy: user.id,
        requestedBy: user.id
    }
}

export const getDefaultUpdateEntityMeta = (user) => {
    return getDefaultEntityMeta(user);
}
export const getDefaultCreateEntityMeta = (user) => {
    return getDefaultEntityMeta(user);
}