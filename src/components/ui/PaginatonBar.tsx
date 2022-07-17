import	{FC, MouseEvent} from 'react'

interface propsPaginationBar {
  paginationRange: number[],
  dispatchNewPage: (newPageNumber:number)=>void
  actualPageNumber:number
}

const PaginatonBar : FC<propsPaginationBar> = ({paginationRange,dispatchNewPage,actualPageNumber}) => {
  
  const leftPage = (event:MouseEvent) => {
    event.preventDefault()

    dispatchNewPage(actualPageNumber-1);
  }

  const rightPage = (event:MouseEvent) => {
    event.preventDefault()

    dispatchNewPage(actualPageNumber+1);
  }

  const goToPage = (event:MouseEvent,pageNumber:number) => {
    event.preventDefault()
    dispatchNewPage(pageNumber);
  }
  
  return (
    <div className='flex flex-row justify-around w-full'>
      <button className="inactive-pagination-btn arrow-pagination-btn" onClick={leftPage} disabled={actualPageNumber === 1}>&lt;</button>
      
      { paginationRange.map((item,i)=>
        <button className={(actualPageNumber === item) ? "active-pagination-btn" : "inactive-pagination-btn"} key={i} onClick={(event)=>goToPage(event,item)}>{item}</button>
      )}

      <button className="inactive-pagination-btn arrow-pagination-btn" onClick={rightPage} disabled={actualPageNumber === paginationRange[paginationRange.length-1]}>&gt;</button>
    </div>
  )
}

export default PaginatonBar