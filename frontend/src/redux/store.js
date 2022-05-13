import {configureStore, combineReducers} from '@reduxjs/toolkit'
import FilmListReducer from './reducers/FilmListReducer';
import CommuneListReducer from './reducers/CommuneListReducer';

const rootReducer = combineReducers({
    FilmListReducer,
    CommuneListReducer
})


const store = configureStore({ reducer: rootReducer });

export default store;