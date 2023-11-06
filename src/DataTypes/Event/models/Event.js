import EntityModel from "@/DataTypes/Entity/models/EntityModel";

import EventSingleView from "../component/layout/single/EventSingleView";
import {TYPE_EVENT} from "@/DataTypes/Entity/Types";
import Media from "@/DataTypes/Media/models/Media";
import AppRoutes from "@/src/Routing/AppRoutes";
import EventSimple from "../component/layout/simple/EventSimple";
import {lang} from "@/common/Data/GlobalConstants";


class Event extends EntityModel {

    constructor(raw, params={}) {

        super(raw);

        this.title = raw.name ?? "";
        this.description = raw.description ?? "";
        this.mainImage = !raw.mainImage || raw.mainImage === "" ? {
            url: "/entity-icones/L-format/png/Icone-GrandFormat-Evenement.png",
            alt: raw.name,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`,
            isDefault: true
        } : raw.mainImage;

        this.mainImageModel = new Media(this.mainImage);
        this.type = TYPE_EVENT;

        //Class name of the icon entity
        this.icon = "icon-event_tiny_icon";


        this.meta = {title: this.title, description: this.description, ...raw.meta};

        //this.taxonomies = new Map();
        //this.taxonomies.set("domains", raw.domains);
        //this.taxonomies.set("skills", raw.skills);

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = EventSimple;
        this.singleComponent = EventSingleView;

        //  Routes associated with single base, single and contribute uri.
        this.repertoryRoute = {...AppRoutes.events};
        this.singleRoute = {...AppRoutes.eventSingle};
        this.singleMediaRoute = {...AppRoutes.eventSingleMedia};
        this.singleEditRoute = {...AppRoutes.eventSingleEdit};
        this.createRoute = {...AppRoutes.eventCreate};

        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
    }
}

export default Event;