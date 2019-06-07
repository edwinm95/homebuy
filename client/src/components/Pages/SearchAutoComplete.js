import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import {tomtom} from '../../config/keys'
import {maxDeviceWidth} from '../DeviceLayout'
import './SearchAutoComplete.css'
import { read } from 'fs';
import SearchAutoCompleteSuggestions from './SearchAutoCompleteSuggestions'
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
        this.state = {
            collections: [],
        }
    }
    componentDidMount(){
        this.textInput.value = this.props.value
    }
    getValue = () => {
        return this.textInput.value
    }
    selectValue = (value) => {
        this.textInput.value = value
        this.setState({collections: []})
    }
    handleChange = async (event) => {
        console.log('Activated')
        const {value} = event.currentTarget
        let url;
        const{latitude, longitude} = this.props
        if(latitude && longitude){
            url = `https://api.tomtom.com/search/2/geocode/${value}.json?countrySet=US&lat=${this.props.latitude}&lon=${this.props.longitude}&key=${tomtom.API}`
        }else{
            url = `https://api.tomtom.com/search/2/geocode/${value}.json?countrySet=US&key=${tomtom.API}`
        }
        const response = await fetch(url,{
          method: 'GET',
        })
        var array = []
        if(response.status === 200){
            const reader = await response.json()
            const responseResults = reader.results
            console.log(responseResults)
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
        }
        this.setState({collections: array})
      }
    renderSuggestions(){
        console.log('render Suggestions ()',this.state.collections)
        const options = this.state.collections.map((element) => {
            return(
                <div className="collectionfields" key={element} onClick={() => this.selectValue(element)}>{element}</div>
            )
        })
        console.log(options)
        return options
    }
    render(){
        return(
            <Fragment>
                <SearchTextBox type='text' placeholder='Enter an address, neighborhood, city, or ZIP code' ref={(ref => this.textInput = ref)} onChange={this.handleChange}/>
                <div className ="collectionfieldcomponent">
                    {this.state.collections.length > 0 && <SearchAutoCompleteSuggestions collections={this.state.collections} selectValue={this.selectValue} />}
                </div>
            </Fragment>
        )
    }
}

export default SearchAutoComplete