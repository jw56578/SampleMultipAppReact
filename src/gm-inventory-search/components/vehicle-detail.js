import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';
import {sortBy} from '../../services/sort';

class VehicleDetail extends Component
{ 
    constructor(props, context) {
        super(props, context);
        this.state = {vehicleDetailVisible:this.props.show};
    }
    componentDidMount(){
       
    }
    render(){
        var inv = this.props.inventory;
        if(!inv)
            return <div></div>
        //move this to reusable modal that we want centered in page the only variable would be width,height
        const customStyles = {
             overlay : {
                position          : 'fixed',
                top               : 0,
                left              : 0,
                right             : 0,
                bottom            : 0,
                backgroundColor   : 'rgba(136, 136, 136, 0.75)'
            },
            content : {
                width : '50em',
                height : '30em',
                top : '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        var prices = inv.vehicle.prices.sort(sortBy('chargeAmount',false)).map((i,index)=>{
            return (
                <div style={{padding:"10px"}} key={index}>
                    <div style={{display:'inline-block',float:"left"}}> {i.description}</div>
                    <div style={{display:'inline-block',float:"right"}}>${i.chargeAmount.toFixed(2).toLocaleString()}</div>
                </div>
            )
        });
        var options = inv.vehicle.options.sort(sortBy('description',false)).map((i,index)=>{
            return (
                <div style={{padding:"10px"}} key={index}>
                    <div style={{display:'inline-block',float:"left"}}> {i.description}</div>
                    <div style={{display:'inline-block',float:"right"}}></div>
                </div>
            )
        });
        return(
             <Modal
                isOpen={this.props.show}
                style = {customStyles}
                >
                    <div style={{display:'inline-block',float:"right"}}><button onClick={()=>{this.props.close()}}>close</button></div>
                
                <br/>
                <div>{inv.year} {inv.make} {inv.model} {inv.trim}</div>
                <div>{inv.vin}</div>
                <div>
                    <div style={{width:'20em',padding:"10px"}}>
                        <div>Prices</div>
                        {prices}
                    </div>
                    
                    <div style={{padding:"10px"}}>
                        <div>Options</div>
                        {options}
                    </div>
                    
                </div>
            </Modal> 
        )
    }
}
function mapStateToProps(state){
    return {
   
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(VehicleDetail);


