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
    "cookieMessageThanks": `Vous avez sélectionné vos préférences pour les miettes (cookies) d'${appConfig.name}`,
    "cookieMessageNeedAnswer": `Il faut absolument que tu choisisses un niveau de miettes (cookies). Même si on utilise aucun cookie intersite.`,
    "cookieMessageNeedAuthCookie": `Il faut absolument accepter les cookies de connexion pour continuer.`,
}
/*
    choiceMade:false,
    all:false,
    stats:false,
    auth:false,
    third:false//no plan of adding that.
 */
exports.cookies = cookies;