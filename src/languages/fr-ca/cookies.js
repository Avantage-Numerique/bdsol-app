const {appConfig} = require("@/src/configs/AppConfig");
const cookies = {
    "cookieBannerTitle": `${appConfig.name} doit laisser des miettes de biscuits pour bien fonctionner.`,
    "cookieBannerIntro": `Consultez notre politique de gestion de cookie dans notre politique de confidentialité.`,
    "cookieBannerContent": `On a besoin de 2 niveaux de cookies : connexion et statistiques.`,
    "cookieBannerAcceptButtonLabel": "Tout accepter",
    "cookieBannerAcceptBasicOnlyLabel": "Seulement les cookies de connexion",
    "cookieBannerDenyButtonLabel": "Aucun, merci",
    "cookieChoiceMade":"Vous avez fait un choix",
    "cookiePositive":"Acceptés",
    "cookieNegative":"Refusés",
    "cookieAll":"Tous les types de cookies",
    "cookieStats":"Les cookies pour les statistiques",
    "cookieAuth":"Les cookies d'authentification",
    "cookieThird":"Les cookies de partie tier",
    "cookieChangeChoice": "Changer mon choix",
    "cookieMakeYourChoice": "Faire mon choix",
    "cookieMessageThanks": `Vous avez sélectionné vos préférences pour les miettes (cookies) d'${appConfig.name}`,
    "cookieMessageNeedAnswer": `Il faut absolument que tu choisisses un niveau de miettes (cookies). Même si on utilise aucun cookie intersite.`,
    "cookieMessageNeedAuthCookie": `Il faut absolument accepter les cookies de connexion pour continuer.`,
    "cookieDisabled": `${appConfig.name} a besoin d'enregistrer des cookies pour fonctionner. Il faut activer les cookies dans votre navigateur.`,
    "cookieNoThirdParty": `${appConfig.name} n'utilise pas de cookie tiers.`,
    "cookieDisabledButtonLabel": "Compris",
    "cookieExplainAll":"",
    "cookieExplainStats":`Nous recueillons des statistiques anonymisées sur l'utilisation de la plateforme. Les pages visitées, les recherches effectuées dans ${appConfig.name}, les endroits où tu as quitter la plateforme. Avec l'outil Matomo.`,
    "cookieExplainAuth":`Sans lui tu ne peux pas contribuer à ${appConfig.name}. On en a besoin pour être en mesure de t'identifier et que ton navigateur se souvienne que tu es connecté.`,
    "cookieExplainThird":`On ne suit pas les cookies tiers dans ${appConfig.name}. Aucun. Et on ne planifie pas de le faire.`,
}
/*
    choiceMade:false,
    all:false,
    stats:false,
    auth:false,
    third:false//no plan of adding that.
 */
exports.cookies = cookies;