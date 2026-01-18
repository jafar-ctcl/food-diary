export async function fetchCategories(){
  const API = 'https://www.themealdb.com/api/json/v1/1/categories.php'
  const res = await fetch(API)
  const json = await res.json()
  return json.categories || []
}

export async function fetchByCategory(category){
  const API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
  const res = await fetch(API)
  const json = await res.json()
  return json.meals || []
}

export async function lookupMealById(id){
  const API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  const res = await fetch(API)
  const json = await res.json()
  return json.meals && json.meals[0] ? json.meals[0] : null
}

export async function searchMealByName(name){
  const API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`
  const res = await fetch(API)
  const json = await res.json()
  return json.meals && json.meals[0] ? json.meals[0] : null
}
