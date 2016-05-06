import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';
//import Popout from 'react-popout';
import {setSearchResults} from '../actions/search';
import {sortBy} from '../../services/sort';
import VehicleDetail from './vehicle-detail';
class SearchResult extends Component
{ 
    constructor(props, context) {
        super(props, context);
        this.state = {vehicleDetailVisible:false};
        this.sort = this.sort.bind(this);
        this.showVehicleDetail = this.showVehicleDetail.bind(this);
        this.sortFields =null;
    }
    componentDidMount(){
       
    }
    showVehicleDetail(inventory){
        this.setState({vehicleDetailVisible:true,currentInventory:inventory});
    }
    sort(field,p){
        /**
         * this is going to be ackward because if you are using redux and mapping state to props, you cannot put the props back on local state
         * this means that you cannot modify the things on props because its readonly
         * you have to send the sort through the entire redux pipeline just to get the results back
         * if there is a generic sort function for the entire app, how can it handle sorting the specific thing for gm search resuls
         * a quick fix is to sort the results on props which sorts the actual array object itself, but then render isn't called again 
         * because its the same object so you have to call setState with nothing in it
         * this is bad cause its mutating state, o well
         */
        if(this.sortFields == null)
            this.sortFields ={};
        var reverse = this.sortFields[field] !== undefined ? this.sortFields[field] = !this.sortFields[field]  :  this.sortFields[field] = false;
        //var sortedResults = 
        this.props.results.sort(sortBy(field,reverse,p));
        this.setState({});
        //this.props.setSearchResults(sortedResults);
    }
    render(){
        
        var tableStyle = {
            overflow: 'visible',
            borderStyle: 'none',
            width: '100%',
            borderCollapse: 'collapse' 
        };
        var headers = [ 
            {id:0,width:"50px" ,text:"Year",field:'year',primer:parseInt},
            {id:1,width:"50px" ,text:"Model",field:'model'},
            {id:2,width:"75px" ,text:"Model Code",field:'modelCode'},
            {id:3,width:"100px",text:"Trim",field:'trim'},
            {id:4,width:"25px" ,text:"Price",field:'price',primer:parseFloat},
            {id:5,width:"50px" ,text:"VIN",field:'vin'},
            {id:6,width:"20px" ,text:"Dealer",field:'dealer'},
            {id:7,width:"75px" ,text:"City",field:'city'},
            {id:8,width:"75px" ,text:"Phone",field:'phone'},
            {id:9,width:"75px" ,text:"Distance",field:'distance',primer:parseInt}
        ]
        var ths = headers.map((h)=>{
            let thstyle = {width:'auto',minWidth:h.width};
            return <th onClick={this.sort.bind(this,h.field,h.primer)} key={h.id} style={thstyle} className="header">{h.text}</th>;
        });
        var vehicleDetail = '';
        /*
        if(this.state.vehicleDetailVisible){
            vehicleDetail = 
            <Popout url='https://www.eleadcrm.com/evo2/fresh/elead-v45/elead_track/vehicle/vehicledetail.aspx?vehicleid=2509194&companyid=8749' title='Window title' >
            <div></div>
            </Popout>
        }
        */
        vehicleDetail =  <VehicleDetail inventory={this.state.currentInventory} close={()=>{this.setState({vehicleDetailVisible:false})}} show={this.state.vehicleDetailVisible} />
        function getTds(row){
             return headers.map(function(h){
                    return <td key={h.id}>{row[h.field]}</td>
             });
        }    
        var data = this.props.results;
        if(this.sortFields == null && data){
            this.sortFields= {distance:false};
            data.sort(sortBy('distance',false,parseFloat));
        }
        var trs = data ? 
            data.map((inv)=>{
                var tds = getTds(inv);
                return <tr onClick={this.showVehicleDetail.bind(this,inv)} key={inv.vin} className="resultRow" style={{cursor:"pointer"}}>
                    {tds}
                </tr>  
            })
        : [];
        return(
            <div>
                {vehicleDetail}
                <table className="textBlack SortableTable" style={tableStyle}>
                    <thead>
                        <tr style={{height:'30px'}} className="searchResults">
                            {ths}
                        </tr>
                    </thead>
                       <tbody>
                        {trs}
                    </tbody>

                </table>
            </div>

        )
    }
}
function mapStateToProps(state){
    return {
        years:state.vehicleSelectorYears,
        results:state.searchResults
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({setSearchResults},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchResult);


