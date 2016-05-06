import { combineReducers } from 'redux';
import {GetYears,GetMakes,SetYear,vehicleSelectorReducers} from '../reducers/reducer-vehicle-selector';
import {reducers} from '../reducers';
import {get} from '../services/api';
import {UPDATE_SEARCH_CRITERIA,UPDATE_SEARCH_RESULTS} from './actions/search';
import {IS_FETCHING} from '../actions/fetching';
import {OPTIONS_CHANGED} from '../actions/vehicle-selector';
const OPTIONS_REMOVED = 'OPTIONS_REMOVED';


var gmreducers =  Object.assign({},vehicleSelectorReducers,reducers,{
   searchCriteria:SearchCriteria,
   searchResults:SearchResults,
   fetching:Fetching,
   selectedOptions:SetOption
   
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
// i need to use this to to store the selected options so i can clear out the original seleted options
//so that i can transfer the UI represenation from the list to the buttons since a list is too ackward to use
//i have no clud how to implement this
/*
when this thing is called i just splice it to the existing state which is how it will add it
when the button is clicked to remove then i just call another function to invoke a remove thingt
the remove will handle anotehr action type and take the entry out of the state and return it
 */
function SetOption(state=null,action){
    switch(action.type){
        case OPTIONS_CHANGED:
            //might need to loop here in order to make sure duplicates aren't added
            //this case is capturing every option that is currently selected in the drop down and adding to accumulate every option that was ever choosen
            //not just twhat is currently selected at this moment
            state = state || [];
            var s = state.slice(0,state.length);
            if(typeof action.payload === "string" && s.indexOf(action.payload) === -1 ){
                s.push(action.payload); 
            }else{
                for(var opt in action.payload){
                    if(s.indexOf(action.payload[opt]) === -1){
                        s.push(action.payload[opt]); 
                    }
                }
            }
            //at this point, the state should be an array of every option ever click on in the list box
            return s;
        case OPTIONS_REMOVED:
            //SPLICE OR WHATEVER TO REMOVE THE PAYPLOAD FROM THE STATE AND RETURN
            var index = state.indexOf(action.payload);
            state.splice(index, 1);
            return state.slice(0,state.length);
            
            
            
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
export {OPTIONS_REMOVED};