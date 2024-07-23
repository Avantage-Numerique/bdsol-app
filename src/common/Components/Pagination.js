import { useEffect, useState } from "react"


/**
 * @param {number} totalCount How many item total wants to be displayed 
 * @param {number} length how many item per page
 * @param {number} reset reset currentPage number upon change
 * @param {stateSetter} setSkipNumber Setter for how many item should be skipped in request (for parent)
 *   
 * */
const Pagination = ({children, totalCount, length, setSkipNumber, reset, ...props}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const pageCount = Math.ceil(totalCount / length)

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
            paginationNumber.push((
                <button className="px-4"onClick={() => setCurrentPage(i)} disabled={currentPage == i}>{i}</button>
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