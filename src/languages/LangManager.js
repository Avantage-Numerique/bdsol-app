import StringDictionary from "./StringDictionary";

/**
 *
 */
class LangManager {

    static _instance;
    dictionaries = [];

    /**
     *
     */
    constructor() {
        this.dictionaries.push(new StringDictionary("base"));
    }

    /**
     * Singleton
     * @return {*}
     */
    static getInstance() {
        if (LangManager._instance === undefined || LangManager._instance === null) {
            LangManager._instance = new LangManager();
        }
        return LangManager._instance;
    }

}