import { useState } from "react";
import { lang } from "@/common/Data/GlobalConstants";
import Icon from "@/common/widgets/Icon/Icon";
import { useMessages } from "@/common/UserNotifications/Message/MessageProvider";
import { htmlToText } from "@/src/helpers/str";
import styles from "./QuickShare.module.scss";

const DESC_MAX_LEN = 100;
/**
 *
 * @param {{ model: React.Component, shareableTextContent: string, shareableMailContent: string }} props
 * @returns
 */
const QuickShare = ({ model }) => {
    const msg = useMessages();

    function processDesc() {
        const txt = htmlToText(model?.meta?.description);
        const len = txt.length;

        return txt.slice(0, DESC_MAX_LEN) + (len > DESC_MAX_LEN ? "[...]" : "");
    }

    const shortTextContent = `${lang.shareableTextIntro}\n\n${lang.continueReadingOn} ${model?.fullSingleLinkUrl}\n`;
    const shortURLEncodedContent = encodeURIComponent(shortTextContent);

    const longTextContent = `${lang.shareableTextIntro}\n\n${model?.meta?.title}\n\n${processDesc()}\n\n${lang.continueReadingOn(model?.fullSingleLinkUrl)}\n`;
    const longURLEncodedContent = encodeURIComponent(longTextContent);

    let [copied, setCopied] = useState(false);
    let [copiedTimer, setCopiedTimer] = useState();

    /**
     * Copy provided text to clipboard, or `longTextContent` as a fallback
     *
     * @param {string} textToCopy
     */
    const copyToClipboard = (textToCopy = null) => {
        navigator.clipboard.writeText(textToCopy ?? longTextContent);
        msg.addMessage({
            text: lang.copied,
            theme: "positive",
        });
    };

    const hintCopied = () => {
        copiedTimer && clearTimeout(copiedTimer);
        setCopied(true);
        setCopiedTimer(
            setTimeout(() => {
                setCopied(false);
            }, 1500)
        );
    };

    let [fbCopied, setFbCopied] = useState(false);
    let [fbCopiedTimer, setFbCopiedTimer] = useState();

    const hintFbCopied = () => {
        fbCopiedTimer && clearTimeout(fbCopiedTimer);
        setFbCopied(true);
        setFbCopiedTimer(
            setTimeout(() => {
                setFbCopied(false);
            }, 1500)
        );
    };

    return (
        <div
            className={`border border-primary rounded-pill fs-4 px-3 py-1 d-flex gap-2 align-items-center ${styles["quick-share"]}`}
        >
            <button
                className="d-flex gap-2 align-items-center fs-6"
                type="button"
                onClick={() => {
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
