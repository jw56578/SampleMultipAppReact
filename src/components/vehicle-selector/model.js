import React, {Component,PropTypes} from 'react';
import DropDown from '../drop-down';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,fetchModels,fetchTrims} from '../../actions/vehicle-selector';
class vdd extends Component
{
    componentDidMount()
    {
    }
    modelChangeHandler(){

    }
    render(){
        var year = this.props.year ? this.props.year.year : null;
        var makes = this.props.makes && year ? this.props.makes[this.props.source.name][year] : [];
        return <DropDown changedHandler={this.modelChangeHandler} data={makes} />
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
    return bindActionCreators({fetchTrims},dispatch);
}
var ModelDropDown = connect(mapStateToProps,mapDispatchToProps)(vdd);

export {ModelDropDown};
