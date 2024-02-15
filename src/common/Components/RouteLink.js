import AppRoutes from "@/src/Routing/AppRoutes";
import Link from "next/link";


export const RouteLink = ({routeName, className, uriSuffix}) => {
    const route = AppRoutes[routeName] ?? AppRoutes.app;
    const classes = className ?? 'internal-link';
    const suffix = uriSuffix ?? '';
    if (route) {
        return (
            <Link href={route.asPath+suffix} className={classes} title={route.label}>{route.label}</Link>
        );
    }
}