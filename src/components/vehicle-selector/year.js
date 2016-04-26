import React, {Component,PropTypes} from 'react';
import DropDown from '../drop-down';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,setYear} from '../../actions/vehicle-selector';

class vdd extends Component
{
    componentDidMount()
    {
        this.props.source.registerYear(this);
    }
    render(){
        var years = this.props.years ? this.props.years[this.props.source.name] : [];
        return <DropDown changedHandler={this.yearChangeHandler} data={years} />
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
var YearDropDown = connect(mapStateToProps,mapDispatchToProps)(vdd);

export {YearDropDown};
