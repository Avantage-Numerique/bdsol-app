import EntityModel, {TYPE_DEFAULT} from "@/DataTypes/Entity/models/EntityModel";
import OrganisationSimple from "@/DataTypes/Organisation/components/layouts/simple/OrganisationSimple";
import OrganisationSingle from "@/DataTypes/Organisation/components/layouts/single/OrganisationSingle";

export const TYPE_ORGANISATION = "Organisation";

class Organisation extends EntityModel {

    constructor(raw, params={}) {
        super(raw);
        this.title = raw.name ?? "";
        this.description = raw.description ?? "";
        this.mainImage = raw.mainImage;
        this.type = raw.type === TYPE_ORGANISATION ? TYPE_ORGANISATION : TYPE_DEFAULT;//Wrong data sent here.
        //this.taxonomies = new Map();
        //this.taxonomies.set("domains", raw.domains);
        //this.taxonomies.set("skills", raw.skills);

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = OrganisationSimple;
        this.singleComponent = OrganisationSingle;

        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
    }

}

export default Organisation;