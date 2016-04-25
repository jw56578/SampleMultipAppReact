import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropDown from '../../components/drop-down';
import {fetchYears,fetchMakes,fetchModels,fetchTrims} from '../../actions/vehicle-selector';
import {bindActionCreators} from 'redux';
import {YearDropDown,MakeDropDown} from '../../components/vehicle-selector';
//no idea how this would work
import {GMVehicleSelectorSource} from '../../components/vehicle-selector';

class SearchCriteria extends Component
{
    constructor(props, context) {
        super(props, context);
        this.state = {
            year: "333",
            make:"BMW",
            model:"",
            trim:""
        };
        //could you import the vehicle specific drop down from the import?
        //this would mean that the same drop down would be used all the time so you could not have multiple vehicle selectors on the same page
        //you woudl have to make it a class and make a new instance
        this.yearChanged = this.yearChanged.bind(this);
        this.makeChanged = this.makeChanged.bind(this);
    }
    componentDidMount(){

    }
    
    //i dont' want these functions to have to be on every single thing that uses vehicle selector drop downs
    //where to put this
    yearChanged(year){
        this.setState({year});
        this.props.fetchMakes();
    }
    makeChanged(make){
        this.setState({make});
        this.props.fetchModels(this.state.year,this.state.make);
    }
    modelChanged(model){
        this.setState({make});
        this.props.fetchModels(this.state.year,this.state.make);
    }
    render(){
        var years = this.props.years ? this.props.years.data : [];
        return(
        <table>
            <thead></thead>
            <tbody>
            <tr>
                <td>
                Year
                </td>
                <td>
                <YearDropDown source={GMVehicleSelectorSource} id={1}/>
                <YearDropDown source={GMVehicleSelectorSource} id={2}/>
                </td>
            </tr>
            <tr>
                <td>
                Make
                </td>
                <td>
                <MakeDropDown source={GMVehicleSelectorSource} id={1}/>
                <MakeDropDown source={GMVehicleSelectorSource} id={2}/>
   
                </td>
            </tr>
            <tr>
                <td>
                Model
                </td>
                <td>
               <DropDown changedHandler={this.modelChanged} data={this.props.models}  selectedValue={this.state.model}/>
                </td>
            </tr>
            </tbody>
        </table>
        )
    }
}
function mapStateToProps(state){
    //need to put the state values in the index reducer combined
    //i don't want to have to do this for every single component that uses vehicle selector drop downs
    return {
        years:state.vehicleSelectorYears,
        makes:state.vehicleSelectorMakes,
        models:state.vehicleSelectorModels,
        trms:state.vehicleSelectorTrims
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchYears,fetchMakes,fetchModels,fetchTrims},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchCriteria);


