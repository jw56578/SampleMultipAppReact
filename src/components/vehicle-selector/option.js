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
        return <DropDown selectedValue={this.props.selectedValue} multiselect={true} changedHandler={this.optionChangedHandler} data={options} keyProp={'id'} text={'description'} value={'id'}  style={this.props.style}/>
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
