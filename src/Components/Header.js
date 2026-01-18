import React from 'react'
import { NavLink } from 'react-router-dom'
function Header() {
  return (
    <div>
      <header className="flex flex-center flex-between">
      <NavLink to="/" className='logo'>Food Diary</NavLink>
      <nav>
        <ul className="flex">
            <li> 
               <NavLink to="/">Home</NavLink>
             </li>
            <li>
                <NavLink to="/checkout">Checkout</NavLink>
             </li>
        </ul>
      </nav>
      </header>
    </div>
  )
}

export default Header
