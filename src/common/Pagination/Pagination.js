import {useCallback, useEffect, useRef} from "react"
import {PaginationButton} from "@/common/Pagination/PaginationButton";
import nextConfig from "@/next.config";
import useScrollTo from "@/src/hooks/useScrollTo";


/**
 * Basic pagination component. It sets a list of number, on top and below the children
 * indicating # of pages.
 * 
 * @param {object} children the children of pagination, for now must be an entitylist.
 * @param {object} paginationMeta How many total item to paginate (if this exceed 6 page, the display will update accordingly)
 * @param {number} setClearList function that takes a bool as param, set if the list need to be reset or we can add to it.
 * @param {callable} setSkipNumber Set how many item should be skipped in the request for currentPage
 * @param {boolean} loadMore true make the component go to nextPage if scrolled to the bottom of the page.
 * @param {any} props all the rest of params can be passed to.
 * Note for loadMore :
 *      true ==> setEntityList([...entityList, ...list]);
 *      false ==> setEntityList(list);
 *   
 * */
const Pagination = ({children, paginationMeta, setSkipNumber, setClearList, loadMore=false, ...props}) => {


    const {scrollToTop} = useScrollTo();

    //UseRef + useEffect update to handle onScrol
    //necessary, if not, onScroll triggers nextPage() with initial values
    const paginationRef = useRef({
        count : paginationMeta?.count ?? 0,
        skipped: paginationMeta?.skipped ?? 0,
        limit: paginationMeta?.limit ?? nextConfig.publicRuntimeConfig.pagination.limit,
        type : paginationMeta?.type ?? 'Person',
        pageCount : paginationMeta?.pageCount ?? 1,
        currentPage : paginationMeta?.currentPage ?? 1,
        currentCount : paginationMeta?.currentCount ?? 0,
    });

    useEffect( () => { paginationRef.current = paginationMeta; }, [paginationMeta]);

    const paginationButtonClickHandler = (pageNumber, clearList=false) => {
        setPageNumber(pageNumber, clearList);
        scrollToTop();
    }

    const paginationNextButtonClickHandler = () => {
        nextPage();
        scrollToTop();
    }

    const paginationPreviousButtonClickHandler = () => {
        previousPage();
        scrollToTop();
    }

    //Set skip when page change
    function setPageNumber(pageNumber, clearList=false){
        setSkipNumber(paginationRef.current.limit * (pageNumber - 1));
        if(clearList && setClearList)
            setClearList(true);
    }

    const nextPage = () => {
        if(paginationRef.current.currentPage < paginationRef.current.pageCount){
            setPageNumber(paginationRef.current.currentPage + 1);
        }
    }

    const previousPage = () => {
        if(paginationMeta.currentPage > 1){
            setPageNumber(paginationMeta.currentPage - 1);
            if(setClearList)
                setClearList(true);
        }
    }

    //Form the structure of numbers to display as available pages < 1 ... 3 4 5 6 7 ... 10 >
    //"showCount" default 2, how many number to show left and to show right from current page.
    const pageNumbers = (showCount = 2) => {
        //If paginationMeta is undefined
        if(paginationMeta?.pageCount === undefined)
            return (
                <PaginationButton
                    label={1}
                    pageNumber={1}
                    className={""}
                    clickMethod={paginationButtonClickHandler}
                    clearList={true}
                    disabled={true} />
            )

        //Add current page number to the array ==> ( [ currentPage ] )
        const numberArray = [];
        numberArray.push(paginationMeta?.currentPage ?? 1)

        //Iteration through adding left and right if possible until showCount = 0 ==> ( [ ? currentPage ? ])
        let tempShowCount = showCount;
        while(tempShowCount > 0){
            tempShowCount--;
            //if possible add left
            if(numberArray[0] - 1 > 1 )
                numberArray.unshift(numberArray[0] - 1);
            
            //if possible add right
            if(numberArray[numberArray.length - 1] + 1 < paginationMeta.pageCount)
                numberArray.push(numberArray[numberArray.length - 1] + 1);
        }

        //Check if you can add "..." on left and right. Also if not, check to add first and last page.
        //Left check for "..."
        if(numberArray[0] - 1 > 1)
            numberArray.unshift(1, "...");
        else
            //Add firstPage?
            if(numberArray[0] - 1 === 1)
                numberArray.unshift(1);

        //Right check for "..."
        if(numberArray[numberArray.length - 1] + 1 < paginationMeta.pageCount)
            numberArray.push("...", paginationMeta.pageCount);
        else
            //Add last page?
            if(numberArray[numberArray.length - 1] + 1 === paginationMeta.pageCount)
                numberArray.push(paginationMeta.pageCount);

        //Cycle through numberArray to create each component in paginationNumber.
        const paginationNumber = [];
        numberArray.forEach((pageLabel, index) => {
            switch(pageLabel){
                case "...":
                    paginationNumber.push(
                        <PaginationButton
                            key={"pagination-btn-dots-"+index}
                            label={"..."}
                            pageNumber={index}
                            className={""}
                            disabled={true}
                            isNavigation={true}
                        />
                    )
                    break;
                default: 
                    paginationNumber.push(
                        <PaginationButton
                            key={"pagination-btn-number-"+index}
                            label={pageLabel}
                            pageNumber={pageLabel}
                            className={""}
                            clickMethod={paginationButtonClickHandler}
                            clearList={!(pageLabel + 1 === paginationMeta.currentPage + 1)}
                            disabled={pageLabel === paginationMeta.currentPage}
                            isCurrent={paginationMeta?.currentPage === pageLabel}
                        />
                    );
            }
        });

        //Return component array to display.
        return (<div className={"d-flex justify-content-center"}>{paginationNumber}</div>);
    }

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
    const onScroll = useCallback(debounce(() => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
                nextPage();
            }
        }
    }, 100), []);

    useEffect( () => {
        if(typeof window !== "undefined" && loadMore){
            window.addEventListener('scroll', onScroll);
            return () => {
                window.removeEventListener('scroll', onScroll);
            }
        }
    },[loadMore, onScroll])

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
    )

    const showStats = true;
    const PaginationHeaderComponent = (
        <header className="py-3">

            <div className={"d-flex justify-content-between align-baseline"}>
                {showStats &&
                    <div className={"d-flex w-50 align-items-center"}>
                        <h5 className={"m-0"}>
                            Page {paginationMeta.currentPage}
                        </h5>
                        <p className={"m-0 px-3"}>
                            <span>{paginationMeta.currentCount}&nbsp;/&nbsp;{paginationMeta.count}</span><span>&nbsp;des éléments</span>
                        </p>
                    </div>
                }
                {PageNumbersComponent}
            </div>

        </header>
    );

    return (
        <div className="container">
            {PaginationHeaderComponent}
            {children}
            {PageNumbersComponent}
        </div>
    )
}
export default Pagination;