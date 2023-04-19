import EntityModel, {TYPE_DEFAULT} from "@/DataTypes/Entity/models/EntityModel";
import ProjectSimple from "@/DataTypes/Project/layouts/simple/ProjectSimple";
import ProjectSingle from "@/DataTypes/Project/layouts/single/ProjectSingle";

export const TYPE_PROJECT = "Project";

class Project extends EntityModel {

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

        this.simpleComponent = ProjectSimple;
        this.singleComponent = ProjectSingle;

        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
    }

}

export default Project;