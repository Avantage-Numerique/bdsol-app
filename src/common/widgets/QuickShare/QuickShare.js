import { useContext, useState } from "react";
import { MessageContext } from "@/common/UserNotifications/Message/Context/Message-Context";

import { lang } from "@/common/Data/GlobalConstants";

import Icon from "@/common/widgets/Icon/Icon";

/**
 *
 * @param {{ model: React.Component, shareableTextContent: string, shareableMailContent: string }} props
 * @returns
 */
const QuickShare = ({ model }) => {
    const msg = useContext(MessageContext);

    const shareableTextContent = `${lang.shareableTextIntro}\n\n${model?.meta.title}\n\n${model.meta.description}\n\n${model?.fullSingleLinkUrl}\n\n`;

    const shareableMailContent = encodeURIComponent(shareableTextContent);

    let [copied, setCopied] = useState(false);
    let copiedTimer;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareableTextContent);
        msg.addMessage({
            text: lang.copied,
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

    let [fbCopied, setFbCopied] = useState(false);
    let fbCopiedTimer;

    const hintFbCopied = () => {
        fbCopiedTimer && clearTimeout(fbCopiedTimer);
        setFbCopied(true);
        fbCopiedTimer = setTimeout(() => {
            setFbCopied(false);
        }, 1500);
    };

    return (
        <div className="border border-primary rounded-pill fs-4 px-3 py-1 d-flex gap-2 align-items-center">
            <button
                className="d-flex gap-2 align-items-center fs-6"
                type="button"
                onClick={(e) => {
                    copyToClipboard();

                    hintCopied();
                }}
            >
                Partager <Icon className="fs-4" iconName={copied ? "clipboard-check" : "link"} />
            </button>

            <a
                href={`https://facebook.com/sharer/sharer.php?u=${model?.fullSingleLinkUrl}&quote=${shareableMailContent}`}
                target="_blank"
                onClick={(e) => {
                    e.preventDefault();

                    const href = e.currentTarget.href;

                    copyToClipboard();

                    hintFbCopied();

                    setTimeout(() => {
                        window.open(href, "_blank").focus();
                    }, 1000);
                }}
            >
                <Icon iconName={fbCopied ? "clipboard-check" : "facebook-f"} vendor={fbCopied ? null : "lab"} />
            </a>

            <a href={`mailto:?subject=AVNU - ${model?.meta.title}&body=${shareableMailContent}`}>
                <Icon iconName="envelope" />
            </a>
        </div>
    );
};

export default QuickShare;
