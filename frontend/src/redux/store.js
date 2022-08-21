import {configureStore, combineReducers} from '@reduxjs/toolkit'
import RoyalFilmListReducer from './reducers/RoyalFilmListReducer';
import MulsanneFilmListReducer from './reducers/MulsanneFilmListReducer';
import CircuitFilmListReducer from './reducers/CircuitFilmListReducer';
import CommuneListReducer from './reducers/CommuneListReducer';
import SeanceListReducer from './reducers/SeanceListReducer';
import RoyalSeanceListReducer from './reducers/RoyalSeanceListReducer';
import MulsanneSeanceListReducer from './reducers/MulsanneSeanceListReducer';

const rootReducer = combineReducers({
    RoyalFilmListReducer,
    MulsanneFilmListReducer,
    CircuitFilmListReducer,
    CommuneListReducer,
    SeanceListReducer,
    RoyalSeanceListReducer,
    MulsanneSeanceListReducer
})


const store = configureStore({ reducer: rootReducer });

export default store;