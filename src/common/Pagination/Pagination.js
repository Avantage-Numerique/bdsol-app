import { useCallback, useEffect, useRef } from "react";
import { PaginationButton } from "@/common/Pagination/PaginationButton";
import nextConfig from "@/next.config";
import useScrollTo from "@/src/hooks/useScrollTo";
import { lang } from "@/common/Data/GlobalConstants";

/**
 * Basic pagination component. It sets a list of number, on top and below the children
 * indicating # of pages.
 *
 * @param {object} children the children of pagination, for now must be an entitylist.
 * @param {object} paginationMeta How many total item to paginate (if this exceed 6 page, the display will update accordingly)
 * @param {number} setClearList function that takes a bool as param, set if the list need to be reset or we can add to it.
 * @param {callable} setSkipNumber (deprecated we use full paginationMeta to manage that) Set how many item should be skipped in the request for currentPage
 * @param {callable} pageBtnClickHandler On click btn handler to avoid using a useEffect on a state setter.
 * @param {boolean} loadMore true make the component go to nextPage if scrolled to the bottom of the page.
 * @param {any} props all the rest of params can be passed to.
 * Note for loadMore :
 *      true ==> setEntityList([...entityList, ...list]);
 *      false ==> setEntityList(list);
 *
 * */
const Pagination = ({
    children,
    paginationMeta,
    setSkipNumber,
    setClearList,
    pageBtnClickHandler,
    loadMore = false,
    ...props
}) => {
    const { scrollTo } = useScrollTo();

    //UseRef + useEffect update to handle onScrol
    //necessary, if not, onScroll triggers nextPage() with initial values
    const paginationRef = useRef({
        count: paginationMeta?.count ?? 0,
        skipped: paginationMeta?.skipped ?? 0,
        limit:
            paginationMeta?.limit ??
            nextConfig.publicRuntimeConfig.pagination.limit,
        type: paginationMeta?.type ?? "Person",
        pageCount: paginationMeta?.pageCount ?? 1,
        currentPage: paginationMeta?.currentPage ?? 1,
        currentCount: paginationMeta?.currentCount ?? 0,
    });

    //useEffect( () => { paginationRef.current = paginationMeta; }, [paginationMeta]);

    const paginationButtonClickHandler = (pageNumber, clearList = false) => {
        setPageNumber(pageNumber, clearList);
        scrollTo("consultScrollToElement");
    };

    const paginationNextButtonClickHandler = () => {
        nextPage();
        scrollTo("consultScrollToElement");
    };

    const paginationPreviousButtonClickHandler = () => {
        previousPage();
        scrollTo("consultScrollToElement");
    };

    //Set skip when page change
    function setPageNumber(pageNumber, clearList = false) {
        pageBtnClickHandler(pageNumber);
        if (clearList && setClearList) setClearList(true);
    }

    const nextPage = () => {
        if (
            paginationRef.current.currentPage < paginationRef.current.pageCount
        ) {
            setPageNumber(paginationRef.current.currentPage + 1);
        }
    };

    const previousPage = () => {
        if (paginationMeta.currentPage > 1) {
            setPageNumber(paginationMeta.currentPage - 1);
            if (setClearList) setClearList(true);
        }
    };

    //Form the structure of numbers to display as available pages < 1 ... 3 4 5 6 7 ... 10 >
    //"showCount" default 2, how many number to show left and to show right from current page.
    const pageNumbers = (showCount = 2) => {
        //If paginationMeta is undefined
        if (paginationMeta?.pageCount === undefined)
            return (
                <PaginationButton
                    label={1}
                    pageNumber={1}
                    className={""}
                    clickMethod={paginationButtonClickHandler}
                    clearList={true}
                    disabled={true}
                />
            );

        //Add current page number to the array ==> ( [ currentPage ] )
        const numberArray = [];
        numberArray.push(paginationMeta?.currentPage ?? 1);

        //Iteration through adding left and right if possible until showCount = 0 ==> ( [ ? currentPage ? ])
        let tempShowCount = showCount;
        while (tempShowCount > 0) {
            tempShowCount--;
            //if possible add left
            if (numberArray[0] - 1 > 1) numberArray.unshift(numberArray[0] - 1);

            //if possible add right
            if (
                numberArray[numberArray.length - 1] + 1 <
                paginationMeta.pageCount
            )
                numberArray.push(numberArray[numberArray.length - 1] + 1);
        }

        //Check if you can add "..." on left and right. Also if not, check to add first and last page.
        //Left check for "..."
        if (numberArray[0] - 1 > 1) numberArray.unshift(1, "...");
        else if (numberArray[0] - 1 === 1)
            //Add firstPage?
            numberArray.unshift(1);

        //Right check for "..."
        if (numberArray[numberArray.length - 1] + 1 < paginationMeta.pageCount)
            numberArray.push("...", paginationMeta.pageCount);
        else if (
            numberArray[numberArray.length - 1] + 1 ===
            paginationMeta.pageCount
        )
            //Add last page?
            numberArray.push(paginationMeta.pageCount);

        //Cycle through numberArray to create each component in paginationNumber.
        const paginationNumber = [];
        numberArray.forEach((pageLabel, index) => {
            switch (pageLabel) {
                case "...":
                    paginationNumber.push(
                        <PaginationButton
                            key={"pagination-btn-dots-" + index}
                            label={"..."}
                            pageNumber={index}
                            className={""}
                            disabled={true}
                            isNavigation={true}
                        />
                    );
                    break;
                default:
                    paginationNumber.push(
                        <PaginationButton
                            key={"pagination-btn-number-" + index}
                            label={pageLabel}
                            pageNumber={pageLabel}
                            className={""}
                            clickMethod={paginationButtonClickHandler}
                            clearList={
                                !(
                                    pageLabel + 1 ===
                                    paginationMeta.currentPage + 1
                                )
                            }
                            disabled={pageLabel === paginationMeta.currentPage}
                            isCurrent={
                                paginationMeta?.currentPage === pageLabel
                            }
                        />
                    );
            }
        });

        //Return component array to display.
        return (
            <div className={"d-flex justify-content-center"}>
                {paginationNumber}
            </div>
        );
    };

    //LoadMore section
    //const debouncedScroll = useDebounce(onScroll, 400); (couldn't make it work with our hook..)
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    /**
     * Load more trigger
     */
    const onScroll = useCallback(
        debounce(() => {
            if (
                typeof window !== "undefined" &&
                typeof document !== "undefined"
            ) {
                if (
                    window.innerHeight + document.documentElement.scrollTop ===
                    document.scrollingElement.scrollHeight
                ) {
                    nextPage();
                }
            }
        }, 100),
        []
    );

    useEffect(() => {
        if (typeof window !== "undefined" && loadMore) {
            window.addEventListener("scroll", onScroll);
            return () => {
                window.removeEventListener("scroll", onScroll);
            };
        }
    }, [loadMore, onScroll]);

    const PageNumbersComponent = (
        <div>
            <div className="d-flex py-4 justify-content-center">
                <PaginationButton
                    label={"angle-left"}
                    labelIsIconClass={true}
                    pageNumber={""}
                    className={""}
                    clickMethod={paginationPreviousButtonClickHandler}
                    isNavigation={true}
                />
                {pageNumbers(2)}
                <PaginationButton
                    label={"angle-right"}
                    labelIsIconClass={true}
                    pageNumber={""}
                    className={""}
                    clickMethod={paginationNextButtonClickHandler}
                    isNavigation={true}
                />
            </div>
        </div>
    );

    const showStats = true;
    const PaginationHeaderComponent = (
        <header className="py-3">
            {paginationMeta.count > 0 && (
                <div
                    className={
                        "d-flex w-33 justify-content-center align-baseline"
                    }
                >
                    {false && showStats && (
                        <div className={"d-flex w-50 align-items-center"}>
                            <p className={"m-0 pe-1"}>
                                {lang.paginationInfoTitle}{" "}
                                {paginationMeta.currentPage}
                            </p>
                        </div>
                    )}
                    {showStats && (
                        <div className={"d-flex align-items-center"}>
                            <p className={"m-0 px-3"}>
                                <span>
                                    {lang.paginationInfoTitle}{" "}
                                    {paginationMeta.currentPage}
                                </span>
                                <span className={"px-3"}>&mdash;</span>
                                <span>
                                    {paginationMeta.skipped + 1}&nbsp;
                                    {lang.paginationInfoTitleTo}&nbsp;
                                    {paginationMeta.skipped +
                                        paginationMeta.currentCount}
                                </span>
                                <span className={"px-1"}>
                                    {lang.paginationInfoTitleOn}
                                </span>
                                <span>{paginationMeta.count}</span>
                            </p>
                        </div>
                    )}
                    {PageNumbersComponent}
                </div>
            )}
            {paginationMeta.count <= 0 && (
                <div
                    className={
                        "d-flex w-33 justify-content-center align-baseline"
                    }
                >
                    {showStats && (
                        <div
                            className={
                                "d-flex w-50 align-items-center justify-content-center"
                            }
                        >
                            <p className={"m-0 pe-1  py-4"}>
                                {lang.paginationInfoTitleNoPage}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
    const PaginationFooterComponent = (
        <footer className="py-3">
            {paginationMeta.count > 0 && (
                <div className={"d-flex justify-content-center align-baseline"}>
                    {PageNumbersComponent}
                </div>
            )}
        </footer>
    );

    return (
        <div className="container">
            {PaginationHeaderComponent}
            {children}
            {PaginationFooterComponent}
        </div>
    );
};
export default Pagination;
