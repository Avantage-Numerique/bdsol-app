import PersonSimple from "@/DataTypes/Person/Components/layouts/simple/PersonSimple";
import PersonSingle from "@/DataTypes/Person/Components/layouts/single/PersonSingle";
import EntityModel, {TYPE_DEFAULT} from "@/DataTypes/Entity/models/EntityModel";
import AppRoutes from "@/src/Routing/AppRoutes";
import {TYPE_PERSON} from "@/DataTypes/Entity/Types";


class Person extends EntityModel {

    constructor(raw, params={}) {

        //  Routes associated with single base, single and contribute uri.
        raw.repertoryRoute = AppRoutes.persons;
        raw.singleRoute = AppRoutes.personSingle;
        raw.contributeRoute = AppRoutes.persons;

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

        this.simpleComponent = PersonSimple;
        this.singleComponent = PersonSingle;



        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
    }

}

export default Person;