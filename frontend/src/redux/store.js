import {configureStore, combineReducers} from '@reduxjs/toolkit'
import RoyalFilmListReducer from './reducers/RoyalFilmListReducer';
import MulsanneFilmListReducer from './reducers/MulsanneFilmListReducer';
import CircuitFilmListReducer from './reducers/CircuitFilmListReducer';
import AllFilmsListReducer from './reducers/AllFilmsListReducer';
import SpecialFilmListReducer from './reducers/SpecialFilmListReducer';
import DatesSemaineReducer from './reducers/DatesSemaineReducer';
import PageUrlReducer from './reducers/PageUrlReducer';
import EventListReducer from './reducers/EventListReducer';
import ViewerModeReducer from './reducers/ViewerModeReducer';

const rootReducer = combineReducers({
    RoyalFilmListReducer,
    MulsanneFilmListReducer,
    CircuitFilmListReducer,
    AllFilmsListReducer,
    SpecialFilmListReducer,
    DatesSemaineReducer,
    PageUrlReducer,
    EventListReducer,
    ViewerModeReducer
})


const store = configureStore({ reducer: rootReducer });

export default store;