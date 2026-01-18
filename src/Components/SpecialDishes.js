import React, { useContext, useState } from 'react'
import CardDish from './CardDish';
import Popup from './Popup';

//step 4
import { AllMenuContext } from './AllMenuContext';
import AddToCart from './AddToCart';

function SpecialDishes(props) {
    //  console.log("props",props.specialMenu);
   let [showPopup,setShowPopup] =useState(false)
   let [currentDish,setCurrentDish] = useState('')
   let [addTocardItem,setAddToCardItem] = useState([])
  // console.log("show",showPopup);
   
   const allMenus = useContext(AllMenuContext)
   //Get show popup
   function showPopupHandler(dishName){
   // console.log("name",dishName);
   setShowPopup(true)
   setCurrentDish(dishName)
  
   }

   //get close popup
   function closePopupHandler()
   {
   setShowPopup(false)
   }  
     
  //  Add to cart handler
 function addToCartHandler(addToCardImg,addToCardTitle){
setAddToCardItem(
  [
    ...addTocardItem,
     {
    "img" : addToCardImg,
    "title" :addToCardTitle
     }
  ]
)
 }

function removeLocalItem(index){
  setAddToCardItem(prev => prev.filter((_,i)=> i !== index))
}

    let maxSpeacialDishes = 8;
    let specialMenus = allMenus.map((menuItem,index)=>{
     if(index < maxSpeacialDishes){
            return (
              <CardDish 
              menuItem={menuItem}
              showPopupHandler={showPopupHandler}
           
               />
     ) }
    })
  return (

    <section className='special-dishes'>
            {showPopup && <Popup 
            closePopupHandler={closePopupHandler}
            currentDish ={currentDish}
            addToCartHandler={addToCartHandler}
            />}
        <div className="container">
          <AddToCart 
          addTocardItem={addTocardItem} removeLocalItem={removeLocalItem} />
            <div className="special-dishes-content text-center">
                 <h2>Our Special Dishes</h2>
                 <p>Handpicked favorites prepared with seasonal ingredients and bold flavors — simple enough for weeknights, special enough for guests.</p>
           </div>
           <div className="special-dishes-list">
           <ul className='flex flex-wrap gap-30'>{specialMenus} </ul>

           </div>
        </div>
  </section>
  )
}

export default SpecialDishes
