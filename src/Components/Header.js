import React from 'react'
import { NavLink,Link} from 'react-router-dom'
function Header() {
  return (
    <div>
      <header className="flex flex-center flex-between">
      <a className='logo'>Food Diary</a>
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
