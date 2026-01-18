import React from 'react'

function Pagination(props) {
    //console.log("filterdishes",props.filteredDishes);
    let numberOfPages = []
    for(let i=1; i <=Math.ceil(props.filteredDishes.length/props.itemsPerPage); i++)
        {
            numberOfPages.push(i)
        }  
    function showNextDishesHandler(event){
      let currentPage = Number(event.target.id)
      if (!isNaN(currentPage)) props.setCurrentPage(currentPage)
    }
    let pages = numberOfPages.map((pageNumber)=>{
        return(
            <li key={pageNumber} className={pageNumber === props.currentPage ? "active" : null} id={pageNumber} onClick={showNextDishesHandler}>{pageNumber}</li>
        )
    })
    return (
        <section>
  <ul className="pagination flex">
{pages}
  </ul>
</section>
    
)}

export default Pagination
