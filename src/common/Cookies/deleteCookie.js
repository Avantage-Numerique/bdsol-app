'use server'

import {cookies} from 'next/headers';

async function deleteCookie(data) {
    if (data?.name) {
        cookies().delete(data.name);
    }
}

export default deleteCookie;