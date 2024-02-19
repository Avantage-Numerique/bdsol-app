const {appConfig} = require("@/src/configs/AppConfig");
const messages = {
    "projectInDev": `<strong class="text-danger">DÉVELOPPEMENT EN COURS.</strong> Vous pourrez bientôt lancer des recherches et consulter toutes les données.`,
    "formHasError": "Attention, l'un des champs dans cette page n'est pas entré correctement et vous empêche de sauvegarder vos modifications.",
    "cookieBannerTitle": `${appConfig.name} doit laisser des miettes de biscuits pour bien fonctionner.`,
    "cookieBannerIntro": `Consultez notre politique de gestion de cookie dans notre politique de confidentialité.`,
    "cookieBannerContent": `On a besoin de 2 niveaux de cookies : connexion et statistiques.`,
    "cookieBannerAcceptButtonLabel": "Tout accepter",
    "cookieBannerAcceptBasicOnlyLabel": "Seulement les cookies de connexion",
    "cookieBannerDenyButtonLabel": "Aucun, merci"
}

exports.messages = messages;