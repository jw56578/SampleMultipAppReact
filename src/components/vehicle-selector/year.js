import React, {Component,PropTypes} from 'react';
import DropDown from '../drop-down';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,setYear} from '../../actions/vehicle-selector';

class YearDropDownComponent extends Component
{
    componentDidMount()
    {
        this.props.source.registerYear(this);
    }
    render(){
        var years = this.props.years ? this.props.years[this.props.source.name] : [];
        years.sort(function(a, b){return parseInt(b.year)-parseInt(a.year)});
        return <DropDown keyProp={'year'} value={'year'} text={'year'} changedHandler={this.yearChangeHandler} data={years}  style={this.props.style}/>
    }
}

function mapStateToProps(state){
    return {
        years:state['vehicleSelectorYears']
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchYears,fetchMakes,setYear},dispatch);
}
var YearDropDown = connect(mapStateToProps,mapDispatchToProps)(YearDropDownComponent);

export {YearDropDown};
