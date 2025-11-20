import AppRoutes from "@/src/Routing/AppRoutes";
import LinkWithLoading from "@/src/Navigation/LinkWithLoading";

export const RouteLink = ({ routeName, className, uriSuffix, target, label, children }) => {
    const route = AppRoutes[routeName] ?? AppRoutes.app;
    const classes = className ?? "internal-link";
    const suffix = uriSuffix ?? "";
    if (route && !children) {
        return (
            <LinkWithLoading
                target={target ?? "_self"}
                href={route.asPath + suffix}
                className={classes}
                title={route.label}
            >
                {label ?? route.label}
            </LinkWithLoading>
        );
    }
    if (route && children) {
        return (
            <LinkWithLoading
                target={target ?? "_self"}
                href={route.asPath + suffix}
                className={classes}
                title={route.label}
            >
                {children}
            </LinkWithLoading>
        );
    }
};
