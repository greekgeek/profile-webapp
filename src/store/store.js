import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from './reducers/profile';
import blogReducer from './reducers/blogs';
const store = createStore(combineReducers({ profile: profileReducer , blogs: blogReducer}), applyMiddleware(thunk));
export default store;