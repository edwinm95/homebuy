import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import {tomtomAPI} from '../../config/keys'
import {maxDeviceWidth} from '../DeviceLayout'
import './SearchAutoComplete.css'
const SearchTextBox = styled.input`
  width: 100%;
  height: 100%;
  float: left;
  font-size: 16px;
  -webkit-box-sizing:border-box;
  -moz-box-sizing:border-box;
  box-sizing:border-box;
  border: 1px solid black;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  @media only screen and ${maxDeviceWidth.tablet} {
    font-size: 14px;
  }
`
class SearchAutoComplete extends Component {
    constructor(props){
        super(props)
    }
    state = {
        collection: []
    }
    selectValue = (value) => {
        this.textInput.value = value
        this.setState({collection: []})
    }
    handleChange = async (event) => {
        const {value} = event.currentTarget
        const url = `https://api.tomtom.com/search/2/geocode/${value}.json?countrySet=US&lat=${this.props.latitude}&lon=${this.props.longitude}&key=${tomtomAPI}`
        const response = await fetch(url,{
          method: 'GET',
        })
        const reader = await response.json()
        const responseResults = reader.results
        console.log(responseResults)
        var array = []
        if(responseResults){
            console.log(responseResults.length)
            if(responseResults.length > 6){
                for(var i = 0; i < 5; i++){
                    array.push(responseResults[i].address.freeformAddress)
                }
            }else{
                responseResults.forEach((data) => {
                    array.push(data.address.freeformAddress)
                })
            }
        }
        this.setState({collection: array})
      }
      renderFields(){
          let fieldComponent;
          if(this.state.collection === []){
              fieldComponent = (<div></div>)
          }
          fieldComponent  = (
            <div className ="collectionfieldcomponent">
                {this.state.collection.map((element) => {
              return(
                  <div className="collectionfields" key={element} onClick={() => this.selectValue(element)}>{element}</div>
              )
          })}
            </div>
          )
          return fieldComponent
      }
    render(){
        console.log(this.state.collection
            )
        return(
            <Fragment>
                <SearchTextBox type='text' placeholder='Enter an address, neighborhood, city, or ZIP code' ref={(ref => this.textInput = ref)} onChange={this.handleChange}/>
                    {this.renderFields()}
            </Fragment>
        )
    }
}

export default SearchAutoComplete