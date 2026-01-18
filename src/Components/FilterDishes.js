import React, { useContext, useState,useEffect } from 'react'
import Pagination from './Pagination'
import Popup from './Popup'
import CardDish from './CardDish'
import { AllMenuContext } from './AllMenuContext'
import { fetchCategories, fetchByCategory } from '../utils/api'
//import { AllMenuContext } from './Menus'

function FilterDishes(props) {
  let allMenus = useContext(AllMenuContext)
 
  let [menuCategory,setMenuCategory] = useState([])
   let [filteredDishes,setFilteredDishes] = useState([]) 
  let [activeDish,setActiveDish]=useState("Beef")
  let [currentPage,setCurrentPage] = useState(1)
  let [itemsPerPage,setItemsPerPage] = useState(8)
  let [showPopup,setShowPopup] = useState(false)
  let [currentDish,setCurrentDish] = useState('')

// console.log(" all the menus",menu);
  //Get all the category
    async function getAllTheCategories(){
      const cats = await fetchCategories()
      setMenuCategory(cats)
    }
      //Get single dishes (initial beef list)
      async function getOnlyOneDish(){
        const meals = await fetchByCategory('Beef')
        setFilteredDishes(meals)
      }
  useEffect(()=>{
  
      getAllTheCategories()
      getOnlyOneDish()
     
  },[])
  let indexOfLastDish = currentPage * itemsPerPage
  //1* 4 = 4
  //2 * 4 = 8
  //3 * 4 =12
  let indexOfFirstDish = indexOfLastDish - itemsPerPage
  // 4-4=0
  //8-4=4 
  //12-4=8
  let showTheseDishesNow = filteredDishes.slice(indexOfFirstDish,indexOfLastDish).map((item, idx)=> (
    <CardDish key={item.idMeal || idx} menuItem={item} showPopupHandler={showPopupHandler} />
  ))

//lets show only single dishes
let maxItem = 8

//show dishes  on click
 async function showFilteredDishesHandler(category){
  setActiveDish(category)
  // reset pagination to first page when selecting a new category
  setCurrentPage(1)
  console.log("Please shows the dishes of ",category);
  try{
    const API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
    const res = await fetch(API)
    const json = await res.json()
    setFilteredDishes(json.meals || [])
  }catch(err){
    console.error('Failed to fetch filtered dishes for', category, err)
    setFilteredDishes([])
  }
 }
// maxItem not used when using paginated filteredDishes

// popup handlers
function showPopupHandler(dishName){
  setShowPopup(true)
  setCurrentDish(dishName)
}
function closePopupHandler(){
  setShowPopup(false)
}
//console.log(filteredDishes.length);
  //Let shows the Category
  let allCategories = menuCategory.map((item)=>{
    return(
      <li className={ item.strCategory == activeDish ? "active": ""} onClick={()=>{showFilteredDishesHandler(item.strCategory)}}>{item.strCategory}</li>
    )
  })
   return (
    <div className='filter-dishes'>
     <div className="container">
        <div className="text-center">
        <h2>Choose your dishes</h2>
        <p>Browse categories to find dishes you’ll love — from quick weeknight meals to impressive weekend recipes. Filter by category and pick dishes that suit your taste and time.</p>
        </div>
        <div className="filterd-dishes">
           <ul>
            {allCategories}
           </ul>
        </div>
        <div className="filtered-dishes-results">
          <ul  className='flex flex-wrap gap-30'>
            {
              (filteredDishes && filteredDishes.length > 0)
              ? showTheseDishesNow
              : (
                  <div className="alert">
                    <h3>Sorry, No item found.</h3>
                    <h4>Please try another diashes</h4>
                  </div>
                )
            }
          </ul>
        </div>
      {showPopup && <Popup closePopupHandler={closePopupHandler} currentDish={currentDish} />}
      <Pagination  
       filteredDishes = {filteredDishes}
       itemsPerPage = {itemsPerPage}
       currentPage = {currentPage}
       setCurrentPage ={setCurrentPage}
       />
     </div>
    </div>
  )
}

 
 export default FilterDishes
