import React, { useContext, useEffect, useState } from 'react'
import { AllMenuContext } from './AllMenuContext'
import { DispatchContext } from '../context/AppProvider'
import { lookupMealById, searchMealByName } from '../utils/api'

function Popup({closePopupHandler,currentDish,addToCartHandler}) {
 const allMenus = useContext(AllMenuContext)
 const dispatch = useContext(DispatchContext)
 const [details, setDetails] = useState(null)
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)
 const cancelledRef = React.useRef(false)

 const loadDetails = React.useCallback(async ()=>{
   cancelledRef.current = false
   setLoading(true)
   setError(null)
   try{
    if(currentDish && typeof currentDish === 'object' && currentDish.idMeal){
      const meal = await lookupMealById(currentDish.idMeal)
      if(!cancelledRef.current) setDetails(meal)
    } else if(currentDish && typeof currentDish === 'string'){
      const found = allMenus.find(m=> m.strMeal === currentDish)
      if(found){
        if(!cancelledRef.current) setDetails(found)
      } else {
        const meal = await searchMealByName(currentDish)
        if(!cancelledRef.current) setDetails(meal)
      }
     } else {
       if(!cancelledRef.current) setDetails(null)
     }
   }catch(err){
     console.error('Popup load error', err)
     if(!cancelledRef.current) setError(err)
   }finally{
     if(!cancelledRef.current) setLoading(false)
   }
 },[currentDish, allMenus])

 useEffect(()=>{
   cancelledRef.current = false
   loadDetails()
   return ()=>{ cancelledRef.current = true }
 },[loadDetails])

 if(loading) return (
   <div className='popup'>
     <div className="popup-content">Loading...</div>
   </div>
 )

 return (
   <div className='popup'>
     <div className="popup-content">
      {error && <div className="popup-error">Failed to load details. Please try again.</div>}
       {!details && <div className='popup-content-data'><p style={{color:'white'}}>No details available.</p><button onClick={closePopupHandler} className="popup-close">×</button></div>}
       {details && (
         <div className="popup-content-data">
           <div className="popup-header">
             <img src={details.strMealThumb} alt={details.strMeal} />
             <h5 className='popup-header-category'>{details.strCategory}</h5>
           </div>
           <h2>{details.strMeal}</h2>
           <p>{details.strInstructions}</p>
           <ul className='dish-ingredients flex'>
             {Array.from({length:20}).map((_,i)=>{
               const ing = details[`strIngredient${i+1}`]
               return ing ? <li key={i}>{ing}</li> : null
             })}
           </ul>
           <button onClick={()=>{
             dispatch({
               type:"add_to_cart",
               payload:{
                 title:details.strMeal,
                 img:details.strMealThumb,
               },
             })
           }}>Order Now</button>
           <button onClick={closePopupHandler} className="popup-close" aria-label="Close popup">×</button>
         </div>
       )}
     </div>
   </div>
 )
}

export default Popup
