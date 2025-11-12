import DefaultTemplate from "@/layouts/Templates/DefaultTemplate";
import FullWidthTemplate from "@/layouts/Templates/FullWidthTemplate";

const templatesEnum = {
    DEFAULT: "default",
    FULL_WIDTH: "fullWidth",
};

const templates = new Map();
templates.set(templatesEnum.DEFAULT, {
    Component: DefaultTemplate,
    props: {},
});

templates.set(templatesEnum.FULL_WIDTH, {
    Component: FullWidthTemplate,
    props: {},
});

export { templates, templatesEnum };
