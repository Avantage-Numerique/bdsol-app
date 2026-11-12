//const {appConfig} = require("@/src/configs/AppConfig");
const messages = {
    projectInDev: `<strong class="text-danger">DEVELOPMENT IN PROGRESS.</strong> You will be able to search and read entries soon.`,
    formHasError: "These fields currently block data saving :",
    disconnected: "You are now disconnected.",
    listNoResult: "No entities, maybe our little duck is having a nap.",
    copied: "Message copied!",
    shareableTextIntro: "Hey, I just wanted to share this page I found on AVNU.CA!",
    continueReadingOn: (link) => `Continue reading on ${link}`,
};

exports.messages = messages;
