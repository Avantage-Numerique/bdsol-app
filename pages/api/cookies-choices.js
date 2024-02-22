import saveCookie from "@/common/Cookies/saveCookie";

async function cookiesChoicesRoute(req, res) {

    const choices = req.body;
    if (choices) {
        await saveCookie(res,{
            name:"ChoixCookie",
            value: choices
        });

        res.status(200).json({
            error: false,
            data: choices
        });
    }

    if (!choices) {
        await saveCookie({
            name:"ChoixCookie",
            value: "no choices"
        });

        res.status(200).json({
            error: true,
            message: "No choices sets"
        });
    }
}

export default cookiesChoicesRoute;