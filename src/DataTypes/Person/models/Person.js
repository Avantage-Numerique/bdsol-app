import PersonSimple from "@/DataTypes/Person/components/layouts/simple/PersonSimple";
import PersonSingle from "@/DataTypes/Person/components/layouts/single/PersonSingle";
import EntityModel from "@/DataTypes/Entity/models/EntityModel";
import AppRoutes from "@/src/Routing/AppRoutes";
import {TYPE_DEFAULT, TYPE_PERSON} from "@/DataTypes/Entity/Types";


class Person extends EntityModel {

    constructor(raw, params={}) {

        //  Routes associated with single base, single and contribute uri.
        //raw.repertoryRoute = AppRoutes.persons;
        //raw.singleRoute = AppRoutes.personSingle;
        //raw.contributeRoute = AppRoutes.persons;

        super(raw);

        this.title = raw.firstName + " " + raw.lastName ?? "";
        this.description = raw.description ?? "";
        this.mainImage = !raw.mainImage || raw.mainImage === "" || !raw.mainImage ? {
            url: "/general_images/person-default.webp",
            alt: this.title,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`
        } : raw.mainImage;

        //this.mainImageModel = new Media(this.mainImage);

        this.type = raw.type === TYPE_PERSON ? TYPE_PERSON : TYPE_DEFAULT;//Wrong data sent here.

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = PersonSimple;
        this.singleComponent = PersonSingle;

        //Routing
        this.singleRoute = AppRoutes.personSingle;
        this.singleEditRoute = AppRoutes.personSingleEdit;
        this.createRoute = AppRoutes.personCreate;


        //sets all the rest as this[key] = raw[key] value.
        this.setProperties(raw);
    }

}

export default Person;