import React,{Component, Fragment} from 'react'
import {tomtom} from '../../../config/keys'
import './AddressComponent.css'
import AddressSuggestions from './AddressSuggestions'
class AddressComponent extends Component {
    state = {
        adresses: []
    }
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {streetName, city, state, zipcode} = this.props
        if(streetName){
            this.streetName.value = streetName
        }
        if(city){
            this.city.value = city
        }
        if(state){
            this.state.value = state
        }
        if(zipcode){
            this.zipcode.value = zipcode
        }
    }
    handleAddressChange = async (event) => {
        const {value} = event.currentTarget
        let url;
        url = `https://api.tomtom.com/search/2/geocode/${value}.json?countrySet=US&key=${tomtom.API}`
        const response = await fetch(url,{
          method: 'GET',
        })
        var array = []
        if(response.status === 200){
            const reader = await response.json()
            const responseResults = reader.results
            if(responseResults){
                if(responseResults.length > 6){
                    for(var i = 0; i < 5; i++){
                        const value = {
                            address: responseResults[i].address,
                            position: responseResults[i].position
                        }
                        array.push(value)
                    }
                }else{
                    responseResults.forEach((data) => {
                        const value = {
                            address: data.address,
                            position: data.position
                        }
                        array.push(value)
                    })
                }
            }
        }
        this.setState({adresses: array})
    }
    handleClick = (element) => {
        const {streetNumber, streetName, municipality, postalCode, countrySubdivision} = element.address
        if(streetNumber === undefined){
            this.streetName.value = `${streetName}`
        }else{
            this.streetName.value = `${streetNumber} ${streetName}`
        }
        this.city.value = municipality
        this.zipcode.value = postalCode
        this.state.value = countrySubdivision
        this.setState({adresses: []})
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
    createListing = async () => {
        const streetName = this.streetName.value
        const city = this.city.value
        const state = this.state.value
        const zipcode = this.zipcode.value
        const location = `${streetName} , ${city} , ${state} ${zipcode}`
        const positionCoords = await this.getCoordiantes(location)
        const value = {
            streetName,
            city,
            state,
            zipcode,
            location,
            lat: positionCoords.lat,
            lon: positionCoords.lon
        }
        this.props.sendAddress(value)
    }
    render(){
        return(
            <div className="addressmaincontainer">
                <div className="titlecontainer">
                    List Rental
                </div>
                <div className="addresscontainer">
                    <div className="desccontainer">
                        Address
                    </div>
                    <input type ="text" className="address" onChange={this.handleAddressChange} ref={(ref) => this.streetName = ref}></input>
                    <AddressSuggestions address={this.state.adresses} clicked={this.handleClick}/>
                </div>
                <div className="citycontainer">
                    <div className="desccontainer">
                            City
                        </div>
                    <input type ="text" className="city" ref={(ref) => this.city = ref}></input>
                </div>
                <div className="statecontainer">
                    <div className="desccontainer">
                            State
                        </div>
                    <input type ="text" className="state" ref={(ref) => this.state = ref}></input>

                </div>
                <div className="zipcodecontainer">
                    <div className="desccontainer">
                                Zipcode
                            </div>
                        <input type ="text" className="zipcode" ref={(ref) => this.zipcode = ref}></input>

                </div>
                <div className="createbuttoncontainer">
                    <div className="createbutton" onClick={this.createListing}>
                        {this.props.edit ? 'Edit Listing': 'Create Listing'}
                    </div>
                </div>
            </div>
        )
    }
}

export default AddressComponent