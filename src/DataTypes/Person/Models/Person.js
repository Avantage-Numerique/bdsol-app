import personSimple from "@/DataTypes/Person/Components/layouts/simple/PersonSimple";
import personSingle from "@/DataTypes/Person/Components/layouts/single/PersonSingle";

class Person {

    constructor(raw, params={}) {
        this.title = raw.fullname ?? "";
        this.description = raw.description ?? "";
        this.mainImage = raw.mainImage;
        this.type = raw.type === "Person" ? "Person" : false;//Wrong data sent here.
        //this.taxonomies = new Map();
        //this.taxonomies.set("domains", raw.domains);
        //this.taxonomies.set("skills", raw.skills);
        this.meta = {};
        this.status = {};

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;
    }



    getSimpleComponent() {
        return personSimple;
    }

    getSingleComponent() {
        return personSingle;
    }

}

export default Person;