import {configureStore, combineReducers} from '@reduxjs/toolkit'
import RoyalFilmListReducer from './reducers/RoyalFilmListReducer';
import MulsanneFilmListReducer from './reducers/MulsanneFilmListReducer';
import CircuitFilmListReducer from './reducers/CircuitFilmListReducer';
import AllFilmsListReducer from './reducers/AllFilmsListReducer';

const rootReducer = combineReducers({
    RoyalFilmListReducer,
    MulsanneFilmListReducer,
    CircuitFilmListReducer,
    AllFilmsListReducer
})


const store = configureStore({ reducer: rootReducer });

export default store;