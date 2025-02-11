import {lang} from "@/common/Data/GlobalConstants";


export class LoadingStates {
    static DEFAULT_STATE = {
        state: 0,
        label: lang.loadingData
    };
    static LOADING_STATE = {
        state: 1,
        label: lang.loadingData
    };
    static LOADINGMORE_STATE = {
        state: 2,
        label: lang.loadingMoreData
    };
    static LOADING_COMPLETE_STATE = {
        state: 99,
        label: lang.loadingCompleted
    };
}