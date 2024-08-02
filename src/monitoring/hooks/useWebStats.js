import {Matomo} from "@/src/monitoring/Matomo";

const useWebStats = (cookiesParams) => {
    return Matomo.instance();
}

export default useWebStats;