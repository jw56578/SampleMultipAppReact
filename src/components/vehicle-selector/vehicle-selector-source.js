class VehicleSelectorSource{
    constructor() {
        this.yearDropDown=null;
        this.makeDropDown=null;
        this.modelDropDown=null;
        this.trimDropDown=null;
        this.optionsDropDown = null;
        this.initSetTimeout = null;
    }
    fetchMakes(year){
        //i guess there should just be an id for this whole object instance
        this.yearDropDown.props.fetchMakes(0,this,year);
    }
    init(){
        //i don't think any other scenario makes sense
        if(!this.yearDropDown && this.makeDropDown)
           this.fetchMakes();
        else if(!this.makeDropDown)
            this.fetchMakes = function(){};
        else
            this.yearDropDown.props.fetchYears(0, this);
    }
    resetInit(){
        if(this.initSetTimeout)
            clearTimeout(this.initSetTimeout);
        this.initSetTimeout = setTimeout(function() {
            this.init();
        }.bind(this), 1);   
    }
    registerYear(component){
        this.resetInit();
        this.yearDropDown = component;
        
        var id = component.props.id;
        component.yearChangeHandler = function(year){
            component.props.setYear(id,year);
            if(year)
                this.fetchMakes(year);
        }.bind(this);
     
    }
    registerMake(component){
        this.resetInit();
        this.makeDropDown = component;
        var id = component.props.id;
        component.makeChangeHandler = function(make){
            make = this.makeDropDown.props.makes[this.name][this.makeDropDown.props.year.year].find((m)=> m.id === make);
            component.props.setMake(id,make);
            //if the server cannot populate the year back onto the make
            if(make){
                make.year = this.makeDropDown.props.year.year;
                if(this.modelDropDown)
                    component.props.fetchModels(id,this,make);
            }
        }.bind(this); 
    }
    registerModel(component){
        this.resetInit();
        this.modelDropDown = component;
        var id = component.props.id;
        component.modelChangeHandler = function(model){
            //fix later when we accmodate more than one selector per page, similiar to make above
             model = this.modelDropDown.props.models.find((m)=> m.id === model);
             component.props.setModel(id,model);
             if(!model)
                return; 
             model.year = this.makeDropDown.props.year.year;
             model.makeId = this.modelDropDown.props.make.make.id;
             model.sellingSourceId = this.modelDropDown.props.make.make.sellingSourceId;
             component.props.setModel(id,model);
             if(this.trimDropDown){
                component.props.fetchTrims(id,this,model);     
             }
             else if(this.optionsDropDown){
                component.props.fetchOptions(id,this,model); 
             }
             
             
        }.bind(this); 
    }
    registerTrim(component){
        this.resetInit();
        this.trimDropDown = component;
        var id = component.props.id;
        component.trimChangeHandler = function(trim){
             component.props.setModel(id,model);
             if(this.optionsDropDown)
                component.props.fetchOptions(id,this,trim);
        }.bind(this); 
    }
    registerOption(component){
        this.resetInit();
        this.optionsDropDown = component;
        var id = component.props.id;
        component.optionChangedHandler = function(opt){
            component.props.setOption(id,opt);
        
        }.bind(this); 
    }
}
export {VehicleSelectorSource};
