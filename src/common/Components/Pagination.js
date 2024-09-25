import { useEffect, useState } from "react"


/**
 * Basic pagination component. It sets a list of number, on top and below the children
 * indicating # of pages. Upon reset, currentPage = 1
 * 
 * @param {number} totalCount How many total item to paginate (if this exceed 6 page, the display will update accordingly)
 * @param {number} length how many item per page should be displayed
 * @param {number} reset reset currentPage to 1 and skip to 0 upon change (UseState + 1)
 * @param {stateSetter} setSkipNumber Set how many item should be skipped in the request for currentPage
 *   
 * */
const Pagination = ({children, totalCount, length, setSkipNumber, reset, ...props}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const pageCount = Math.ceil(totalCount / length)

    //Set skip when page change
    useEffect( () => { setSkipNumber((currentPage - 1)*length); }, [currentPage])
    
    //If parent set reset to another number, it resets page to 1
    useEffect( () => { setCurrentPage(1); }, [reset])

    const nextPage = () => {
        if(currentPage < pageCount)
            setCurrentPage(currentPage + 1)
    }
    const previousPage = () => {
        if(currentPage > 1)
            setCurrentPage(currentPage - 1)
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
                        <button className="px-4" key={"btn-pagination-currentPage-"+i} onClick={() => setCurrentPage(i)} disabled={currentPage == i}>{i}</button>
                    ))
            }
            if(pageCount > 5)
                paginationNumber.push((
                    <button className="px-4" key={"btn-pagination-next-dots"} onClick={() => setCurrentPage(6)}>...</button>
                ))
            return <div>{paginationNumber}</div>
        }

        //If 6 page or more ( "...", x-2, x-1, x, x+1, x+2, "..." )
        if(pageCount >= 6){
            const paginationNumber = [];
            for( let i = currentPage - 2; i <= currentPage + 2; i++){
                if(i <= pageCount) {
                    paginationNumber.push((
                        <button className="px-4" key={"btn-pagination-currentPage-"+i} onClick={() => setCurrentPage(i)} disabled={currentPage == i}>{i}</button>
                    ))
                }
            }
            //if not at last 3 pages, Add dots to show that there is more page than what we show
            if(currentPage + 3 <= pageCount){
                paginationNumber.push((
                    <button className="px-4" key={"btn-pagination-next-dots"} onClick={() => setCurrentPage(currentPage + 3)}>...</button>
                ))
            }
            //If at the last 2 page, show more lower pages
            else {
                if(currentPage + 1 == pageCount || currentPage == pageCount){
                    paginationNumber.unshift((
                    <button className="px-4" key={"btn-pagination-currentPage-"+(currentPage-3)} onClick={() => setCurrentPage(currentPage-3)} disabled={currentPage == currentPage-3}>{currentPage-3}</button>
                    ));
                }
                if(currentPage == pageCount){
                    paginationNumber.unshift((
                        <button className="px-4" key={"btn-pagination-currentPage-"+(currentPage-4)} onClick={() => setCurrentPage(currentPage-4)} disabled={currentPage == currentPage-4}>{currentPage-4}</button>
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
                    <button className="px-4" key={"btn-pagination-prev-dots"} onClick={() => setCurrentPage(currentPage - offset)}>...</button>
                ))

            }

            return (<div>{paginationNumber}</div>);
        }
    }

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

        </div>
    )
}
export default Pagination;