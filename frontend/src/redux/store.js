import {configureStore, combineReducers} from '@reduxjs/toolkit'
import RoyalFilmListReducer from './reducers/RoyalFilmListReducer';
import MulsanneFilmListReducer from './reducers/MulsanneFilmListReducer';
import CircuitFilmListReducer from './reducers/CircuitFilmListReducer';
import AllFilmsListReducer from './reducers/AllFilmsListReducer';
import SpecialFilmListReducer from './reducers/SpecialFilmListReducer';
import DatesSemaineReducer from './reducers/DatesSemaineReducer';

const rootReducer = combineReducers({
    RoyalFilmListReducer,
    MulsanneFilmListReducer,
    CircuitFilmListReducer,
    AllFilmsListReducer,
    SpecialFilmListReducer,
    DatesSemaineReducer
})


const store = configureStore({ reducer: rootReducer });

export default store;