import { useContext, useState } from "react";
import { MessageContext } from "@/common/UserNotifications/Message/Context/Message-Context";

import Icon from "@/common/widgets/Icon/Icon";

/**
 *
 * @param {{ model: React.Component, shareableTextContent: string, shareableMailContent: string }} props
 * @returns
 */
const QuickShare = ({ model }) => {
    const msg = useContext(MessageContext);

    const intro = "Salut, j'avais envie de te partager cette page que j'ai trouvé sur AVNU.CA!";

    const shareableTextContent = `${intro}\n\n${model?.meta.title}\n\n${model.meta.description}\n\n${model?.fullSingleLinkUrl}\n\n`;

    const shareableMailContent = encodeURIComponent(shareableTextContent);

    let [copied, setCopied] = useState(false);
    let copiedTimer;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareableTextContent);
        msg.addMessage({
            text: "Message copié!",
            positive: true,
        });
    };

    const hintCopied = () => {
        copiedTimer && clearTimeout(copiedTimer);
        setCopied(true);
        copiedTimer = setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <div className="border border-primary rounded-pill fs-4 px-3 py-1 d-flex gap-2 align-items-center">
            <span className="fs-6">Partager </span>

            <a
                href={`https://facebook.com/sharer/sharer.php?u=${"avnu.ca" ?? model?.fullSingleLinkUrl}&quote=${shareableMailContent}`}
                target="_blank"
                onClick={(e) => {
                    e.preventDefault();

                    const href = e.currentTarget.href;

                    copyToClipboard();

                    setTimeout(() => {
                        window.open(href, "_blank").focus();
                    }, 1000);
                }}
            >
                <Icon iconName="facebook-f" vendor="lab" />
            </a>

            <button
                type="button"
                onClick={(e) => {
                    copyToClipboard();

                    hintCopied();
                }}
            >
                <Icon iconName={copied ? "clipboard-check" : "link"} />
            </button>

            <a href={`mailto:?subject=AVNU - ${model?.meta.title}&body=${shareableMailContent}`}>
                <Icon iconName="envelope" />
            </a>
        </div>
    );
};

export default QuickShare;
