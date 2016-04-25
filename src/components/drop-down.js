import React, {Component,PropTypes} from 'react';

class DropDown extends Component
{
    constructor(props, context) {
        super(props, context);
        this.optionChanged = this.optionChanged.bind(this);
    }
    optionChanged(event){
        this.props.changedHandler(event.target.value);
    }
    render(){
        var options = "";
        if(this.props.data){
            options = this.props.data.map(function(d){
                var key = this.props.key ? d[this.props.key] : d;
                var val = this.props.key ? d[this.props.value] : d;
                var text = this.props.key ? d[this.props.text] : d;
                return <option key={key} value={val}>{text}</option>
            }.bind(this));  
        }
        return(
            <select onChange={this.optionChanged} value={this.props.selectedValue}>
            {options}
            </select>
        );
    }
}

export default DropDown;
