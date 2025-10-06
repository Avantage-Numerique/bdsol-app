export function getCleanRedirectPath(currentPath) {
    console.log("current path", currentPath)
    try {
        const url = new URL(currentPath, process.env.APP_URL);
        const pathname = url.pathname;

        // Pages à exclure de la redirection
        const excludedPaths = ['/compte/connexion', '/parametres/cookies', '/compte/inscription'];
        if (excludedPaths.includes(pathname)) {
            return '/';
        }

        const searchParams = url.searchParams;

        // Supprimer uniquement les messages flash
        ['msg', 'msgPositive'].forEach((param) => {
            searchParams.delete(param);
        });

        const queryString = searchParams.toString();
        return queryString ? `${pathname}?${queryString}` : pathname;
    } catch (error) {
        console.error('getCleanRedirectPath: URL invalide', error);
        return '/';
    }
}
