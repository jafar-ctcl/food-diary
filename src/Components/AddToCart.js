import React, { useContext } from 'react'
import { StateContext, DispatchContext } from "../context/AppProvider"

const AddToCart = ({addTocardItem, removeLocalItem}) =>{
 //   console.log("abc",addTocardItem);
const cartPackage = useContext(StateContext)
const dispatch = useContext(DispatchContext)
// console.log("Add to cart",cartPackage.cartItems);
let cartItemsAre= cartPackage.cartItems.map((item, idx)=>{
 return(
     <div className="cart-item" key={idx}>
             <img src={item.img} alt="" />
                  <h6>{item.title}</h6>
                  <span className="cart-close" onClick={()=>dispatch({type:'remove_from_cart', payload: idx})}>×</span>
     </div>
 )

})
 let addToCardResults = addTocardItem.map((item, idx)=>{
    return(
        <div className="cart-item" key={idx}>
           <img src={item.img} alt="" />
      <h6>{item.title}</h6>
      <span className="cart-close" onClick={()=> removeLocalItem && removeLocalItem(idx)}>×</span>
        </div>
     
    )
   })
    
    return(
        <div className="add-to-cart-wrapper">
            <div className="add-to-cart-item">
                <h6 className="text-center">
                    Your cart
  
                </h6>
                {cartItemsAre}
                {addToCardResults}
              </div>
        </div>
    )
}

export default AddToCart