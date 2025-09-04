import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {filters, filtersUrl} from "@/src/filters/consultFilters";

/**
 * Hook to manage the consult data in /consulter with SSR and client hybrid data fetching.
 * Pagination use csr and filters use SSR.
 * @param props the page Props send to consulter.
 * @param currentEntityFilter the current target filters (could be an array in the future.
 * @returns {[{list, paginationMeta: {count: *, skipped: *, limit: *, type: *, pageCount: *, currentPage: *, currentCount}, entities: [String]},(function(*): void)|*]}
 */
const useConsultData = (props, currentEntityFilter) => {

    //React state doesnt force re-render when the value is directly set (not via the function.
    const initPaginationMeta = {
        count: props.ssrData.meta?.pagination.count,
        skipped: props.ssrData.meta?.pagination.skipped,
        limit: props.ssrData.meta?.pagination.limit,
        type: props.ssrData.meta?.pagination.type,
        pageCount: props.ssrData.meta?.pagination.pageCount,
        currentPage: props.ssrData.meta?.pagination.currentPage,
        currentCount: props.ssrData?.data?.length ?? Number(0)
    };

    const currentDataSSR = useMemo(() => ({
        list: props.ssrData.data ?? [],
        paginationMeta: {...initPaginationMeta},
        entities: [currentEntityFilter]
    }), [props.ssrData.data, currentEntityFilter]);

    const [consultData, setConsultData] = useState(currentDataSSR);
    const [isClientUpdate, setIsClientUpdate] = useState(false);
    const pendingClientUpdate = useRef(false);


    // Update state when SSR data changes
    useEffect(() => {
        setConsultData(currentDataSSR);
    }, [currentDataSSR, pendingClientUpdate]);

    // Custom setter that marks as client update
    const updateConsultData = useCallback((newData) => {
        setConsultData(newData);
    }, []);

    return [consultData, updateConsultData];
}
export default useConsultData;


/**
 * Construct the pagination meta from target API return.
 * @param pagination {Object}
 * @param total {Number}
 * @returns {{count, skipped: any, limit, type, pageCount: *, currentPage: (number|*), currentCount}}
 */
const buildPaginationMeta = (pagination, total) => {
    return {
        count: pagination.count,
        skipped: pagination.skipped,
        limit: pagination.limit,
        type: pagination.type,
        pageCount: pagination.pageCount,
        currentPage: pagination.currentPage,
        currentCount: total,
    };
}
export {buildPaginationMeta};