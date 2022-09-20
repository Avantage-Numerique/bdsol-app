import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {appDefaultSessionOptions} from "../Session";

export function withSessionRoute(handler) {
    return withIronSessionApiRoute(handler, appDefaultSessionOptions);
}

export function withSessionSsr(handler) {
    return withIronSessionSsr(handler, appDefaultSessionOptions);
}