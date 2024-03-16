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

        this.title = raw.name;
        this.breadcrumbTitle = this.getBreadCrumbTitle(raw);
        this.description = raw.description ?? "";
        this.mainImage = !raw.mainImage || raw.mainImage === "" || !raw.mainImage ? {
            url: "/entity-icones/L-format/png/Icone-GrandFormat-Lieu.png",
            alt: this.title,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`,
            isDefault: true
        } : raw.mainImage;

        this.mainImageModel = new Media(this.mainImage);

        this.mainImage.src = this.mainImageModel.src;

        this.type = TYPE_PLACE;

        this.meta = {title: this.title, description: this.description, ...raw.meta};

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

    getBreadCrumbTitle(raw){
        if(raw.address){
            if(raw.name)
                return raw.address + ', ' + raw.name;
            if(raw.city)
                return raw.address + ', ' + raw.city;
            if(raw.postalCode)
                return raw.address + ', ' + raw.postalCode;
            return raw.address //We probably don't want to only show address if there is no city or no postalcode
        }
        if(raw.name){
            if(raw.city)
                return raw.name + ', ' + raw.city
            if(raw.postalCode)
                return raw.name + ', ' + raw.postalCode
            return raw.name //We probably don't want to only show name alone (good for title to show on simple component)
        }
        if(raw.postalCode){
            if(raw.city)
                return raw.postalCode + ', ' + raw.city
        }
        if(raw.longitude && raw.latitude){
            if(raw.city)
                return raw.longitude + ', ' + raw.latitude + ', ' + raw.city
            return raw.longitude + ', ' + raw.latitude
        }

    }

    /****** Static values *********/

    //Icon class to represent the type
    static icon = "icon-icone-lieu";

}

export default Place;