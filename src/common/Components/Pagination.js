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
        setSkipNumber(paginationRef.current.limit * (pageNumber - 1))
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

    const pageNumbers = () => {
        //If 1 or 0 page ( 1 )
        if(paginationMeta.pageCount < 2)
            return (<button onClick={() => setPageNumber(1, true)} disabled={true}>1</button>)
        
        //If 5 page or less ( 1, 2, 3, 4, 5, "..." )
        if(paginationMeta.pageCount < 6 || paginationMeta.currentPage < 3){
            const paginationNumber = [];
            for( let i = 1; i <= paginationMeta.pageCount; i++){
                if(i < 6)
                    paginationNumber.push((
                        <button className="px-4" key={"btn-pagination-currentPage-"+i} onClick={() => setPageNumber(i, true)} disabled={paginationMeta.currentPage == i}>{i}</button>
                    ))
            }
            if(paginationMeta.pageCount > 5)
                paginationNumber.push((
                    <button className="px-4" key={"btn-pagination-next-dots"} onClick={() => setPageNumber(6, true)}>...</button>
                ))
            return <div>{paginationNumber}</div>
        }

        //If 6 page or more ( "...", x-2, x-1, x, x+1, x+2, "..." )
        if(paginationMeta.pageCount >= 6){
            const paginationNumber = [];
            for( let i = paginationMeta.currentPage - 2; i <= paginationMeta.currentPage + 2; i++){
                if(i <= paginationMeta.pageCount) {
                    paginationNumber.push((
                        <button
                            className="px-4"
                            key={"btn-pagination-currentPage-"+i}
                            onClick={() => setPageNumber(i, true)}
                            disabled={paginationMeta.currentPage == i}
                        >
                            {i}
                        </button>
                    ))
                }
            }
            //if not at last 3 pages, Add dots to show that there is more page than what we show
            if(paginationMeta.currentPage + 3 <= paginationMeta.pageCount){
                paginationNumber.push((
                    <button
                        className="px-4"
                        key={"btn-pagination-next-dots"}
                        onClick={() => setPageNumber(paginationMeta.currentPage + 3, true)}
                    >
                        ...
                    </button>
                ))
            }
            //If at the last 2 page, show more lower pages
            else {
                if(paginationMeta.currentPage + 1 == paginationMeta.pageCount || paginationMeta.currentPage == paginationMeta.pageCount){
                    paginationNumber.unshift((
                        <button
                            className="px-4"
                            key={"btn-pagination-currentPage-"+(paginationMeta.currentPage-3)}
                            onClick={() => setPageNumber(paginationMeta.currentPage - 3, true)}
                            disabled={paginationMeta.currentPage == paginationMeta.currentPage-3}
                        >
                            {paginationMeta.currentPage-3}
                        </button>
                    ));
                }
                if(paginationMeta.currentPage == paginationMeta.pageCount){
                    paginationNumber.unshift((
                        <button
                            className="px-4"
                            key={"btn-pagination-currentPage-"+(paginationMeta.currentPage-4)}
                            onClick={() => setPageNumber(paginationMeta.currentPage - 4, true)}
                            disabled={paginationMeta.currentPage == paginationMeta.currentPage-4}
                        >
                            {paginationMeta.currentPage-4}
                        </button>
                    ));
                }
            }
            //if current page is bigger than 3, adds dots to show that there is more page than what we show "prev"
            if(paginationMeta.currentPage > 3){
                //Offset for onClick to handle correctly for last 2 pages.
                let offset = 3;
                if(paginationMeta.currentPage + 1 == paginationMeta.pageCount)
                    offset = 4;
                if(paginationMeta.currentPage == paginationMeta.pageCount)
                    offset = 5;

                paginationNumber.unshift((
                    <button
                        className="px-4"
                        key={"btn-pagination-prev-dots"}
                        onClick={() => setPageNumber(paginationMeta.currentPage - offset, true)}
                    >
                        ...
                    </button>
                ))

            }

            return (<div>{paginationNumber}</div>);
        }
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
            //console.log("Load more triggered");
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
            {pageNumbers()}
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