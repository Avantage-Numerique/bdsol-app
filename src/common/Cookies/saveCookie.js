"use server"

async function saveCookie(res, data) {

    res.cookies.set({
        name: data.name ?? "defaultCookie",
        value: data.value,
        httpOnly: data.httpOnly ?? true,
        path: data.path ?? '/',
        maxAge: data.maxAge ?? 24*60*60*1000
    });

    // Vérifiez si la méthode HTTP est POST
    if (req.method === 'POST') {
        // Récupérez les données du corps de la requête
        const { cookieName, cookieValue } = req.body;

        // Définir le cookie
        res.setHeader('Set-Cookie', `${cookieName}=${cookieValue}; Path=/`);

        // Répondre avec un statut de succès
        res.status(200).json({ message: 'Cookie enregistré avec succès' });
    } else {
        // Si la méthode HTTP n'est pas POST, répondre avec une erreur
        res.status(405).json({ message: 'Méthode non autorisée' });
    }

}

export default saveCookie;