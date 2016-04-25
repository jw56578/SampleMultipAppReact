import { combineReducers } from 'redux';
import {GetYears,GetMakes,SetYear} from '../reducers/reducer-vehicle-selector';

const rootReducer = combineReducers({
    vehicleSelectorYears:GetYears,
    vehicleSelectorMakes:GetMakes,
    vehicleSeletorModels:null,
    vehicleSeletorTrims:null,
    vehicleSelectorYear: SetYear
    

});

export default rootReducer;