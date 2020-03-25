import {createStore,combineReducers,applyMiddleware,compose  } from 'redux'
import ReduxThunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'
import sideReducer from './reducess/sidebar'
import roleReducer from './reducess/role'
import rightReducer from './reducess/right'
import blogDataReducer from './reducess/blogData'
import loadingReducer from './reducess/isLoading'
import userReducer from './reducess/user'
const reducer = combineReducers({
  isCollapsed:sideReducer,
  roleList:roleReducer,
  rightList:rightReducer,
  blogList:blogDataReducer,
  userList:userReducer,
  isLoading:loadingReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,/* preloadedState, */ composeEnhancers(applyMiddleware(ReduxThunk,ReduxPromise)))

export default store