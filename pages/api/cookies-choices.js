"use server"

export default async function handler(req, res) {

    const choices = req.body;
    const data = {
        name: "avnuCookies",
        httpOnly: true,
        path: '/',
        maxAge: 24*60*60*1000
    }
    res.setHeader('Set-Cookie', `avnuCookies=${JSON.stringify(choices)}; Path=/; HttpOnly`);
    res.status(200).json({ message: 'Preferences updated successfully' });
/*
    if (choices) {


        const oneDay = 24 * 60 * 60 * 1000;

        await cookies().set({
            name: data.name,
            value: choices,
            httpOnly: data.httpOnly,
            path: data.path,
            maxAge: data.maxAge
        });

        res.status(200).json({
            error: false,
            data: choices
        });
    }

    if (!choices) {

        await cookies().set({
            name: data.name,
            value: "no choices",
            httpOnly: data.httpOnly,
            path: data.path,
            maxAge: data.maxAge
        });

        res.status(400).json({
            error: true,
            message: "No choices sets"
        });
    }*/
}