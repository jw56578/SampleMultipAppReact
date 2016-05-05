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
    }
    componentDidMount(){
       
    }
    showVehicleDetail(){
        this.setState({vehicleDetailVisible:true});
    }
    sort(sort){
        /**
         * this is going to be ackward because if you are using redux and mapping state to props, you cannot put the props back on local state
         * this means that you cannot modify the things on props because its readonly
         * you have to send the sort through the entire redux pipeline just to get the results back
         * if there is a generic sort function for the entire app, how can it handle sorting the specific thing for gm search resuls
         * a quick fix is to sort the results on props and assign to a new state field , then in render check for that field to exist and use it
         */

        var sortedResults = this.props.results.sort(sort);
        this.setState({sortedResults});
    }
    render(){

        var tableStyle = {
            overflow: 'visible',
            borderStyle: 'none',
            width: '100%',
            borderCollapse: 'collapse' 
        };
        function sortInt(a,b){
            if (parseInt(a[this]) < parseInt(b[this]))
                return -1;
            else if (parseInt(a[this]) > parseInt(b[this]))
                return 1;
            else 
                return 0;
        }
        //move to reusable thing or import existing package
        function sortString(a, b){
            if (a[this] < b[this])
                return -1;
            else if (a[this] > b[this])
                return 1;
            else 
                return 0;
        }
        var headers = [ 
            {width:"50px" ,text:"Year",field:'year',sort:sortInt},
            {width:"50px" ,text:"Model",field:'model',sort:sortString},
            {width:"75px" ,text:"Model Code",field:'modelCode',sort:sortString},
            {width:"100px",text:"Trim",field:'trim',sort:sortString},
            {width:"25px" ,text:"Price",field:'price',sort:sortInt},
            {width:"50px" ,text:"VIN",field:'vin',sort:sortString},
            {width:"20px" ,text:"Dealer",field:'dealer',sort:sortString},
            {width:"75px" ,text:"City",field:'city',sort:sortString},
            {width:"75px" ,text:"Phone",field:'phone',sort:sortString},
            {width:"75px" ,text:"Distance",field:'distance',sort:sortInt}
        ]
        headers = headers.map((h)=>{
            let thstyle = {width:'auto',minWidth:h.width};
            return <th onClick={this.sort.bind(this,h.sort.bind(h.field))} key={h.text} style={thstyle} className="header">{h.text}</th>;
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
                    <td>{row[h.field]}</td>
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
                            {headers}
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


