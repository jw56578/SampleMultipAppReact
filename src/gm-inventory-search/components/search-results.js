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
    }
    componentDidMount(){
          
    }
    showVehicleDetail(){
        this.setState({vehicleDetailVisible:true});
    }
    render(){

        var tableStyle = {
            overflow: 'visible',
            borderStyle: 'none',
            width: '100%',
            borderCollapse: 'collapse' 
        };

        var header = [ 
            {width:"50px" ,text:"Year"},
            {width:"50px" ,text:"Model"},
            {width:"75px" ,text:"Model Code"},
            {width:"100px",text:"Trim"},
            {width:"25px" ,text:"Price"},
            {width:"50px" ,text:"VIN"},
            {width:"20px" ,text:"Dealer"},
            {width:"75px" ,text:"City"},
            {width:"75px" ,text:"Phone"},
            {width:"75px" ,text:"Distance"}
        ]
        header = header.map(function(h){
            let thstyle = {width:'auto',minWidth:h.width};
            return <th key={h.text} style={thstyle} className="header">{h.text}</th>;
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
        var trs = this.props.results ? 
            this.props.results.map(function(inv){
                return <tr key={inv.vin} className="resultRow" style={{cursor:"pointer"}}>
                    <td>{inv.year}</td>
                    <td>{inv.model}</td>
                    <td>{inv.modelCode}</td>
                    <td>{inv.trim}</td>
                    <td>{inv.price}</td>
                    <td>{inv.vin}</td>
                    <td>{inv.dealer}</td>
                    <td>{inv.city}</td>
                    <td>{inv.phone}</td>
                    <td>{inv.distance}</td>
                </tr>  
            })
        : [];
        return(
            <div>
                {vehicleDetail}
                <table className="textBlack SortableTable" style={tableStyle}>
                    <thead>
                        <tr style={{height:'30px'}} className="searchResults">
                            {header}
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


