import React from 'react'

function CardDish(props) {
 

  return (
      
        <li>
          <a href="#" className="card-link" onClick={(e)=>{e.preventDefault(); props.showPopupHandler(props.menuItem)}}>

         <img src= {props.menuItem.strMealThumb} alt="" className='br-10' />
          <h5>{props.menuItem.strMeal}</h5>
          </a>
        </li>
      
  
  )
}

export default CardDish
