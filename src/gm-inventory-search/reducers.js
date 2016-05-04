import { combineReducers } from 'redux';
import {GetYears,GetMakes,SetYear,vehicleSelectorReducers} from '../reducers/reducer-vehicle-selector';
import {reducers} from '../reducers';
import {get} from '../services/api';
import {UPDATE_SEARCH_CRITERIA,UPDATE_SEARCH_RESULTS} from './actions/search';

var gmreducers =  Object.assign({},vehicleSelectorReducers,reducers,{
   searchCriteria:SearchCriteria,
   searchResults:SearchResults
});
const rootReducer = combineReducers(gmreducers);

function SearchCriteria(state=null,action){
    switch(action.type){
        case UPDATE_SEARCH_CRITERIA:
            var criteria = Object.assign({}, state, action.payload);
            return criteria;
    }
    return state;
    
}
function SearchResults(state=null,action){
    switch(action.type){
        case UPDATE_SEARCH_RESULTS:
            return action.payload.data; 
    }
    return state;
}
export default rootReducer;