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
    makeChangeHandler(){

    }
    render(){
        var year = this.props.year ? this.props.year.year : null;
        var makes = this.props.makes && year ? this.props.makes[this.props.source.name][year] : [];
        return <DropDown changedHandler={this.makeChangeHandler} data={makes} />
    }
}
function mapStateToProps(state){
    return {
        makes:state.vehicleSelectorMakes,
        year: state.vehicleSelectorYear
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchModels},dispatch);
}
var MakeDropDown = connect(mapStateToProps,mapDispatchToProps)(vdd);

export {MakeDropDown};
