import AppRoutes from "@/src/Routing/AppRoutes";
import Link from "next/link";


export const RouteLink = ({routeName, className, uriSuffix, target, label}) => {
    const route = AppRoutes[routeName] ?? AppRoutes.app;
    const classes = className ?? 'internal-link';
    const suffix = uriSuffix ?? '';
    if (route) {
        return (
            <Link target={target ?? "_self"} href={route.asPath+suffix} className={classes} title={route.label}>{label ?? route.label}</Link>
        );
    }
}