import {cookies} from 'next/headers';

async function saveCookie(data) {
    'use server';
    cookies().set({
        name: data.name ?? "defaultCookie",
        value: data.value,
        httpOnly: data.httpOnly ?? true,
        path: data.path ?? '/',
        maxAge: data.maxAge ?? 24*60*60*1000
    });
}

export default saveCookie;