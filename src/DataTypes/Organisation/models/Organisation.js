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
            url: "/general_images/default-organisation.png",
            alt: raw.name,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`,
            isDefault: true
        } : raw.mainImage;

        this.mainImageModel = new Media(this.mainImage);
        this.type = TYPE_ORGANISATION;

        //this.taxonomies = new Map();
        //this.taxonomies.set("domains", raw.domains);
        //this.taxonomies.set("skills", raw.skills);

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = OrganisationSimple;

        this.singleRoute = {...AppRoutes.organisationSingle};
        this.singleMediaRoute = {...AppRoutes.organisationSingleMedia};
        this.singleEditRoute = {...AppRoutes.organisationsSingleEdit};
        this.createRoute = {...AppRoutes.organisationsCreate};


        //sets all the rest as a this[key] = raw[key] value.
        this.setProperties(raw);
    }

}

export default Organisation;