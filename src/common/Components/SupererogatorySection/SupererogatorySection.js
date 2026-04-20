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
                {(model.shortDescription || model._generated?.shortDescription) && (
                    <ShortDescriptionDisplay model={model} />
                )}
                {model.keywords && <KeywordsDisplay keywords={model.keywords} />}
                {model._jsonld && <JSONLDDisplay model={model} />}
            </Collapsible>
        </>
    );
};

/**
 * Component to display JSONLD in supererogatory
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

                    await navigator.clipboard.writeText(JSON.stringify(model._jsonld));

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
                {model._jsonld && <pre>{JSON.stringify(model._jsonld, null, 2)}</pre>}
            </details>
        </div>
    );
};
