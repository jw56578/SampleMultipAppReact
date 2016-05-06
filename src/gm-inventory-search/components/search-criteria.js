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
//import Modal from 'react-modal';
import {getSearchingMessage,getErrorMessage} from '../messages'
import {isFetching} from '../../actions/fetching';
import {OPTIONS_REMOVED} from '../reducers';
var externalSearchExport = function(){
}
var externalSearch = function() {
    externalSearchExport()
}
var unselectOption = function(opt){
    return {
            type:OPTIONS_REMOVED,
            payload:opt
    }
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
        this.state= {showModal:false,states : null,errorMessage:'',searchCriteria:{distance:500}};
        this.filterOptions = this.filterOptions.bind(this);
        this.gmsource = new GMVehicleSelectorSource();
        
    }
    componentDidMount(){
        //this is not a normal thing, only because this component is being used outside the react boundary           
        externalSearchExport =this.updateSearchResults;
        //load all ajax things in componentDidMount
        this.props.getEntity('state');
        var heartBeat = function(){
            setTimeout(()=>{
                if (!this.props.year > 0){
                    this.setState({modalMessage:'We are having difficultly retrieving information from the GM system.'});
                    hearBeat();
                }
                else{
                    this.setState({modalMessage:''});
                }
            },5000);
        }.bind(this);
        //why does this break things when the modal message is set else where
        //heartBeat();
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
                    optionCodes: this.props.selectedOptions
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
    filterOptions(e){
        var filter = e.target.value;
        this.setState({filter});
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
        var optionButtons = this.props.selectedOptions ? this.props.selectedOptions.map((o)=>{
            var opt =  this.props.allOptions.find((all)=>{return all.id === o});
            if(opt)
                return <div key={opt.id} style={{display:'inline-block',padding:'1px 1px 1px 1px'}}><button onClick={this.props.unselectOption.bind(this,opt.id)} style={{padding:'4px 4px 4px 4px'}}>X {opt.description}</button></div>
        }) : []; 
       
 
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
                                <input onChange={this.filterOptions} style={{width:'400px'}} placeholder="Filter:" />
                                <br/>
                                <OptionDropDown filter={this.state.filter} selectedValue={selectedOptions} source={gmsource} id={1} style={{width:'400px',height:'10em'}}/>
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
            <div >
              {optionButtons}
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
        years:state.vehicleSelectorYears,
        year:state.vehicleSelectorYear,
        make:state.vehicleSelectorMake,
        model:state.vehicleSelectorModel,
        trim:state.vehicleSelectorTrim,
        entity:state.getEntity,
        allOptions:state.vehicleSelectorOptions, // all options that are currently loaded
        options:state.vehicleSelectorOption, //options choosen in drop down
        fetching:state.fetching,
        results:state.searchResults,
        selectedOptions: state.selectedOptions // options that are selected and should be buttons
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({updateSearchResults,getEntity,setOption,isFetching,unselectOption},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchCriteria);
export {externalSearch};


