import saveCookie from "@/common/Cookies/saveCookie";

export default cookiesChoicesRoute;

async function cookiesChoicesRoute(req, res) {
    'use server';
    const choices = req.body;
    if (choices) {
        await saveCookie({
            name:"ChoixCookie",
            value: choices
        });
        res.send({
            error: false,
            data: choices
        });
    }

    if (!choices) {
        res.send({
            error: true,
            message: "No choices sets"
        });
    }
}