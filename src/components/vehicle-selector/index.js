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
        this.initSetTimeout = null;
    }
    fetchMakes(year){
        //i guess there should just be an id for this whole object instance
        this.yearDropDown.props.fetchMakes(0,this,year);
    }
    init(){
        if(!this.yearDropDown){
           this.fetchMakes();
        }
        if(!this.makeDropDown)
            this.fetchMakes = function(){};
    }
    resetInit(){
        if(this.initSetTimeout)
            clearTimeout(this.initSetTimeout);
        this.initSetTimeout = setTimeout(function() {
            this.init();
        }.bind(this), 1);   
    }
    registerYear(component){
        this.resetInit();
        this.yearDropDown = component;
        var id = component.props.id;
        component.props.fetchYears(id, this);
        component.yearChangeHandler = function(year){
            component.props.setYear(id,year);
            this.fetchMakes(year);
        }.bind(this);
     
    }
    registerMake(component){
        this.resetInit();
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

export {GMVehicleSelectorSource};
