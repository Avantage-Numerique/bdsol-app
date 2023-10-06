
export const getDefaultEntityMeta = (user, requestedByUser) => {
    const meta = {
        state: "pending",
        lastModifiedBy: user.id,
        requestedBy : requestedByUser
    };
    return meta;
}

export const getDefaultUpdateEntityMeta = (user, requestedByUser) => {
    return getDefaultEntityMeta(user, requestedByUser._id);
}
export const getDefaultCreateEntityMeta = (user) => {
    return getDefaultEntityMeta(user, user.id);
}