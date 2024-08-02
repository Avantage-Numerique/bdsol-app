import {Matomo} from "@/src/monitoring/Matomo";

const useWebStats = () => {
    return Matomo.instance();
}

export default useWebStats;