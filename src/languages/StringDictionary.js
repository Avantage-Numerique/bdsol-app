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
    dictionary;
    dictionaries = [];
    dictionaryFiles = [];
    filepath;

    constructor(file, lang="fr-ca")
    {
        //will need some refactor to load multiple file.
        this.language = lang;
        this.filepath = `./${this.language}/`;

        if (typeof file === "string") {
            this.loadDictionary(file);
        }

        if (typeof file === "object") {
            this.setDictionaryFiles(file);
        }
    }

    static getInstance(file, lang="fr-ca") {
        if (StringDictionary._instance === undefined || StringDictionary._instance === null) {
            StringDictionary._instance = new StringDictionary(file, lang);
        }
        return StringDictionary._instance;
    }


    setLanguage(lang) {
        this.language = lang;
        this.filepath = `./${this.language}/`;
        this.loadDictionary(file);
    }


    setDictionaryFiles(files) {
        this.dictionaryFiles = files;
        this.loadDictionaries();
    }


    loadDictionaries() {
        if (this.dictionaries.length === 0 && this.dictionaryFiles.length > 0)
        {
            for (const dictionaryFile of this.dictionaryFiles) {
                this.loadDictionary(dictionaryFile);
            }
        } else {
            for (const dictionary of this.dictionaries) {
                this.setDictionary(dictionary);
            }
        }
    }


    loadDictionary(filename) {
        const dictionary = require(this.filepath + filename + ".js");
        const dictionaryObject = dictionary[filename];
        if (dictionaryObject) {
            this.setDictionary(dictionaryObject);
        }
    }


    setDictionary(dictionnary) {
        this.dictionary = dictionnary;
        this.dictionaries.push(dictionnary);
        this.setAliases(dictionnary);
    }


    /**
     * Without alias
     * @param key
     * @return {*}
     */
    getString(key) {
        //return this.dictionary[key] ?? key;//this must be reimplemented for multiple files.
    }


    /**
     *
     */
    setAliases(dictionary) {
        for (const key in dictionary) {
            this.syncDictionaryString(key, dictionary, dictionary[key]);
        }
    }

    /**
     * Get the target key but with the first letter capitalized.
     * @param key {string} Target key sets in one of the files for strings.
     * @returns {string}
     */
    capitalize(key) {
        const str = this[key] ?? key;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Get the target key but with the first letter capitalized.
     * @param key {string} Target key sets in one of the files for strings.
     * @returns {string}
     */
    lowerize(key) {
        const str = this[key] ?? key;
        return str.charAt(0).toLowerCase() + str.slice(1);
    }


    /**
     * Set all the properties into this scope
     * @param property
     * @param dictionary
     * @param string
     * @return {*}
     */
    syncDictionaryString(property, dictionary, string) {
        Object.defineProperty(this, property, {
            value: string,
            enumerable: true,
            configurable: true,
        });
    }
}