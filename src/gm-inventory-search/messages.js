function getSearchingMessage(criteria){
    if(criteria.zipcode){
        return 'Searching zipcode ' + criteria.zipcode + ' within ' + criteria.distance + ' miles.';
    }
    if(criteria.city){
        return 'Searching city ' + criteria.city + ' within ' + criteria.distance + ' miles.';
    }
    if(criteria.state){
        return 'Searching state ' + criteria.state + '.';
    }
    if(criteria.states){
        return 'Searching multiple states ' + criteria.states.join(' ') + '.';
    }
}
function getErrorMessage(criteria){
    if(!criteria.year || !criteria.make || !criteria.model){
        return 'Year, Make and Model are required.';
    }
    if(!criteria.state  && !criteria.city && !criteria.zipcode && !criteria.vendorId && !criteria.states){
        return 'Please enter one of the following search criteria: zip code, state, city and state or BAC';
    }
    if((criteria.zipcode || criteria.city) && !criteria.distance){
        return 'Please enter distance';
    }
    if((criteria.city) && !criteria.state){
        return 'Please select state for city';
    }
}

export{getSearchingMessage}
export{getErrorMessage}