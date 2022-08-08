import {configureStore, combineReducers} from '@reduxjs/toolkit'
import FilmListReducer from './reducers/FilmListReducer';
import CommuneListReducer from './reducers/CommuneListReducer';
import SeanceListReducer from './reducers/SeanceListReducer';
import RoyalSeanceListReducer from './reducers/RoyalSeanceListReducer';
import MulsanneSeanceListReducer from './reducers/MulsanneSeanceListReducer';

const rootReducer = combineReducers({
    FilmListReducer,
    CommuneListReducer,
    SeanceListReducer,
    RoyalSeanceListReducer,
    MulsanneSeanceListReducer
})


const store = configureStore({ reducer: rootReducer });

export default store;