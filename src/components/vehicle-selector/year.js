import React, {Component,PropTypes} from 'react';
import DropDown from '../drop-down';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,setYear} from '../../actions/vehicle-selector';
class vdd extends Component
{
    componentDidMount()
    {
        var id = this.props.id;
        this.props.fetchYears(id, this.props.source);
        /// get years sending in a unique id , pulled from props, then you can have mulitple year dropd downs
        this.yearChangeHandler = this.yearChangeHandler.bind(this);
    }
    yearChangeHandler(year){
        this.props.setYear(this.props.id,year);
        //if i put this here then it will mean a request for makes will always be done when a year is changed even if there is no make drop down 
        //but if i don't put it here then every component that uses it will have to handle fetching the makes
        //how the heck can a component listen for a property to change such as selectedYear, and then do something
        //so the make drop down would listen for selectedYear and if changed would itself fetch the makes
        this.props.fetchMakes(this.props.id,this.props.source,year);
    }
    render(){
        var years = this.props.years ? this.props.years[this.props.source.name] : [];
        return <DropDown changedHandler={this.yearChangeHandler} data={years} />
    }
}
function mapStateToProps(state){
    return {
        years:state.vehicleSelectorYears
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchYears,fetchMakes,setYear},dispatch);
}
var YearDropDown = connect(mapStateToProps,mapDispatchToProps)(vdd);

export {YearDropDown};
