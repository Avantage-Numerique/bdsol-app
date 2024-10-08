import { useEffect, useState, useRef, useCallback } from "react"


/**
 * Basic pagination component. It sets a list of number, on top and below the children
 * indicating # of pages. Upon reset, currentPage = 1
 * 
 * @param {number} totalCount How many total item to paginate (if this exceed 6 page, the display will update accordingly)
 * @param {number} length how many item per page should be displayed
 * @param {number} reset State that when updated, sets current page number to 1. ( setState( prev + 1) )
 * @param {number} setClearList Tell parent that on the next fetch, the list need to be reset as new list (not to add more)
 * @param {stateSetter} setSkipNumber Set how many item should be skipped in the request for currentPage
 * @param {boolean} loadMore true make the component go to nextPage if scrolled to the bottom of the page.
 * Note for loadMore :
 *      true ==> setEntityList([...entityList, ...list]);
 *      false ==> setEntityList(list);
 *   
 * */
const Pagination = ({children, totalCount, length, setSkipNumber, setClearList, loadMore=false, reset, ...props}) => {

    //currentPage and pageCount
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(Math.ceil(totalCount / length))
    useEffect( () => setPageCount(Math.ceil(totalCount / length)), [totalCount, length]);

    //UseRef to handle onScroll (necessary because onScroll was triggering nextPage() with initial values)
    const currentPageRef = useRef(1);
    const pageCountRef = useRef(1);
    useEffect( () => { currentPageRef.current = currentPage; }, [currentPage]);
    useEffect( () => { pageCountRef.current = pageCount; }, [pageCount]);

    const [endMessage, setEndMessage] = useState(undefined);

    //Set skip when page change
    useEffect( () => { setSkipNumber((currentPage - 1)*length); }, [currentPage])

    //Reset pagination
    useEffect( () => { setCurrentPage(1); setEndMessage(undefined) }, [reset])

    const nextPage = () => {
        if(currentPageRef.current < pageCountRef.current){
            setCurrentPage(prevPage => { return prevPage + 1;});
        }
        else
            setEndMessage("Whoa!? Un visiteur? Bravo, tu as atteint la fin du défilement 'infini'! >:D")
    }
    const previousPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
            if(setClearList)
                setClearList(true);
        }
    }

    //Changes currentPage and clear entity list
    const setPageNumber = (number) => {
        setCurrentPage(number);
        if(setClearList)
            setClearList(true);
    }

    const pageNumbers = () => {
        //If 1 or 0 page ( 1 )
        if(pageCount < 2)
            return (<button onClick={() => setCurrentPage(1)} disabled={true}>1</button>)
        
        //If 5 page or less ( 1, 2, 3, 4, 5, "..." )
        if(pageCount < 6 || currentPage < 3){
            const paginationNumber = [];
            for( let i = 1; i <= pageCount; i++){
                if(i < 6)
                    paginationNumber.push((
                        <button className="px-4" key={"btn-pagination-currentPage-"+i} onClick={() => setPageNumber(i)} disabled={currentPage == i}>{i}</button>
                    ))
            }
            if(pageCount > 5)
                paginationNumber.push((
                    <button className="px-4" key={"btn-pagination-next-dots"} onClick={() => setPageNumber(6)}>...</button>
                ))
            return <div>{paginationNumber}</div>
        }

        //If 6 page or more ( "...", x-2, x-1, x, x+1, x+2, "..." )
        if(pageCount >= 6){
            const paginationNumber = [];
            for( let i = currentPage - 2; i <= currentPage + 2; i++){
                if(i <= pageCount) {
                    paginationNumber.push((
                        <button className="px-4" key={"btn-pagination-currentPage-"+i} onClick={() => setPageNumber(i)} disabled={currentPage == i}>{i}</button>
                    ))
                }
            }
            //if not at last 3 pages, Add dots to show that there is more page than what we show
            if(currentPage + 3 <= pageCount){
                paginationNumber.push((
                    <button className="px-4" key={"btn-pagination-next-dots"} onClick={() => setPageNumber(currentPage + 3)}>...</button>
                ))
            }
            //If at the last 2 page, show more lower pages
            else {
                if(currentPage + 1 == pageCount || currentPage == pageCount){
                    paginationNumber.unshift((
                    <button className="px-4" key={"btn-pagination-currentPage-"+(currentPage-3)} onClick={() => setPageNumber(currentPage-3)} disabled={currentPage == currentPage-3}>{currentPage-3}</button>
                    ));
                }
                if(currentPage == pageCount){
                    paginationNumber.unshift((
                        <button className="px-4" key={"btn-pagination-currentPage-"+(currentPage-4)} onClick={() => setPageNumber(currentPage-4)} disabled={currentPage == currentPage-4}>{currentPage-4}</button>
                    ));
                }
            }
            //if current page is bigger than 3, adds dots to show that there is more page than what we show "prev"
            if(currentPage > 3){
                //Offset for onClick to handle correctly for last 2 pages.
                let offset = 3;
                if(currentPage + 1 == pageCount)
                    offset = 4;
                if(currentPage == pageCount)
                    offset = 5;

                paginationNumber.unshift((
                    <button className="px-4" key={"btn-pagination-prev-dots"} onClick={() => setPageNumber(currentPage - offset)}>...</button>
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
            console.log("Load more triggered");
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
            {endMessage ?? <div>{endMessage}</div>}
        </div>
    )
}
export default Pagination;