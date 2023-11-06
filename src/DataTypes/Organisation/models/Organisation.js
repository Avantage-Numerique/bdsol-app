import EntityModel from "@/DataTypes/Entity/models/EntityModel";
import OrganisationSimple from "@/DataTypes/Organisation/components/layouts/simple/OrganisationSimple";
import Media from "@/DataTypes/Media/models/Media";
import {TYPE_ORGANISATION} from "@/DataTypes/Entity/Types";
import AppRoutes from "@/src/Routing/AppRoutes";
import {lang} from "@/common/Data/GlobalConstants";

class Organisation extends EntityModel {

    constructor(raw, params={}) {

        super(raw);

        this.title = raw.name ?? "";
        this.description = raw.description ?? "";
        this.mainImage = !raw.mainImage || raw.mainImage === "" ? {
            url: "/entity-icones/L-format/png/Icone-GrandFormat-Organisation.png",
            alt: raw.name,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`,
            isDefault: true
        } : raw.mainImage;

        this.mainImageModel = new Media(this.mainImage);
        this.type = TYPE_ORGANISATION;

        this.mainImage.src = this.mainImageModel?.src ?? "";
        
        //Class name of the icon entity
        this.icon = "icon-organisation_tiny_icon";

        //this.taxonomies = new Map();
        //this.taxonomies.set("domains", raw.domains);
        //this.taxonomies.set("skills", raw.skills);

        this.meta = {title: this.title, description: this.description, ...raw.meta};

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = OrganisationSimple;

        this.singleRoute = {...AppRoutes.organisationSingle};
        this.singleMediaRoute = {...AppRoutes.organisationSingleMedia};
        this.singleEditRoute = {...AppRoutes.organisationsSingleEdit};
        this.createRoute = {...AppRoutes.organisationsCreate};


        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
        //Set the simple list based on the nature of the component
        let list = []
        if(raw?.offers)
            raw.offers.forEach(offer => {
                if(offer.groupName){
                    list.push(offer.groupName)
                } else {
                    offer.skills.forEach(skill => list.push(skill.name))
                }
            });
        this.simpleEditList(list)
    }

    /****** Static values *********/

    //Icon class to represent the type
    static icon = "icon-organisation_tiny_icon";

}

export default Organisation;