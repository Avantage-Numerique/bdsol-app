import { lang } from "@/src/common/Data/GlobalConstants";

import { Collapsible } from "@/src/common/Components/Collapsible/Collapsible";

import { ShortDescriptionDisplay } from "@/src/DataTypes/common/layouts/ShortDescription/ShortDescription";
import { KeywordsDisplay } from "@/src/DataTypes/common/layouts/Keywords/Keywords";
import Icon from "../../widgets/Icon/Icon";
import { useMessages } from "../../UserNotifications/Message/MessageProvider";
import { useState } from "react";

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
                {model.meta.jsonld && <JSONLDDisplay model={model} />}
                {model.meta && <MetaDisplay model={model} />}
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

    return (
        <>
            <strong>{lang.metaContentTitle} :</strong>
            <details>{model.meta && <pre>{JSON.stringify(model.meta, getCircularReplacer(), 2)}</pre>}</details>
        </>
    );
};

/**
 * Temporary component initially used for testing the `<Collapsible/>`
 *
 * @param {SupererogatorySectionProps} props
 * @returns
 */
const JSONLDDisplay = (props) => {
    const { model } = props;

    let [copied, setCopied] = useState(false);
    let copiedTimer;

    const hintCopied = () => {
        copiedTimer && clearTimeout(copiedTimer);
        setCopied(true);
        copiedTimer = setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const msg = useMessages();

    return (
        <div className="position-relative">
            <strong>{lang.jsonldContentTitle} :</strong>

            <button
                className="btn btn-outline-secondary position-absolute top-0 end-0"
                onClick={async () => {
                    console.log("before copy");

                    await navigator.clipboard.writeText(JSON.stringify(model.meta.jsonld));

                    console.log("after copy");

                    msg.addMessage({
                        text: "Données structurées copiées!",
                    });

                    hintCopied();
                }}
            >
                Copier JSON+LD <Icon iconName={copied ? "check" : "copy"} />
            </button>

            <details>
                <summary>JSON+LD</summary>
                {model.meta.jsonld && <pre>{JSON.stringify(model.meta.jsonld, null, 2)}</pre>}
            </details>
        </div>
    );
};
