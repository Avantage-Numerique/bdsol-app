import { lang } from "@/src/common/Data/GlobalConstants";

/**
 *
 * @param {{ keywords: string[] }} props
 * @returns
 */
export const KeywordsDisplay = (props) => {
    const { keywords } = props;

    return (
        <>
            <div>
                <strong>{lang.keywords} :</strong>
                <div className="mt-2">{keywords.join(", ")}</div>
            </div>
        </>
    );
};
