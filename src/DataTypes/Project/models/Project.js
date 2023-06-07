import EntityModel, {TYPE_DEFAULT} from "@/DataTypes/Entity/models/EntityModel";
import ProjectSimple from "@/DataTypes/Project/layouts/simple/ProjectSimple";
import ProjectSingleView from "../layouts/single/ProjectSingleView";
import {TYPE_PROJECT} from "@/DataTypes/Entity/Types";
import Media from "@/DataTypes/Media/models/Media";
import AppRoutes from "@/src/Routing/AppRoutes";


class Project extends EntityModel {

    constructor(raw, params={}) {

        super(raw);

        this.title = raw.name ?? "";
        this.description = raw.description ?? "";
        this.mainImage = raw.mainImage?.url !== "" ? {
            url: "/general_images/project-default.webp",
            alt: raw.name,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`
        } : raw.mainImage;

        this.mainImageModel = new Media(this.mainImage);

        this.type = raw.type === TYPE_PROJECT ? TYPE_PROJECT : TYPE_DEFAULT;//Wrong data sent here.

        //this.taxonomies = new Map();
        //this.taxonomies.set("domains", raw.domains);
        //this.taxonomies.set("skills", raw.skills);

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = ProjectSimple;
        this.singleComponent = ProjectSingleView;

        //  Routes associated with single base, single and contribute uri.
        this.repertoryRoute = AppRoutes.projects;
        this.singleRoute = AppRoutes.projectSingle;
        this.singleEditRoute = AppRoutes.projectSingleEdit;
        this.createRoute = AppRoutes.projectCreate;

        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
    }
}

export default Project;