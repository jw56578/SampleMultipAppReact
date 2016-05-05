import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropDown from '../../components/drop-down';
import {fetchYears,fetchMakes,fetchModels,fetchTrims,setOption} from '../../actions/vehicle-selector';
import {bindActionCreators} from 'redux';
import {YearDropDown,MakeDropDown,ModelDropDown,TrimDropDown,OptionDropDown} from '../../components/vehicle-selector';
import {updateSearchResults,updateSearchCriteria} from '../actions/search';
import {GMVehicleSelectorSource} from '../../components/vehicle-selector';
import {save,getEntity} from '../../actions/entity';
import {getChildCompanyId} from '../../services/authentication';
import Modal from 'react-modal';
import {getSearchingMessage,getErrorMessage} from '../messages'
import {isFetching} from '../../actions/fetching';

var externalSearchExport = function(){
}
var externalSearch = function() {
    externalSearchExport()
}
class SearchCriteria extends Component
{ 
    constructor(props, context) {
        super(props, context);
        this.testSaveVehicle = this.testSaveVehicle.bind(this);
        this.updateCriteria = this.updateCriteria.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);
        this.stateChangedHandler = this.stateChangedHandler.bind(this);
        this.clear = this.clear.bind(this);
        this.state= {showModal:false,states : null,errorMessage:'',searchCriteria:{}};
        this.gmsource = new GMVehicleSelectorSource();
        
    }
    componentDidMount(){
        //this is not a normal thing, only because this component is being used outside the react boundary           
        externalSearchExport =this.updateSearchResults;
        //load all ajax things in componentDidMount
        this.props.getEntity('state');
    }
    updateSearchResults(){
        var opts = this.props.options  ? this.props.options.options : null;
        opts = typeof opts === "string" ?  [opts] : opts ;
        const {year,make,model} = this.props;
        var criteria = {
                    year:year ? year.year : null,
                    make :make  && make.make? make.make.id : null,
                    model : model && model.model? model.model.id : null,
                    sellingSourceId : make  && make.make ? make.make.sellingSourceId : null,
                    optionCodes: opts,
                };
        criteria = Object.assign({},this.state.searchCriteria,criteria);
        var errormessage = getErrorMessage(criteria);
        if(errormessage){
            this.setState({searchCriteria:criteria,errorMessage:errormessage});
        }
        else{
            this.props.isFetching('gm-inventory-search');
            this.setState({modalMessage:getSearchingMessage(criteria),searchCriteria:criteria,errorMessage:""});
            this.props.updateSearchResults(criteria);  
        }
         
    }
    updateCriteria(field,event){
        var criteria ={};
        criteria[field] = event.target.value;
        criteria = Object.assign({},this.state.searchCriteria,criteria);
        this.setState({searchCriteria:criteria});
    }
    testSaveVehicle(){
        this.props.save('vehicle',{make:'Ford',model:'Mustang',companyId:getChildCompanyId()});
    }
    stateChangedHandler(states){
        states = typeof states === "string" ? {state:states,states:null} :  {states,state:null}
        var criteria = Object.assign({},this.state.searchCriteria,states);
        this.setState({searchCriteria:criteria});
    }
 
    clear(){
        this.setState({searchCriteria:{}});   
        this.props.setOption(1,null);
    }
    render(){
        // compose of the isFetching and this.state.modalMessage
        const{fetching,entity,options,results} = this.props; 
        var modalMessage = fetching && fetching.isFetching ? <span>{this.state.modalMessage}</span> : 
            results && results.length >=0 ? <span>Found {results.length} records</span> : '';
        var gmsource = this.gmsource;
        var inputStyle= {width:'100px'};
        var divTableStyle = {height:'12em',display:'inline-block',marginRight:'50px'};
        var states = entity ?  entity.entity : [];
        var selectedOptions = options && options.options ? typeof options.options === 'string' ? [options.options] : options.options : [];
        var chooseTrim =    <Modal
                    isOpen={this.state.showModal}
                    >
                    {this.state.modalMessage}
                </Modal>   
        return(
        <div>
            <br/>
            <div style={divTableStyle}>
                <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td>
                            Year
                        </td>
                        <td>
                            <YearDropDown source={gmsource} id={1} style={inputStyle}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Make
                        </td>
                        <td>
                            <MakeDropDown source={gmsource} id={1} style={inputStyle}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Model
                        </td>
                        <td>
                            <ModelDropDown source={gmsource} id={1} style={inputStyle}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                 
                        </td>
                        <td>
                           
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style={divTableStyle}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Options:<br/>
                                <OptionDropDown selectedValue={selectedOptions} source={gmsource} id={1} style={{width:'400px',height:'10em'}}/>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div style={divTableStyle}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                States:<br/>
                                <DropDown selectedValue={this.state.searchCriteria.states || [this.state.searchCriteria.state]} multiselect={true} changedHandler={this.stateChangedHandler} data={states} keyProp={'value'} text={'value'} value={'value'}  style={{height:'10em',width:'80px'}}/>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div style={divTableStyle}>
                <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td>
                            Distance
                        </td>
                        <td>
                            <input value={this.state.searchCriteria.distance} style={inputStyle} onChange={this.updateCriteria.bind(this,'distance')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        City
                        </td>
                        <td>
                           <input value={this.state.searchCriteria.city} style={inputStyle} onChange={this.updateCriteria.bind(this,'city')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Zip
                        </td>
                        <td>
                            <input value={this.state.searchCriteria.zipcode}  style={inputStyle} onChange={this.updateCriteria.bind(this,'zipcode')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            BAC
                        </td>
                        <td>
                            <input  value={this.state.searchCriteria.vendorId} style={inputStyle} onChange={this.updateCriteria.bind(this,'vendorId')} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            
                        </td>
                        <td>
                           <button type="button" onClick={this.clear}>Clear All</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <span>{this.state.errorMessage}</span><br/>
            {modalMessage}
           
            
        </div>

        )
    }
}
function mapStateToProps(state){
    return {
        year:state.vehicleSelectorYear,
        make:state.vehicleSelectorMake,
        model:state.vehicleSelectorModel,
        trim:state.vehicleSelectorTrim,
        entity:state.getEntity,
        options:state.vehicleSelectorOption,
        fetching:state.fetching,
        results:state.searchResults
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({updateSearchResults,getEntity,setOption,isFetching},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchCriteria);
export {externalSearch};


