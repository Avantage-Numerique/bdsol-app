import EntityModel, {TYPE_DEFAULT} from "@/DataTypes/Entity/models/EntityModel";
import MediaSingle from "@/DataTypes/Media/layouts/MediaSingle";

export const TYPE_MEDIA = "Media";

class Media extends EntityModel {

    constructor(raw, params={}) {
        super(raw);
        this.title = raw.name ?? "";
        this.description = raw.description ?? "";
        this.mainImage = raw.mainImage;
        this.type = raw.type === TYPE_PROJECT ? TYPE_PROJECT : TYPE_DEFAULT;//Wrong data sent here.
        //this.taxonomies = new Map();
        //this.taxonomies.set("domains", raw.domains);
        //this.taxonomies.set("skills", raw.skills);

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        //this.simpleComponent = MediaSimple;//this is not planned yet. Could be when we do a grid of media in project.
        this.singleComponent = MediaSingle;

        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
    }

}

export default Media;