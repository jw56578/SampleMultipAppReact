import React, {Component,PropTypes} from 'react';

class DropDown extends Component
{
    constructor(props, context) {
        super(props, context);
        this.optionChanged = this.optionChanged.bind(this);
    }
    optionChanged(e){
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
            value.push(options[i].value);
            }
        }
        if(value.length === 1)
            value = value[0];
        this.props.changedHandler(value);
    }
    render(){
        var options = "";
        if(this.props.data){
            options = this.props.data.map(function(d){
                var key = this.props.keyProp ? d[this.props.keyProp] : d;
                var val = this.props.value ? d[this.props.value] : d;
                var text = this.props.text ? d[this.props.text] : d;
                return <option  key={key} value={val}>{text}</option>
            }.bind(this));  
        }
        var prompt = this.props.multiselect || !this.props.promptText ? null: <option value="">{this.props.promptText}</option>;
        return(
            <select multiple={this.props.multiselect} onChange={this.optionChanged} value={this.props.selectedValue} style={this.props.style}>
                {prompt}
                {options}
            </select>
        );
    }
}

export default DropDown;
