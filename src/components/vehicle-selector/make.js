import React, {Component,PropTypes} from 'react';
import DropDown from '../drop-down';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchYears,fetchMakes,fetchModels,fetchTrims,setMake} from '../../actions/vehicle-selector';
class MakeDropDownComponent extends Component
{
    componentDidMount()
    {
         this.props.source.registerMake(this);
    }
    makeChangeHandler(){

    }
    render(){
        var year = this.props.year ? this.props.year.year : null;
        var makes = this.props.makes && year && this.props.makes[this.props.source.name][year] ? this.props.makes[this.props.source.name][year] : [];
        var promptText = this.props.makes ? "--Select--" : this.props.year ?  "Loading..." : null;
        return <DropDown promptText={promptText} changedHandler={this.makeChangeHandler} data={makes} keyProp={'id'} text={'description'} value={'id'}  style={this.props.style}/>
    }
}
function mapStateToProps(state){
    return {
        makes:state.vehicleSelectorMakes,
        year: state.vehicleSelectorYear
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchModels,setMake},dispatch);
}
var MakeDropDown = connect(mapStateToProps,mapDispatchToProps)(MakeDropDownComponent);

export {MakeDropDown};
