import React from 'react'

function CardDish(props) {
 

  return (
      
        <li>
          <button type="button" className="card-link" onClick={()=> props.showPopupHandler(props.menuItem)}>
            <img src={props.menuItem.strMealThumb} alt={props.menuItem.strMeal} className='br-10' />
            <h5>{props.menuItem.strMeal}</h5>
          </button>
        </li>
      
  
  )
}

export default CardDish
