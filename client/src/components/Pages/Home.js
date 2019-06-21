import React, { Component } from 'react'
import styled from 'styled-components'
import MainImage from '../../assets/images/boston.jpg'
import {connect} from 'react-redux'
import { tomtom } from '../../config/keys'
import {maxDeviceWidth} from '../DeviceLayout'
import SearchAutoComplete from './SearchAutoComplete'
import {Redirect} from 'react-router-dom'
const HomeImage = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${MainImage}');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`
const Title = styled.h1`
  width: 50%;
  font-weight: 600;
  position: absolute;
  left: 25%;
  text-align: center;
  font-size: 4em;
  top: 15%;
  font-family: 'Playfair Display', serif;
  color: white;
  @media only screen and ${maxDeviceWidth.tablet} {
    font-size: 30px;
    width: 100%;
    text-align: center;
    left: 0;
  }
`
const SearchComponent = styled.div`
  width: 50%;
  height: 3em;
  top: 45%;
  position: absolute;
  left: 28%;
  border-width: 0px;
  cursor: pointer;
  @media only screen and ${maxDeviceWidth.tablet} {
    width: 90%;
    left:5%;
  }
`
const SearchTextBox = styled.input`
  width: 100%;
  height: 100%;
  float: left;
  font-size: 16px;
  -webkit-box-sizing:border-box;
  -moz-box-sizing:border-box;
  box-sizing:border-box;
  border: 0px;
  cursor: pointer;
  padding: 10px;
  @media only screen and ${maxDeviceWidth.tablet} {
    font-size: 14px;
  }
`
const SearchButton = styled.button`
  height: 90%;
  margin: 2px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 2px;
  font-size: 20px;
  padding: 5px;
  border: 0px;
  color: green;
  background-color: white;
`
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      value: '',
      toBuyPage: false
    }
  }
  componentDidMount(){
     navigator.geolocation.getCurrentPosition(this.getPosition)
  }
  getPosition = (position) => {
    var {latitude, longitude} = position.coords
    latitude = latitude
    longitude = longitude
    this.loadValue(latitude,longitude)
  }
  loadValue = async (latitude, longitude) => {
    const url = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${tomtom.API}`
    const response = await fetch(url,{
      method: 'GET',
    })
    const responseData = await response.json()
    const {addresses} = responseData
    let value
    if(addresses){
      value = addresses[0].address.freeformAddress
    }
    this.setState({latitude, longitude, value})

  } 
  handleSubmit = (event) => {
    event.preventDefault()
    console.log('Clicked')
   this.setState({toBuyPage: true})
  }
  render() {
    if(this.state.toBuyPage){
      var location = this.textInput.getValue()
      return (<Redirect to={`/buy/${location}`} />)
    }
      return (
        <HomeImage>
           <Title>Welcome to Homebuy</Title>
           <form onSubmit={this.handleSubmit}>
           <SearchComponent>
             <SearchAutoComplete latitude={this.state.latitude} longitude={this.state.longitude} value={this.state.value} ref={(ref) => this.textInput = ref } />
             <SearchButton>
               <i className="fal fa-search"></i>
             </SearchButton>
           </SearchComponent>
           </form>
         </HomeImage>
       )
  }
}
export default Home
