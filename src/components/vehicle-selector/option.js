import React, {Component,PropTypes} from 'react';
import DropDown from '../drop-down';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,fetchModels,fetchTrims,fetchOptions,setModel,setOption} from '../../actions/vehicle-selector';
class OptionDropDownComponent extends Component
{
    componentDidMount()
    {
        this.props.source.registerOption(this);
    }
    optionChangedHandler(){

    }
    render(){
        //var year = this.props.year ? this.props.year.year : null;
        //var make = this.props.make ? this.props.make.make : null;
        var options = this.props.options || [];// && year && make? this.props.models[this.props.source.name][year][make] : [];
        var filteredOptions = this.props.filter ? options.filter((o)=> o.description.toLowerCase().indexOf(this.props.filter.toLowerCase()) > -1) : options;
        return <DropDown selectedValue={this.props.selectedValue} multiselect={true} changedHandler={this.optionChangedHandler} data={filteredOptions} keyProp={'id'} text={'description'} value={'id'}  style={this.props.style}/>
    }
}
function mapStateToProps(state){
    return {
        models:state.vehicleSelectorModels,
        year: state.vehicleSelectorYear,
        make: state.vehicleSelectorMake,
        options:state.vehicleSelectorOptions
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchTrims,fetchOptions,setModel,setOption},dispatch);
}
var OptionDropDown = connect(mapStateToProps,mapDispatchToProps)(OptionDropDownComponent);

export {OptionDropDown};
