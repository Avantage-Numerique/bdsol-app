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
        if(pageCount < 2)
            return (<button onClick={() => setCurrentPage(1)} disabled={true}>1</button>)
        
        const paginationNumber = [];
        for( let i = 1; i <= pageCount; i++){
            if(i < 6){
                paginationNumber.push((
                    <button className="px-4" key={"btn-pagination-currentPage-"+i} onClick={() => setCurrentPage(i)} disabled={currentPage == i}>{i}</button>
                ))
            }
        }
        if(pageCount >= 6){
            paginationNumber.push((
                <button className="px-4" key={"btn-pagination-dots"} onClick={() => setCurrentPage(currentPage + 1)}>...</button>
            ))
        }
        return (<div>{paginationNumber}</div>);
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