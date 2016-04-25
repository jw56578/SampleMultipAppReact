import {get} from '../services/api';

export const FETCH_YEARS = "FETCH_YEARS";
export const FETCH_MAKES = "FETCH_MAKES";

export const YEAR_CHANGED = "YEAR_CHANGED";
export const MAKE_CHANGED = "MAKE_CHANGED";
export const MODEL_CHANGED = "MODEL_CHANGED";
export const TRIM_CHANGED = "TRIM_CHANGED";

//how should this thing handle calling different apis for what source you want just a string?
function fetchYears(id,source){
    return {
        type:FETCH_YEARS,
        payload:get(source.name,'year'),
        meta:{id:id,source:source}
    }
}
function fetchMakes(id, source,year){
    return {
       type:FETCH_MAKES,
       payload:get(source.name,'make',year),
       meta:{id:id,year:year,source:source}
    }
}
function setYear(id, year){
     return {
       type:YEAR_CHANGED,
       payload:year,
       meta:{id:id}
    }
}
function setMake(id, make){
    return {
       type:YEAR_CHMAKE_CHANGEDANGED,
       payload:year,
       meta:{id:id}
    }
}
function setModel(id,model){
    return {
       type:MODEL_CHANGED,
       payload:year,
       meta:{id:id}
    }
}
export {fetchYears};
export {fetchMakes};
export {setYear};
export {setMake};
export {setModel};
