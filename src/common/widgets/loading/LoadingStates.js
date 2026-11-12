import { lang } from "@/common/Data/GlobalConstants";

export class LoadingStates {
    static DEFAULT_STATE = 0;
    static LOADING_STATE = 1;
    static LOADING_MORE_STATE = 2;
    static LOADING_COMPLETE_STATE = 100;

    static DEFAULT = {
        state: LoadingStates.DEFAULT_STATE,
        label: lang.loadingDefault,
    };
    static LOADING = {
        state: LoadingStates.LOADING_STATE,
        label: lang.loadingData,
    };
    static LOADING_MORE = {
        state: LoadingStates.LOADING_MORE_STATE,
        label: lang.loadingMoreData,
    };
    static LOADING_COMPLETE = {
        state: LoadingStates.LOADING_COMPLETE_STATE,
        label: lang.loadingCompleted,
    };
}
