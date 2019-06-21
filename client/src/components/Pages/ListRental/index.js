import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import {Query, Mutation} from 'react-apollo'
import ListRentalComponent from './ListRentalComponent'
import AddressComponent from './AddressComponent'
import gql from 'graphql-tag'
const GETUSER = gql`
    query GetUser{
        getUser{
            firstname
            lastname
            email
        }
    }
`
const GETPROPERTY = gql`
    query GetProperty($propertyID: ID!){
        getProperty(propertyID: $propertyID){
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
        }
    }
`
class ListRental extends Component {
    constructor(props){
        super(props)
        this.state = {
            addressEntered: false,
            streetName: null,
            city: null,
            state: null,
            zipcode: null,
            lat: null,
            lon: null
        }
    }
    handleAddress = (values) => {
        const {streetName, city, state, zipcode, lat, lon} = values
            this.setState(
            {
                streetName,
                city,
                state,
                zipcode,
                lat,
                lon,
                addressEntered: true
            })
    }
    renderNewListing = () => {
        return(
            <Query query={GETUSER}>
             {({data,loading,error}) => {
                 if(loading){
                     return <div></div>
                 }
                 if(error){
                     return <Redirect to="/" />
                 }
                 if(this.state.addressEntered){
                     const value = {
                         contactinfoname: `${data.getUser.firstname} ${data.getUser.lastname}`,
                         email: data.getUser.email
                     }
                     const {streetName, city, zipcode, state, lat, lon} = this.state
                     const address = {
                         streetName,
                         city,
                         zipcode,
                         state,
                         lat,
                         lon
                     }
                     return (
                         <div>
                             <ListRentalComponent values={value} address={address}/>
                         </div>
                     )
                 }
                 return(
                     <div>
                         <AddressComponent sendAddress={this.handleAddress}/>
                     </div>
                 )
 
 
             }}
 
            </Query>
        )
    }
    renderEditListing = (id) => {
        const propertyID = id
        return(
            <Query query={GETPROPERTY} variables={{propertyID}}>

                {({data,loading,error}) => {
                 if(loading){
                     return <div></div>
                 }
                 if(error){
                     return <div>{error}</div>
                 }
                    const {address} = data.getProperty
                    return (
                        <div>
                            <ListRentalComponent edit values={data.getProperty} address={address}/>
                        </div>
                    )
             }}
            </Query>
        )
    }
    render(){
        const {id, type} = this.props.match.params
        if(type === 'new'){
            return(
                <Fragment>
                    {this.renderNewListing()}
                </Fragment>
            )
        }else if(type === 'edit'){
            return(
                <Fragment>
                    {this.renderEditListing(id)}
                </Fragment>
            )
        }
    }
}
export default ListRental