import { getUserHeadersFromUserSession } from "@/auth/context/auth-context";
import { ssrCanAccess } from "@/auth/permissions/ssrCanAccess";
import { externalApiRequest } from "@/src/hooks/http-hook";

/**
 * Permission middleware factory-ish filter if the user can contribute and return the data of the target entity to contribute to.
 * @param entity {String} Api entity uri to get the data from.
 * @returns {(function(*): Promise<{props: *}|{props: {user: *, userCanAccess: boolean}}|{redirect: {permanent: boolean, destination: string}, props: {user: {isPending: boolean, isLoggedIn: boolean, tokenVerified: boolean, token: null, id: null, avatar: null, name: null, username: null, createdAt: null, ip: null, browser: null, language: null, verify: {isVerified: boolean}}, userCanAccess: boolean}}>)|*}
 */
export const ssrCanContributeToEntity = (entity) => {
    /**
     * SSR handler as an Anonymous function
     */
    return async (context) => {
        const { query, req } = context;
        const ssrCanAccessThisPath = await ssrCanAccess(context);

        // precise
        if (ssrCanAccessThisPath.props.userCanAccess) {
            const response = await externalApiRequest(
                `/${entity}/${query.slug}`,
                {
                    method: "GET",
                    headers: getUserHeadersFromUserSession(req.session.user),
                }
            );

            return { props: response.data };
        }

        return ssrCanAccessThisPath;
    };
};
