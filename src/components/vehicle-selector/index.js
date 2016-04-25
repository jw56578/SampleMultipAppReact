import DropDown from '../drop-down';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,fetchModels,fetchTrims} from '../../actions/vehicle-selector';
import {YearDropDown} from './year';
import {MakeDropDown} from './make';

class VehicleSelector{
    constructor() {
        //could you import the vehicle specific drop down from the import?
        //this would mean that the same drop down would be used all the time so you could not have multiple vehicle selectors on the same page
        //you woudl have to make it a class and make a new instance

    }
    handleYearChanged(){
        
        
    }
    
}
class VehicleSelectorSource{
    constructor() {

    }
}


export {VehicleSelector};
export {YearDropDown};
export {MakeDropDown};
const GMVehicleSelectorSource = {name:"gmvehicleselector"};
export {GMVehicleSelectorSource};
