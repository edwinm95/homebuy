import React, { Component, Fragment } from 'react'
import regex from '../regex'
import './text.css'
import styled from 'styled-components'

const TextInput = styled.input`
border: ${props => props.error ? "1px solid #ff5a50" : "1px solid black"};
background-color: ${props => props.error ? "#ffe3e2" : "#fff"};
`
const ErrorMessages = styled.div`
  width: 100%;
  font-size: 0.8em;
  padding: 0.5em;
  color: red;
`

class Text extends Component {
  constructor(props){
      super(props)
      this.state = {
          value: ''

      }
  }
  getValue = () => {
      return this.state.value
  }
  clearValue = () => {
      this.setState({value: ''})
  }
  componentDidMount(){
      const value = this.props.value === null ? '' : this.props.value
        this.setState({value})
  }
  handleChange = (event) => {
    const value = event.currentTarget.value
    this.setState({value})
  }
  containsError = () => {
      const value = this.state.value
      var error = false
      if(this.props.email){
            if(!regex.email.test(value))
                error = true
      }
      if((value === '' || value === undefined) && this.props.required)
            error = true
      return error
  }
  render() {
      const { value } = this.state
      const containsError = this.containsError()
    return (
        <Fragment>
            {containsError ? <TextInput type = 'text' error className={this.props.className} value={value} onChange={this.handleChange}/> :
            <TextInput type = 'text' className={this.props.className} value={value} onChange={this.handleChange}/> }
            {containsError && (<ErrorMessages>{this.props.errorMessages}</ErrorMessages>) }
        </Fragment>
    )
  }
}

export default Text
