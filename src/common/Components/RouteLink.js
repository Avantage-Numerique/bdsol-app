import AppRoutes from "@/src/Routing/AppRoutes";
import Link from "next/link";


export const RouteLink = ({routeName}) => {
    const route = AppRoutes[routeName] ?? AppRoutes.app;

    if (route) {
        return (
            <Link href={route.asPath} className={"internal-link"} title={route.label}>{route.label}</Link>
        );
    }
}