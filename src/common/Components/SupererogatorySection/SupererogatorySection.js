import { lang } from "@/src/common/Data/GlobalConstants";

import { Collapsible } from "@/src/common/Components/Collapsible/Collapsible";

import { ShortDescriptionDisplay } from "@/src/DataTypes/common/layouts/ShortDescription/ShortDescription";
import { KeywordsDisplay } from "@/src/DataTypes/common/layouts/Keywords/Keywords";

/**
 * @typedef {Object} SupererogatorySectionProps
 * @property {import('@/src/DataTypes/Entity/models/EntityModel').default} model
 */

/**
 *
 * @param {SupererogatorySectionProps} props
 * @returns
 */
export const SupererogatorySection = (props) => {
    const { model } = props;

    return (
        <>
            <Collapsible
                label="Afficher"
                keyId={"supererogatorySection"}
                title={lang.seoSection}
                NAMessage="Rien à signaler!"
                show={false}
            >
                {model.shortDescription && <ShortDescriptionDisplay>{model.shortDescription}</ShortDescriptionDisplay>}
                {model.keywords && <KeywordsDisplay keywords={model.keywords} />}

                <MetaDisplay model={model} />
            </Collapsible>
        </>
    );
};

/**
 * Temporary component initially used for testing the `<Collapsible/>`
 *
 * @param {SupererogatorySectionProps} props
 * @returns
 */
const MetaDisplay = (props) => {
    const { model } = props;

    function getCircularReplacer() {
        const ancestors = [];
        return function (key, value) {
            if (typeof value !== "object" || value === null) {
                return value;
            }
            // `this` is the object that value is contained in,
            // i.e., its direct parent.
            while (ancestors.length > 0 && ancestors.at(-1) !== this) {
                ancestors.pop();
            }
            if (ancestors.includes(value)) {
                return "[Circular]";
            }
            ancestors.push(value);
            return value;
        };
    }

    return <>{model.meta && <pre>{JSON.stringify(model, getCircularReplacer(), 2)}</pre>}</>;
};
