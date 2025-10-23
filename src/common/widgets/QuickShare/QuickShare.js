import { useContext, useState } from "react";
import { MessageContext } from "@/common/UserNotifications/Message/Context/Message-Context";

import { lang } from "@/common/Data/GlobalConstants";

import { htmlToText } from "@/src/helpers/str";

import Icon from "@/common/widgets/Icon/Icon";

import styles from "./QuickShare.module.scss";

/**
 *
 * @param {{ model: React.Component, shareableTextContent: string, shareableMailContent: string }} props
 * @returns
 */
const QuickShare = ({ model }) => {
    const msg = useContext(MessageContext);

    const shortTextContent = `${lang.shareableTextIntro}\n\n${model?.fullSingleLinkUrl}\n\n`;
    const shortURLEncodedContent = encodeURIComponent(shortTextContent);

    const longTextContent = `${lang.shareableTextIntro}\n\n${model?.meta.title}\n\n${htmlToText(model.meta.description)}\n\n${model?.fullSingleLinkUrl}\n\n`;
    const longURLEncodedContent = encodeURIComponent(longTextContent);

    let [copied, setCopied] = useState(false);
    let copiedTimer;

    /**
     * Copy provided text to clipboard, or `longTextContent` as a fallback
     *
     * @param {string} textToCopy
     */
    const copyToClipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy ?? longTextContent);
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
        <div
            className={`border border-primary rounded-pill fs-4 px-3 py-1 d-flex gap-2 align-items-center ${styles["quick-share"]}`}
        >
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

            {/* The `quote` param of the facebook `sharer.php` URL is **probably not** taken into account */}
            <a
                href={`https://facebook.com/sharer/sharer.php?u=${model?.fullSingleLinkUrl}&quote=${shortURLEncodedContent}`}
                target="_blank"
                onClick={(e) => {
                    e.preventDefault();

                    const href = e.currentTarget.href;

                    copyToClipboard(shortTextContent);

                    hintFbCopied();

                    setTimeout(() => {
                        window.open(href, "_blank").focus();
                    }, 1000);
                }}
            >
                <Icon iconName={fbCopied ? "clipboard-check" : "facebook-f"} vendor={fbCopied ? null : "lab"} />
            </a>

            <a href={`mailto:?subject=AVNU - ${model?.meta.title}&body=${longURLEncodedContent}`}>
                <Icon iconName="envelope" />
            </a>
        </div>
    );
};

export default QuickShare;
