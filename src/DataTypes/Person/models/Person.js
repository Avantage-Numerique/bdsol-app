import PersonSimple from "@/DataTypes/Person/components/layouts/simple/PersonSimple";
import PersonSingleView from "../components/layouts/single/PersonSingleView";
import EntityModel from "@/DataTypes/Entity/models/EntityModel";
import AppRoutes from "@/src/Routing/AppRoutes";
import {TYPE_PERSON} from "@/DataTypes/Entity/Types";
import Media from "@/DataTypes/Media/models/Media";


class Person extends EntityModel {

    constructor(raw, params={}) {

        //  Routes associated with single base, single and contribute uri.
        //raw.repertoryRoute = AppRoutes.persons;
        //raw.singleRoute = AppRoutes.personSingle;
        //raw.contributeRoute = AppRoutes.persons;

        super(raw);

        this.title = (raw.firstName !== "" && raw.lastName) ? raw.firstName + " " + raw.lastName : "";
        this.description = raw.description ?? "";
        this.mainImage = !raw.mainImage || raw.mainImage === "" || !raw.mainImage ? {
            url: "/entity-icones/L-format/png/Icone-GrandFormat-Personne.png",
            alt: this.title,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`,
            isDefault: true
        } : raw.mainImage;

        this.mainImageModel = new Media(this.mainImage);

        this.mainImage.src = this.mainImageModel.src;

        this.type = TYPE_PERSON;

        this.meta = {title: this.title, description: this.description, ...raw.meta};
        this.setUsersMetas();

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = PersonSimple;
        this.singleComponent = PersonSingleView;

        //Routing
        this.singleRoute = {...AppRoutes.personSingle};
        this.singleMediaRoute = {...AppRoutes.personSingleMedia};
        this.singleEditRoute = {...AppRoutes.personSingleEdit};
        this.createRoute = {...AppRoutes.personCreate};

        //sets all the rest as this[key] = raw[key] value.
        this.setProperties(raw);

        //Set the simple list based on the nature of the component
        let list = []
        if(raw?.occupations) {
            const orderedOccupation = raw.occupations.length > 0 && raw.occupations[0].subMeta?.order ? raw.occupations.sort((a,b) => a.subMeta.order - b.subMeta.order) : raw.occupations;
            orderedOccupation.forEach(occ => {
                if(occ.groupName){
                    list.push(occ.groupName)
                } else {
                    occ.skills.forEach(skill => list.push(skill.name))
                }
            });
        }
        this.simpleEditList(list) 

    }

    /****** Static values *********/

    //Icon class to represent the type
    static icon = "icon-person_tiny_icon";
}

export default Person;