import EntityModel from "@/DataTypes/Entity/models/EntityModel";
import OrganisationSimple from "@/DataTypes/Organisation/components/layouts/simple/OrganisationSimple";
import Media from "@/DataTypes/Media/models/Media";
import {TYPE_ORGANISATION} from "@/DataTypes/Entity/Types";
import AppRoutes from "@/src/Routing/AppRoutes";

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
        if(raw?.offers) {

            const orderedOffers = raw.offers.length > 0 && raw.offers[0].subMeta?.order ? raw.offers.sort((a,b) => a.subMeta.order - b.subMeta.order) : raw.offers;
            orderedOffers.forEach(offer => {
                if(offer.groupName){
                    list.push(offer.groupName)
                } else {
                    offer.skills.forEach(skill => list.push(skill.name))
                }
            });
        }

        this.simpleEditList(list)
    }

    /****** Static values *********/

    //Icon class to represent the type
    static icon = "icon-icone-organisation";

}

export default Organisation;