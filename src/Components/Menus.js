import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './Hero'
import SpecialDishes from './SpecialDishes'
import FilterDishes from './FilterDishes'
import { AllMenus } from './AllMenuContext'
import Checkout from './Checkout'
import Header from './Header'
import { AppProvider } from "../context/AppProvider"


function Menus() {

  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <Header />
          <Hero />

          <Routes>
            <Route exact path='/'
              element={
                <AllMenus>
                  <SpecialDishes />
                  <FilterDishes />
                </AllMenus>
              }></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
          </Routes>

        </AppProvider>
      </BrowserRouter>
    </div>
  )
}

export default Menus
