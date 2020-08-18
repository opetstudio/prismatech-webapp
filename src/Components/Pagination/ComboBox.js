import React, { Component } from 'react'

const fontStyle = {
    fontSize : 12,
}

export default class ComboBox extends Component{
    constructor(props){
        super(props)
        this.state = { v: this.props.defaultValue }
    }

    componentDidMount () {
        const { defaultValue, value, constantValue, handleOnChange, table, name } = this.props
        handleOnChange({ table, field: name, value: constantValue || value || defaultValue })
      }

      handleChange = (event) =>
      {
          let selectedValue = event.target.value;
          this.props.onSelectChange(selectedValue);
      }

    render () {
        const { name, id, label, type, placeholder, value, handleOnChange, table, hidden, constantValue, arrayOfData  } = this.props
        
        // let arrayOfData = this.props.arrayOfData;
        let options = arrayOfData && arrayOfData.map((data) =>
                <option 
                    key={data.id}
                    value={data.id}
                >
                    {data.name}
                </option>
            );
        return(
            <div className="form-group row">
            <label className="col-sm-3 col-form-label" style={fontStyle}>{label}</label>
            <select type="text" className="form-control col-sm-7" multiple="multiple" style={fontStyle}>
                {options}
            </select>
            </div>
        )
    }
}