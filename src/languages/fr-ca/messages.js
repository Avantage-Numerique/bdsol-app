const {appConfig} = require("@/src/configs/AppConfig");
const messages = {
    "projectInDev": `<strong class="text-danger">DÉVELOPPEMENT EN COURS.</strong> Vous pourrez bientôt lancer des recherches et consulter toutes les données.`,
    "formHasError": "Attention, l'un des champs dans cette page n'est pas entré correctement et vous empêche de sauvegarder vos modifications.",
    "cookieBannerTitle": `Notre canard ${appConfig.name} doit laisser des miettes de biscuits pour bien fonctionner.`,
    "cookieBannerIntro": `Consulte notre politique de gestion de cookie dans notre politique de confidentialité.`,
    "cookieBannerContent": `On a besoin de cookies fonctionnel (connexion et pour connaître le choix que vous faite ici). Et un pour matomo qui monitore les activités sur ${appConfig.name}.`,
    "cookieBannerAcceptButtonLabel": "Accepter",
    "cookieBannerDenyButtonLabel": "Non merci"
}

exports.messages = messages;