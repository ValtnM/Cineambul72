import {configureStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit'
import FilmListReducer from './reducers/FilmListReducer';

const rootReducer = combineReducers({
    FilmListReducer
})


const store = configureStore({ reducer: rootReducer });

export default store;