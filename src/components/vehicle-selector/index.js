import DropDown from '../drop-down';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,fetchModels,fetchTrims} from '../../actions/vehicle-selector';
import {YearDropDown} from './year';
import {MakeDropDown} from './make';

class VehicleSelector{
    constructor() {

    }
    handleYearChanged(){
        
        
    }
    
}
class VehicleSelectorSource{
    constructor() {

    }
}
class GMVehicleSelectorSource{
    constructor() {
        this.name="gmvehicleselector";
        this.yearDropDown=null;
        this.makeDropDown=null;
        this.modelDropDown=null;
    }

    registerYear(component){
        this.yearDropDown = component;
        var id = component.props.id;
        component.props.fetchYears(id, this);
        component.yearChangeHandler = function(year){
             component.props.setYear(id,year);
             if(this.makeDropDown)
                component.props.fetchMakes(id,this,year);
        }.bind(this); 
    }
    registerMake(component){
        this.makeDropDown = component;
        var id = component.props.id;
        component.makeChangeHandler = function(make){
             component.props.setMake(id,make);
             if(this.modelDropDown)
                component.props.fetchModels(id,this,component.year,make);
        }.bind(this); 
    }
}

export {VehicleSelector};
export {YearDropDown};
export {MakeDropDown};

///how can you syncronize the make model year drop downs
//there is no way to determine the order of when they are registered
//if you register the make and the year isn't registered yet, how will it know to request all makes or wait till a year is choosen
//how wouled anything even know if the make drop down desires to be updated 
//for now lets just make the assumption that make/model..etc will never be by itself

export {GMVehicleSelectorSource};
