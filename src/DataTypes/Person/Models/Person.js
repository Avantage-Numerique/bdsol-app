import personSimple from "@/DataTypes/Person/Components/layouts/simple/PersonSimple";
import personSingle from "@/DataTypes/Person/Components/layouts/single/PersonSingle";
import EntityModel, {TYPE_DEFAULT} from "@/DataTypes/Entity/models/EntityModel";

export const TYPE_PERSON = "Person";

class Person extends EntityModel {

    constructor(raw, params={}) {
        super(raw);
        this.title = raw.fullname ?? "";
        this.description = raw.description ?? "";
        this.mainImage = raw.mainImage;
        this.type = raw.type === TYPE_PERSON ? TYPE_PERSON : TYPE_DEFAULT;//Wrong data sent here.
        //this.taxonomies = new Map();
        //this.taxonomies.set("domains", raw.domains);
        //this.taxonomies.set("skills", raw.skills);

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = personSimple;
        this.singleComponent = personSingle;

        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
    }

}

export default Person;