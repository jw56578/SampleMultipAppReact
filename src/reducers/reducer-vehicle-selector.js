import {FETCH_YEARS} from '../actions/vehicle-selector';
import {FETCH_MAKES} from '../actions/vehicle-selector';

import {YEAR_CHANGED} from '../actions/vehicle-selector';
import {MAKE_CHANGED} from '../actions/vehicle-selector';
import {MODEL_CHANGED} from '../actions/vehicle-selector';
import {TRIM_CHANGED} from '../actions/vehicle-selector';

//remember this function is always called for every action that occurs, action.type is used to determine if anything should be done
//http://stackoverflow.com/questions/36303028/react-redux-displaying-multiple-components-sharing-same-actions-but-with-diff
function GetYears(state=null,action){
    switch(action.type){
        case FETCH_YEARS:
            var source = action.meta.source.name;
            if(state===null || !state[source]){
                var obj = {};
                obj[source] = action.payload.data;
                return Object.assign({}, state, obj);
            }
    }
    return state;
}
function GetMakes(state=null,action){
    switch(action.type){
        case FETCH_MAKES:
            var source = action.meta.source.name;
            var year = action.meta.year;
            if(state===null || !state[source]){
                var obj = {};
                obj[source] = {};
                obj[source][year] = action.payload.data;
                return Object.assign({}, state, obj);
            }
            if(!state[source][year]){
                var s = Object.assign({}, state, {});
                s[source][year] = action.payload.data
                return s;
            }
    }
    return state;
}
function SetYear(state=null,action){
    if(state && state.id !== action.meta.id)
        return state;
    switch(action.type){
        case YEAR_CHANGED:
            return {id:action.meta.id,year:action.payload};
    }
    return state;
}
export{GetYears};
export{GetMakes};
export{SetYear};