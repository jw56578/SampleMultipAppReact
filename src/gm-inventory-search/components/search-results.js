import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';
import Popout from 'react-popout';

class SearchResult extends Component
{ 
    constructor(props, context) {
        super(props, context);
        this.state = {vehicleDetailVisible:false};
        this.sort = this.sort.bind(this);
        this.sortFields ={};
    }
    componentDidMount(){
       
    }
    showVehicleDetail(){
        this.setState({vehicleDetailVisible:true});
    }
    sort(field,p){
        /**
         * this is going to be ackward because if you are using redux and mapping state to props, you cannot put the props back on local state
         * this means that you cannot modify the things on props because its readonly
         * you have to send the sort through the entire redux pipeline just to get the results back
         * if there is a generic sort function for the entire app, how can it handle sorting the specific thing for gm search resuls
         * a quick fix is to sort the results on props and assign to a new state field , then in render check for that field to exist and use it
         * but this is going to break when you do another search because it will be ignored since the sortedResults are there
         */
         //move all the sort stuff to reusable thing or import existing package

        var sortBy = function(field, reverse, primer){

            var key = primer ? 
                function(x) {return primer(x[field])} : 
                function(x) {return x[field]};

            reverse = !reverse ? 1 : -1;

            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                } 
        }
        var reverse = this.sortFields[field] !== undefined ? this.sortFields[field] = !this.sortFields[field]  :  this.sortFields[field] = false;
        var sortedResults = this.props.results.sort(sortBy(field,reverse,p));
        this.setState({sortedResults});
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
        if(this.state.vehicleDetailVisible){
            vehicleDetail = 
            <Popout url='https://www.eleadcrm.com/evo2/fresh/elead-v45/elead_track/vehicle/vehicledetail.aspx?vehicleid=2509194&companyid=8749' title='Window title' >
            <div></div>
            </Popout>
        }
        var chooseTrim =    <Modal
                    isOpen={false}
                    >
                    put a drop down here to choose the trim 
                </Modal> 
        function getTds(row){
             return headers.map(function(h){
                    return <td key={h.id}>{row[h.field]}</td>
             });
        }    
        var data = this.state.sortedResults ||  this.props.results;
        var trs = data ? 
            data.map(function(inv){
                var tds = getTds(inv);
                return <tr key={inv.vin} className="resultRow" style={{cursor:"pointer"}}>
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
    return bindActionCreators({},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchResult);


