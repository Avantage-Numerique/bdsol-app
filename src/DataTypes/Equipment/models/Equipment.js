import EquipmentSimple from "../components/layouts/simple/EquipmentSimple";
import EquipmentSingleView from "../components/layouts/single/EquipmentSingleView";
import EntityModel from "@/DataTypes/Entity/models/EntityModel";
import AppRoutes from "@/src/Routing/AppRoutes";
import {TYPE_EQUIPMENT} from "@/DataTypes/Entity/Types";
import Media from "@/DataTypes/Media/models/Media";


class Equipment extends EntityModel {

    constructor(raw, params={}) {

        super(raw);

        this.title = raw.label ?? "";
        this.description = raw.description ?? "";
        this.mainImage = !raw.mainImage || raw.mainImage === "" || !raw.mainImage ? {
            url: "/general_images/default-equipment.png",
            alt: this.title,
            baseSrc: `${process.env.NEXT_PUBLIC_APP_URL}`,
            isDefault: true
        } : raw.mainImage;

        this.mainImageModel = new Media(this.mainImage);

        this.mainImage.src = this.mainImageModel.src;

        this.type = TYPE_EQUIPMENT;

        //Class name of the icon entity
        this.icon = "icon-equipment";

        this.meta = {title: this.title, description: this.description, ...raw.meta};

        params.showMeta = params.showMeta ?? true;
        params.showStatus = params.showStatus ?? true;

        this.simpleComponent = EquipmentSimple;
        this.singleComponent = EquipmentSingleView;

        //Routing
        this.singleRoute = {...AppRoutes.equipmentSingle};
        this.singleMediaRoute = {...AppRoutes.equipmentSingleMedia};
        this.singleEditRoute = {...AppRoutes.equipmentSingleEdit};
        this.createRoute = {...AppRoutes.equipmentCreate};


        //sets all the rest as this[key] = raw[key] value.
        this.setProperties(raw);
    }

}

export default Equipment;