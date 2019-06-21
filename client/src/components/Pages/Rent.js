import React, { Component } from 'react'
import Map from '../Map'
import MediaQuery from 'react-responsive'
import {size} from '../DeviceLayout'
import { get } from 'https';
import {tomtom} from '../../config/keys'
import './Buy.css'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Listing from '../Modal/Listing'
const GET_PROPERTY = gql`
  query GetProperties {
    getProperties{
      _id
      description
      date
      address
      rent
      securitydeposit
      beds
      baths
      squarefeet
      leaseduration
      leaseterms
      contactinfoname
      contactinfophone
      contactinfoemail
      contactinfoforrentby
      amenitiesoptional
      amenitieslaundry
      amenitiespets
      photos
      additionalamenities
      createdBy
    }
  }
`
class Rent extends Component {
  state = {
    lon: null,
    lat: null,
  }
  componentDidMount = async () =>  {
    const {location} = this.props.match.params
    let lat,lon
    try{
      if(location){
        const coordinates = await this.getCoordiantes(location)
        lat = coordinates.lat
        lon = coordinates.lon
      }else{
        const {coords} = await this.getGeoLocationCoordinates()
        lat = coords.latitude
        lon = coords.longitude
      }
    }catch(error){
      console.log(error)
    }
    this.setState({lat,lon})
  }
  getGeoLocationCoordinates = (options) => {
    return new Promise(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(resolve,reject,options)
    })
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
  selectListing = (listing) => {
    this.setState({listingClicked: true, listing})
  }
  handleCloseModal = () => {
    this.setState({
      listing: null
    })
  }
  renderProperties = (getProperties) => {
    const properties = getProperties.map((property) => {
      const photoURL = `http://localhost:5000/images/listing/${property._id}/${property.photos[0]}`
      const style = {
        background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${photoURL})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }
      const {streetName, city, state} = property.address
      return(
        <div className="property" style={style} onClick={() => this.selectListing(property)}>
          <div className="infoproperty">
                <div className="priceinfo">${property.rent}</div>
                <div className="addressinfo">{`${streetName}, ${city}, ${state}`}</div>
          </div>
        </div>
      )
    })
    return (
      <div className="buymaincontainer">
        <div className="propertycontainer">
          {properties}
        </div>
        {this.state.listing && <Listing listing={this.state.listing} closeModal={this.handleCloseModal} />}
      </div>
    )
  }
  render() {
    return(
      <Query query={GET_PROPERTY}>
        {({data,loading,error}) => {
          if(loading){
            return(<div></div>)
          }
          if(error){
            return(<div></div>)
          }
          const {getProperties} = data
              return (
                <div>
                  {this.renderProperties(getProperties)}
                  <MediaQuery minDeviceWidth={size.laptop}>
                    {this.state.lat && this.state.lon && <Map id="map" lat={this.state.lat} lon={this.state.lon} properties={getProperties}/>}
                  </MediaQuery>
                </div>
              )                
        }}
      </Query>
    )
  }
}
export default Rent
