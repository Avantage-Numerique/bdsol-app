import { useEffect, useState, useRef, useCallback } from "react"


/**
 * Basic pagination component. It sets a list of number, on top and below the children
 * indicating # of pages.
 * 
 * @param {number} totalCount How many total item to paginate (if this exceed 6 page, the display will update accordingly)
 * @param {number} length how many item per page should be displayed
 * @param {number} setClearList function that takes a bool as param, set if the list need to be reset or we can add to it.
 * @param {stateSetter} setSkipNumber Set how many item should be skipped in the request for currentPage
 * @param {boolean} loadMore true make the component go to nextPage if scrolled to the bottom of the page.
 * Note for loadMore :
 *      true ==> setEntityList([...entityList, ...list]);
 *      false ==> setEntityList(list);
 *   
 * */
const Pagination = ({children, paginationMeta, setSkipNumber, setClearList, loadMore=false, ...props}) => {

    //UseRef + useEffect update to handle onScrol
    //necessary, if not, onScroll triggers nextPage() with initial values
    const paginationRef = useRef({
        count : paginationMeta?.count ?? 0,
        skipped: paginationMeta?.skipped ?? 0,
        limit: paginationMeta?.limit ?? 1,
        type : paginationMeta?.type ?? 'Person',
        pageCount : paginationMeta?.pageCount ?? 1,
        currentPage : paginationMeta?.currentPage ?? 1,
    });

    useEffect( () => { paginationRef.current = paginationMeta; }, [paginationMeta]);

    //Set skip when page change
    function setPageNumber(pageNumber, clearList=false){
        setSkipNumber(paginationRef.current.limit * (pageNumber - 1));
        if(clearList && setClearList)
            setClearList(true);
    }

    const nextPage = () => {
        if(paginationRef.current.currentPage < paginationRef.current.pageCount){
            setPageNumber(paginationRef.current.currentPage + 1)
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
        if(paginationMeta?.pageCount == undefined)
            return (<button onClick={() => setPageNumber(1, true)} disabled={true}>1</button>)

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
            if(numberArray[0] - 1 == 1)
                numberArray.unshift(1);

        //Right check for "..."
        if(numberArray[numberArray.length - 1] + 1 < paginationMeta.pageCount)
            numberArray.push("...", paginationMeta.pageCount);
        else
            //Add last page?
            if(numberArray[numberArray.length - 1] + 1 == paginationMeta.pageCount)
                numberArray.push(paginationMeta.pageCount);

        //Cycle through numberArray to create each component in paginationNumber.
        const paginationNumber = [];
        numberArray.forEach((currentLabel, index) => {
            switch(currentLabel){
                case "...":
                    paginationNumber.push(
                        <button
                            className="px-4"
                            key={"btn-pagination-dots"+index}
                            disabled={true}
                        >
                            ...
                        </button>
                    )
                    break;
                default: 
                    paginationNumber.push(
                        <button
                            className="px-4"
                            key={"btn-pagination-page-"+currentLabel}
                            onClick={() => setPageNumber(parseInt(currentLabel), currentLabel + 1 == paginationMeta.currentPage + 1 ? false : true)}
                            disabled={currentLabel == paginationMeta.currentPage ? true : false}>
                                {currentLabel}
                        </button>
                    );
            }
        });

        //Return component array to display.
        return (<div>{paginationNumber}</div>);
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
    const onScroll = useCallback(debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            nextPage();
        }
    }, 100), []);

    useEffect( () => {
        if(loadMore){
            window.addEventListener('scroll', onScroll);
            return () => {
                window.removeEventListener('scroll', onScroll);
            }
        }
    },[loadMore, onScroll])

    const pageNumbersComponent = (
        <div className="d-flex py-4 justify-content-center">
            <button className="px-4" onClick={() => previousPage()}>{"<"}</button>
            {pageNumbers(2)}
            <button className="px-4" onClick={() => nextPage()}>{">"}</button>
        </div>
    )

    return (
        <div className="container">
            {/* Top number section for pages*/}
            {pageNumbersComponent}
            {children}
            {/* Bottom number section for pages*/}
            {pageNumbersComponent}
            {/*endMessage ?? <div>{endMessage}</div>*/}
        </div>
    )
}
export default Pagination;