import DropDown from '../drop-down';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,fetchModels,fetchTrims} from '../../actions/vehicle-selector';
import {YearDropDown} from './year';
import {MakeDropDown} from './make';
import {ModelDropDown} from './model';
import {TrimDropDown} from './trim';
import {OptionDropDown} from './option';
import {GMVehicleSelectorSource} from './gm-vehicle-selector-source';
class VehicleSelector{
    constructor() {

    }
    handleYearChanged(){
        
        
    }
    
}

export {TrimDropDown};
export {VehicleSelector};
export {YearDropDown};
export {MakeDropDown};
export {ModelDropDown};
export {GMVehicleSelectorSource};
export {OptionDropDown};
