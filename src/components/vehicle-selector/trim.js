import React, {Component,PropTypes} from 'react';
import DropDown from '../drop-down';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,fetchModels,fetchTrims} from '../../actions/vehicle-selector';
class TrimDropDownComponent extends Component
{
    componentDidMount()
    {
        this.props.source.registerTrim(this);
    }
    modelChangeHandler(){

    }
    render(){
        var year = this.props.year ? this.props.year.year : null;
        var make = this.props.make ? this.props.make.make : null;
        var model = this.props.model ? this.props.model : null;
        var trims = this.props.trims && year && make && model ? this.props.trims[this.props.source.name][year][make][model] : [];
        return <DropDown changedHandler={this.modelChangeHandler} data={trims}  style={this.props.style}/>
    }
}
function mapStateToProps(state){
    return {
        trims:state.vehicleSelectorTrims,
        year: state.vehicleSelectorYear,
        make: state.vehicleSelectorMake,
        model:state.vehicleSelectorModel,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchTrims},dispatch);
}
var TrimDropDown = connect(mapStateToProps,mapDispatchToProps)(TrimDropDownComponent);

export {TrimDropDown};
