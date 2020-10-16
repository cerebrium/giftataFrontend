import { useMemo } from 'react'
import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// store interface
interface storeType {
  count: number
}

// declare the store
let store: Store<storeType> | undefined

// make interface for the initial state
interface intitialStateInterface {
  count: number
}

const initialState: intitialStateInterface = {
  count: 0,
}

const reducer = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    // add to the number in the count
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      }

    // decrease the number in the count  
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      }

    // make the number zero  
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      }

    // return state  
    default:
      return state
  }
}

// initialize the store
function initStore(preloadedState = initialState) {

  // create the store
  return createStore(
    // the reducer function
    reducer,

    // initial state
    preloadedState,

    // allows for asynchronous state managment
    composeWithDevTools(applyMiddleware())
  )

}

export const initializeStore = (preloadedState: intitialStateInterface) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })

    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store

  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: {count: number }) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}