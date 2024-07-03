import AppRoutes from "@/src/Routing/AppRoutes";
import Link from "next/link";


export const RouteLink = ({routeName, className, uriSuffix, target, label, children}) => {
    const route = AppRoutes[routeName] ?? AppRoutes.app;
    const classes = className ?? 'internal-link';
    const suffix = uriSuffix ?? '';
    if (route && !children) {
        return (
            <Link target={target ?? "_self"} href={route.asPath+suffix} className={classes} title={route.label}>{label ?? route.label}</Link>
        );
    }
    if (route && children) {
        return (
            <Link target={target ?? "_self"} href={route.asPath+suffix} className={classes} title={route.label}>
                {children}
            </Link>
        );
    }
}