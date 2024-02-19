import {cookies} from 'next/headers';

export default function getCookie(name) {
    const cookieStore = cookies();
    const cookie = cookieStore.get(name);
    return cookie;
}