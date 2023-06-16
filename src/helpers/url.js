
/**
 * Generate each crumbs based of the Router URL (as a path).
 * @param path {string} generate from that to segment each part in a différent link
 * @return {array}
 */
const generatePathParts = (path) => {
    if (path !== undefined) {
        const fullPathWIthNoQuery = path.split("?")[0];
        return fullPathWIthNoQuery.split("/")
            .filter(v => v.length > 0);
    }
    return [];
}

/**
 * Take the path as a string  and
 * @param pathname
 * @param replaceWith
 * @return {*}
 */
export const replacePathname = (pathname, replaceWith) => {

    //ReplaceWith : {slug: value}
    const pathParts = generatePathParts(pathname);

    for (const position in pathParts) {
        const pathValueRaw = pathParts[position];
        const pathValue = pathValueRaw.replace("[", "").replace("]", "");
        pathParts[position] = replaceWith && replaceWith[pathValue] ? replaceWith[pathValue] : pathValue;
    }
    return pathParts.join("/");
}

