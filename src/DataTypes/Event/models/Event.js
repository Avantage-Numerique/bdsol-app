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
            url: "/general_images/default-event.png",
            alt: raw.name,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`,
            isDefault: true
        } : raw.mainImage;

        this.mainImageModel = new Media(this.mainImage);
        this.type = TYPE_EVENT;

        this.icon.url = "/entity-icones/SM-format/event_tiny_icon.svg"
        this.icon.alt = lang.iconOfEvent;


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