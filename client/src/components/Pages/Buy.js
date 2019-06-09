import React, { Component } from 'react'
import Map from '../Map'
import { get } from 'https';
import {tomtom} from '../../config/keys'
class Buy extends Component {
  state = {
    lon: null,
    lat: null,
  }
  componentDidMount = async () =>  {
    const {location} = this.props.match.params
    let lat,lon
    if(location){
      const coordinates = await this.getCoordiantes(location)
      lat = coordinates.lat
      lon = coordinates.lon
    }else{
      const coord = await navigator.geolocation.getCurrentPosition(this.getGeoLocationCoordinates)
      console.log(coord)
    }
    console.log(lat,lon)
    this.setState({lat,lon})
  }
  getGeoLocationCoordinates = (position) => {
    console.log(position)
    return {lat: position.coords.latitude, lon: position.coords.longitude}
  }
  getCoordiantes = async (location) => {
    const url = `https://api.tomtom.com/search/2/geocode/${location}.json?countrySet=US&key=${tomtom.API}`
    const response = await fetch(url,{
      method: 'GET',
    })
    const responseData = await response.json()
    if(responseData.results){
      const {lat, lon} = responseData.results[0].position
      return {lat, lon}
    }
  } 
  render() {
    if(this.state.lat && this.state.lon){
      return (
        <div>
          <Map id="map" lat={this.state.lat} lon={this.state.lon}/>
        </div>
      )
    }else{
      return<div></div>
    }
  }
}
export default Buy
