/**
 * String management for internationalization in the app.
 * This is a dictionary design pattern. We instanciate the object, load an object as a dictionnary, applay all the keys to the dictionary scope and
 * Then we can access to dictionary.stringKey directly without having to use, dictionary.base.stringKey
 *
 * When we would need to optmize this, we could need to use po/mo instead, and this package can be useful : https://lingui.js.org/
 */
export default class StringDictionary {

    static _instance;

    language;
    dictionnary;
    filepath;

    constructor(file, lang="fr-ca") {
        //will need some refactor to load multiple file.
        this.language = lang;
        this.filepath = `./${this.language}/`;
        this.loadDictionary(file);
    }

    static getInstance(file, lang="fr-ca") {
        if (StringDictionary._instance === undefined || StringDictionary._instance === null) {
            StringDictionary._instance = new StringDictionary(file, lang);
        }
        return StringDictionary._instance;
    }

    setLanguage(lang) {
        this.language = lang;
    }

    loadDictionary(filename) {
        const dictionary = require(this.filepath + filename + ".js");
        this.setDictionnary(dictionary.base);
    }

    setDictionnary(dictionnary) {
        this.dictionnary = dictionnary;
        this.setAliases();
    }

    /**
     * Without alias
     * @param key
     * @return {*}
     */
    getString(key) {
        return this.dictionnary[key] ?? key;
    }

    /**
     *
     */
    setAliases() {
        for (const key in this.dictionnary) {
            this.syncDictionnaryString(key, this.dictionnary, this.dictionnary[key]);
        }
    }

    /**
     * Set all the properties into this scope
     * @param property
     * @param dictionnary
     * @param string
     * @return {*}
     */
    syncDictionnaryString(property, dictionnary, string) {
        Object.defineProperty(this, property, {
            value: string,
            enumerable: true,
            configurable: true,
        });
    }

}