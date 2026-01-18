import { createContext, useReducer } from "react"
const DispatchContext = createContext()
const StateContext = createContext()

const AppProvider = ({ children }) => {
  //console.log("These are children",children);
  const initialState = {
    cartItems: [],
  }
  const reducer = (state, action) => {
    //  console.log("State",state);
    //  console.log("action",action);
    switch (action.type) {
      case "add_to_cart":
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload]
        }
      case "remove_from_cart":
        // payload expected to be the index to remove
        return {
          ...state,
          cartItems: state.cartItems.filter((_, idx) => idx !== action.payload)
        }
      default: {
        return state
      }
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log("this is state", state);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>

  )
}

export { AppProvider, DispatchContext, StateContext }

export default AppProvider