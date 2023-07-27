import {appConfig} from "@/src/configs/AppConfig";

export const getTitle = (title, addAppName = true) => {
    let parsedTitle = "";
    if (Array.isArray(title)) {
        parsedTitle = title.join(appConfig.meta.seperator);
    }
    if (typeof title === "string") {
        parsedTitle = title;
    }
    return parsedTitle + (addAppName ? appConfig.meta.seperator + appConfig.name : "");
}