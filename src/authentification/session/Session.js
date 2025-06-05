import 'server-only'

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

async function getIronSessionData() {
    const session = await getIronSession(cookies(), { password: "...", cookieName: "..." });
    return session;
}

export const createSession = async () => {

}
export const updateSession = async () => {

}