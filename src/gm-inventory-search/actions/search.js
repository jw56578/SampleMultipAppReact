export const UPDATE_SEARCH_CRITERIA = "UPDATE_SEARCH_CRITERIA";
export const UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS";
import {get,post} from '../../services/api';


//how should this thing handle calling different apis for what source you want just a string?
function updateSearchCriteria(criteria){
    return {
        type:UPDATE_SEARCH_CRITERIA,
        payload:criteria
    }
}
function setSearchResults(data){
     return {
        type:UPDATE_SEARCH_RESULTS,
        payload:{data:data}
    }
}
function updateSearchResults(criteria){
     return {
        type:UPDATE_SEARCH_RESULTS,
        payload:post('gmvehiclelocator','gm',criteria)
    }
}

export {updateSearchCriteria};
export {updateSearchResults};
export {setSearchResults};
export {UPDATE_SEARCH_CRITERIA};
export {UPDATE_SEARCH_RESULTS};