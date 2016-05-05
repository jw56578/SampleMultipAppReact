import React, {Component,PropTypes} from 'react';
import DropDown from '../drop-down';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,fetchModels,fetchTrims,fetchOptions,setModel} from '../../actions/vehicle-selector';
class ModelDropDownComponent extends Component
{
    componentDidMount()
    {
        this.props.source.registerModel(this);
    }
    modelChangeHandler(){

    }
    render(){
        var year = this.props.year ? this.props.year.year : null;
        var make = this.props.make ? this.props.make.make : null;
        var models = this.props.models || [];// && year && make? this.props.models[this.props.source.name][year][make] : [];
        models.sort(function(a, b){if (a.description < b.description)return -1;else if (a.description > b.description)return 1;else return 0;});
        var promptText = this.props.models ? "--Select--" : this.props.make ?  "Loading..." : null;
        return <DropDown promptText={promptText} changedHandler={this.modelChangeHandler} data={models} keyProp={'id'} text={'description'} value={'id'}  style={this.props.style}/>
    }
}
function mapStateToProps(state){
    return {
        models:state.vehicleSelectorModels,
        year: state.vehicleSelectorYear,
        make: state.vehicleSelectorMake
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchTrims,fetchOptions,setModel},dispatch);
}
var ModelDropDown = connect(mapStateToProps,mapDispatchToProps)(ModelDropDownComponent);

export {ModelDropDown};
