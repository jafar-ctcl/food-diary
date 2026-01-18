import React, { useContext } from "react"
import { StateContext, DispatchContext } from "../context/AppProvider"

const  Checkout = () => {
    const cartPackage = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    let cartItemsAre = cartPackage.cartItems.map((item, idx)=>{
        return(
           <div className="checkout-item" key={idx}>
                 <img src={item.img} alt="" />
                     <h6>{item.title}</h6>
                     <button className="cart-remove-btn" onClick={()=>dispatch({type:'remove_from_cart', payload: idx})}>Remove</button>
           </div>
        )
       
       })
    return(
        <section className="checkout">
          <div className="container">
            <h2>Checkout</h2>
            <div className="checkout-list">
              {cartItemsAre.length ? cartItemsAre : <p>Your cart is empty.</p>}
            </div>
          </div>
        </section>
    )
}
export default Checkout