import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
const Select = styled.select`
  border: ${props => props.error ? "1px solid #ff5a50" : "1px solid black"};
  background-color: ${props => props.error ? "#ffe3e2" : "#fff"};
`
class DropDown extends Component {
  constructor(props){
      super(props)
      this.state = {
          selectedValue: null,
      }
  }
  componentDidMount(){
    this.setState({selectedValue: this.props.queryValue})
  }
  getValue = () => {
      const value = this.state.selectedValue
      return value;
  }
  handleChange = (event) => {
    const value = event.currentTarget.value
    this.setState({selectedValue: value})
  }
  containsError = () => {
    const value = this.state.selectedValue
    var error = false
    if((value === null || value === undefined) && this.props.required){
        error = true
    }
    return error
}

  render() {
    const error = this.containsError()
    return (
      <Fragment>
        {error ? 
        (<Select className={this.props.className} error onChange={this.handleChange}>
          {this.renderOptionValues()}
        </Select>) : 
        (<Select className={this.props.className} onChange={this.handleChange}>
        {this.renderOptionValues()}
        </Select>)}
      </Fragment>
    )
  }
  renderOptionValues(){
    var array = []
    var {values} = this.props
    var {queryValue} = this.props
    if(Array.isArray(values)){
      array = values.map((value) =>  {
          if(queryValue !== null || queryValue !== undefined){
            if(value === queryValue){
              return <option selected value={value}>{value}</option>
            }
          }
            return <option value={value}>{value}</option>
      })
    }else{
        for(var key in values){
          if(key === queryValue){
            array.push(<option selected value={key}>{values[key]}</option>)
          }else{
            array.push(<option value={key}>{values[key]}</option>)
          }
        }
    }
    if(queryValue === null || queryValue === undefined){
      array.push(<option value={null} selected disabled>{this.props.default}</option>)
    }
    return array
  }
}

export default DropDown
