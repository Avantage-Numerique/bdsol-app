import AppRoutes from "@/src/Routing/AppRoutes";
import Link from "next/link";


export const RouteLink = ({routeName, className}) => {
    const route = AppRoutes[routeName] ?? AppRoutes.app;
    const classes = className ?? 'internal-link';

    if (route) {
        return (
            <Link href={route.asPath} className={classes} title={route.label}>{route.label}</Link>
        );
    }
}