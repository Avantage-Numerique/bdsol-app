import EntityModel from "@/DataTypes/Entity/models/EntityModel";
import MediaSingleView from "../components/forms/MediaSingleView/MediaSingleView";
import {TYPE_DEFAULT, TYPE_MEDIA} from "@/DataTypes/Entity/Types";


class Media extends EntityModel {

    /**
     * Media model for the entity in the app.
     * @param raw {object} All the params to setup this.
     * @param raw.type {String} the entity type.
     * @param raw.description {String} Big string.
     * @param raw.mainImage {Object} Main image (Media) of the entity.
     * @param raw.src {string} Media direct src
     * @param raw.alt {string} Media alternate string
     * @param raw.licence {object} Media licence
     * @param raw.simpleComponent {Component} the component for the simple view.
     * @param raw.singleComponent {Component} the component for the single view.
     * @param params {object} pass some params.
     * @param params.single {object} Parameters for the single component
     * @param params.simple {object} Parameters for the simple component
     */
    constructor(raw, params={}) {
        super(raw);
        this.title = raw?.name ?? "";
        this.description = raw?.description ?? "";
        this.mainImage = raw?.mainImage ?? {};
        this.baseSrc = raw?.baseSrc ?? `${process.env.NEXT_PUBLIC_API_URL}`;
        this.src = raw?.url ?? "";
        this.alt = raw?.alt ?? "";
        this.mainImage.src = this.src;
        this.licence = raw?.licence ?? "";
        this.type = raw?.type === TYPE_MEDIA ? TYPE_MEDIA : TYPE_DEFAULT;//Wrong data sent here.
        //this.taxonomies = new Map();
        //this.taxonomies.set("domains", raw.domains);
        //this.taxonomies.set("skills", raw.skills);

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        //this.simpleComponent = MediaSimple;//this is not planned yet. Could be when we do a grid of media in project.
        this.singleComponent = MediaSingleView;

        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
    }

    get src() {
        return this.baseSrc + this._src;
    }
    set src(value) {
        this._src = value;
    }

}

export default Media;