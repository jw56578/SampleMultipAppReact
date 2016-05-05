import { combineReducers } from 'redux';
import {GetYears,GetMakes,SetYear,vehicleSelectorReducers} from '../reducers/reducer-vehicle-selector';
import {reducers} from '../reducers';
import {get} from '../services/api';
import {UPDATE_SEARCH_CRITERIA,UPDATE_SEARCH_RESULTS} from './actions/search';
import {IS_FETCHING} from '../actions/fetching';

var gmreducers =  Object.assign({},vehicleSelectorReducers,reducers,{
   searchCriteria:SearchCriteria,
   searchResults:SearchResults,
   fetching:Fetching
   
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
/**
 * This approach is not ideal because it requires the container to call an extra function isFetching() as well as the function to do the fetching
 * but its all we got at this point
 * the action type will be IS_Fetching when the container specifically calls it
 * then the action type will be update_search_results when the actual fetch call finishes
 * this implementation is tolerable because its in a gm search specific module
 * well that is fine for searching but what about loading the vehicle selector?
 */
function Fetching(state=null,action){
    switch(action.type){
        case IS_FETCHING:
            return {isFetching:true,key:action.payload}; 
        case UPDATE_SEARCH_RESULTS:
            return {isFetching:false,key:action.payload}; 
    }
    return state;
}


//do i need to use redux-thunk??
//okay the action can do whatever I want it to no it can't because it doesn't have access to the dispatcher to make an action go to the reducers
/*
this damn thing has to be used from the component because its the only place you can bind to dispatch other wise it will never go through the pipeline,
yes somehow the actions need to have access to dispatch
 */

export default rootReducer;