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
    const coordinates = await this.getCoordiantes(location)
    const {lat, lon} = coordinates
    this.setState({lat,lon})
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
