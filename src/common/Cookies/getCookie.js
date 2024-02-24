import {cookies} from 'next/headers';

export default function getCookie(name) {
    const cookieStore = cookies();
    return cookieStore.get(name);
}