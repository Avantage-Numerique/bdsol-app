/**
 * @property versions {Array<Version>}
 */
export default class Versions {
    versions = [];

    constructor(versions) {
        this.versions = Array.isArray(versions) && versions.length > 0 ? versions : [];
    }

    //add version
}