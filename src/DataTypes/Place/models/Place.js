import PlaceSimple from "../components/layouts/simple/PlaceSimple";
import PlaceSingleView from "../components/layouts/single/PlaceSingleView";
import EntityModel from "@/DataTypes/Entity/models/EntityModel";
import AppRoutes from "@/src/Routing/AppRoutes";
import {TYPE_PLACE} from "@/DataTypes/Entity/Types";
import Media from "@/DataTypes/Media/models/Media";


class Place extends EntityModel {

    constructor(raw, params={}) {

        //  Routes associated with single base, single and contribute uri.
        //raw.repertoryRoute = AppRoutes.persons;
        //raw.singleRoute = AppRoutes.personSingle;
        //raw.contributeRoute = AppRoutes.persons;

        super(raw);

        this.title = raw.name ?? "";
        this.description = raw.description ?? "";
        this.mainImage = !raw.mainImage || raw.mainImage === "" || !raw.mainImage ? {
            url: "/general_images/default-place.png",
            alt: this.title,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`,
            isDefault: true
        } : raw.mainImage;

        this.mainImageModel = new Media(this.mainImage);

        this.mainImage.src = this.mainImageModel.src;

        this.type = TYPE_PLACE;

        this.meta.title = this.title;
        this.meta.description = this.description;

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = PlaceSimple;
        this.singleComponent = PlaceSingleView;

        //Routing
        this.singleRoute = {...AppRoutes.placeSingle};
        this.singleMediaRoute = {...AppRoutes.placeSingleMedia};
        this.singleEditRoute = {...AppRoutes.placeSingleEdit};
        this.createRoute = {...AppRoutes.placeCreate};


        //sets all the rest as this[key] = raw[key] value.
        this.setProperties(raw);
    }

}

export default Place;