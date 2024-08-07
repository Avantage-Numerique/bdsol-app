import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {lang} from "@/common/Data/GlobalConstants";
import Link from "next/link";

const _defaultGetHrefGenerator = (pathParts, replaceWith) => pathParts;
const _defaultGetLabelGenerator = path => path;


/**
 * Generate each crumbs based of the Router URL (as a path).
 * @param path {string} generate from that to segment each part in a différent link
 * @return {array}
 */
const generatePathParts = (path) => {
    if (path !== undefined) {
        const fullPathWIthNoQuery = path.split("?")[0];
        return fullPathWIthNoQuery.split("/")
            .filter(v => v.length > 0);
    }
    return [];
}


/**
 * Take the path as a string  and
 * @param pathParts
 * @param replaceWith
 * @return {*}
 */
const replacePathParts = (pathParts, replaceWith) => {
    for (const position in pathParts) {
        const pathValue = pathParts[position];
        pathParts[position] = replaceWith && replaceWith[pathValue] ? replaceWith[pathValue] : pathValue;
    }
    return pathParts;
}


/**
 * Implémentation 1 : https://dev.to/dan_starner/building-dynamic-breadcrumbs-in-nextjs-17oa
 * @param getHrefGenerator {function}
 * @param getLabelGenerator {function}
 * @param route {object}
 * @param labels {object}
 * @param className {string} pass the class name to this via the parent.
 * @constructor
 */
const Breadcrumbs = ({
            getHrefGenerator = _defaultGetHrefGenerator,
            getLabelGenerator = _defaultGetLabelGenerator,
            labels,
            route = undefined,
            className=""}) => {

    const router = useRouter();

    const labelGenerator = (param, query) => {
        if (labels) {
            return labels[param] ?? "??";
        }
        return "?";
    };

    const breadcrumbs = useCallback( () => {

            let asPathNestedRoutes,
                asPathReplacementNestedRoutes,
                pathnameNestedRoutes;

            if (route !== undefined)
            {
                route.asPath = router.asPath;
                route.pathname = router.pathname;

                asPathNestedRoutes = generatePathParts(route.breadcrumbAsPath);
                asPathNestedRoutes = replacePathParts(asPathNestedRoutes, getHrefGenerator());

                pathnameNestedRoutes = generatePathParts(route.breadcrumbAsPath);
            }
            else {
                asPathNestedRoutes = generatePathParts(router.asPath);
                pathnameNestedRoutes = generatePathParts(router.pathname);
            }

            const crumblist = asPathNestedRoutes.map(
                (subpath, idx) => {

                    // Pull dynamic path params out of their [].
                    if (typeof pathnameNestedRoutes[idx] === "string")
                    {
                        const param = pathnameNestedRoutes[idx].replace("[", "").replace("]", "");

                        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
                        return {
                            href,
                            text: labelGenerator(param, router.query),
                            labels: labels
                        };
                    }
                    return "no string in subpath";
                });

            return [
                {
                    href: "/",
                    text: lang.homePageBreadcrumbLabel
                },
                ...crumblist
            ];

        }, [
            router.asPath,
            router.pathname,
            router.query,
            route,
            labels,
            getLabelGenerator,
            getHrefGenerator]
    );

    const crumbs = breadcrumbs();

    return (
        <nav className={className} aria-label="breadcrumb">
            <ol className="breadcrumb">
                {crumbs.map((crumb, idx) => {
                        return (
                            <Crumb {...crumb} key={idx} last={idx === crumbs.length - 1}/>
                        )
                    }
                )}
            </ol>
        </nav>
    );
}

const Crumb = ({labels, text, href, last = false}) => {//text: defaultText,

    const generateText = useCallback((generator) => {
        if (Boolean(generator) && typeof generator === "function") {
            return generator();
        }
        return "-";
    });

    if (last) {
        return (
            <li className="breadcrumb-item d-flex pb-2" aria-current="page">
                <div className="text-primary-darker py-0 px-1 bg-primary-light rounded-1" dangerouslySetInnerHTML={{ __html: text }}></div>
            </li>
        )
    }

    return (
        <li className="breadcrumb-item d-flex pb-2">
            <Link href={href} className="text-decoration-underline link-underline-secondary-darker link-underline-opacity-0 link-underline-opacity-75-hover">
                <div className="text-secondary-darker py-0 px-1 bg-secondary-light rounded-1" dangerouslySetInnerHTML={{ __html: text }}></div>
            </Link>
        </li>
    );
}


const Deprecated_Crumb = ({text:defaultText, textGenerator, href, last = false}) => {//text: defaultText,

    const [text, setText] = useState(defaultText);

    useEffect(() => {

        const generateText = async (generator) => {
            if (Boolean(generator) && typeof generator === "function") {
                const finalText = await generator();
                setText(finalText);
            }
        }
        generateText(textGenerator);

    }, [textGenerator]);

    if (last) {
        return (
            <li className="breadcrumb-item d-flex" aria-current="page">
                <div className="text-primary-darker py-0 px-1 bg-primary-light rounded-1" dangerouslySetInnerHTML={{ __html: text }}></div>
            </li>
        )
    }
    return (
        <li className="breadcrumb-item d-flex mb-1">
            <Link href={href}
                  className="text-decoration-underline link-underline-secondary-darker link-underline-opacity-0 link-underline-opacity-75-hover bg-"
            >
                <div className="text-secondary-darker py-0 px-1 bg-secondary-light rounded-1" dangerouslySetInnerHTML={{ __html: text }}></div>
            </Link>
        </li>
    );
}

export {Crumb, Breadcrumbs};