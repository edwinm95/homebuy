import React, {Component, Fragment} from 'react'
import { Mutation } from 'react-apollo'
import {Redirect} from 'react-router-dom'
import AddressComponent from './AddressComponent'
import TextInput from '../../Input/Text'
import DropDown from '../../Input/DropDown'
import styled from 'styled-components'
import {maxDeviceWidth} from '../../DeviceLayout'
import axios from 'axios'
import AdditionalAmenities from './AdditionalAmenities'
import Checkbox from '../../Input/Checkbox'
import ListRentalPhoto from './ListRentalPhoto'
import './listrental.css'
import gql from 'graphql-tag'
import { error } from 'util';
import { stat } from 'fs';
import { resolve } from 'dns';
import { rejects } from 'assert';
const CREATE_PROPERTY = gql`
    mutation CreateProperty($propertyInput: PropertyInput){
        createProperty(propertyInput: $propertyInput){
            _id
        }
    }
`
const EDIT_PROPERTY = gql`
    mutation EditProperty($propertyInput: PropertyInput){
        editProperty(propertyInput: $propertyInput){
            _id
        }
    }
`
const leasedurationValues = ['Please Select', '1 month', '6 months', '1 year', 'Rent to own', 'Sublet/temporary']
const bedsValues = ['Studio','1','2','3','4','5','6','7','8']
const bathsValues = ['1','1.5','2','2.5','3','3.5','4','4.5','5+']
const laundryValues = ['None','In unit','Shared/In-building']
const optionalAmenitiesValues = ['A/C','Balcony/Deck','Furnished','Hardwood Floor', 'Wheelchair Access', 'Garage Parking', 'Off-street Parking']
const forRentByValues = ['Property Owner', 'Management Company/ Broker', 'Tenant']
const pets = ['Allowed', 'Not allowed']
const fields = {
    rent:{
      required: true
    },
    leaseduration:{
      required: true
    },
    leaseterms:{
      required: true
    },
    description:{
      required: true
    },
    securitydeposit:{
      required: true
    },
    beds:{
      required: true
    },
    baths:{
      required: false
    },
    squarefeet:{
      required: true
    } ,
    contactinfoname:{
      required: true
    },
    contactinfoemail:{
      required: true
    },
    contactinfophone:{
      required: true
    },
    contactinfoforrentby:{
      required: true
    },
    amenitiesoptional:{
      required: false
    },
    amenitieslaundry:{
      required: true
    },
    amenitiespets:{
      required: true
    },
    photos:{
      required: true
    }
  }
const MainContainer = styled.div`
    position: absolute;
    width: 80%;
    left: 10%;
    top: 10%;
    background-color: #FFFFFF;
    border: 1px solid #ccc;
    margin: 10px;
    @media only screen and ${maxDeviceWidth.tablet} {
        width: 100%;
        margin: 0;
        left: 0;
    }
`
const Field = styled.div`
    position: relative;
    width: 90%;
    left: 5%;
    border-bottom: 1px solid #ccc;
    margin: 20px 0;
    padding: 10px 0;
    @media only screen and ${maxDeviceWidth.tablet} {
        width: 100%;
        margin: 0;
        left: 0;
    }
`
const FieldComponent = styled.div`
    display: flex;
    width: 100%;
    @media only screen and ${maxDeviceWidth.tablet} {
        display: block;
    }
`
const LabelComponent = styled.div`
    position: relative;
    width: 40%;
    left: 10%;
    margin-right: 20px;
    padding: 10px 0;
    font-size: 1.2em;
    @media only screen and ${maxDeviceWidth.tablet} {
        width: 90%;
        left: 5%;
        margin-right: 20px;
        padding: 10px 0;
        font-size: 1.2em;
    }
`
class ListRentalComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            photos: [],
            additionalAmenities: [],
            editAddress: false,
            streetName: null,
            city: null,
            state: null,
            zipcode: null,
            lat: null,
            lon: null,
            redirect: false,
            _id: null
        }
        this._refs = {}
    }
    componentDidMount = async () => {
        var additionalAmenities = []
        const {streetName, city, state, zipcode, lat, lon} = this.props.address
        if(this.props.values.additionalamenities !== null && this.props.values.additionalamenities !== undefined){
            additionalAmenities = this.props.values.additionalamenities
        }
            this.setState({streetName, additionalAmenities, city, state, zipcode, lat, lon})
    }
    handleEditAddress = () => {
        this.setState({editAddress: true})
    }
    renderRequired(){
        return <div className="requiredcomponent">*</div>
    }
    renderOptional(){
        return <div className="optionalcomponent">(Optional)</div>
    }
    renderDetails(){
        const {streetName, city, state, zipcode} = this.state
        const {values} = this.props
        const squarefeet = `${values.squarefeet}`

        return(
        <Field>
            <div className="fieldtitlecomponent">
                <h1 className="fieldtitle">Details {`(${streetName}, ${city}, ${state} ${zipcode})`}</h1>
                <div className="editaddress"onClick={this.handleEditAddress}><i class="fal fa-pencil"></i></div>
            </div>
            <FieldComponent>
                <LabelComponent>
                    <label htmlFor="leaseduration">Lease Duration{this.renderRequired()}</label>
                    <DropDown queryValue={values.leaseduration} required default={'Lease Duration'}  className={'dropdowninput'} ref={(ref) => this._refs['leaseduration'] = ref} values={leasedurationValues} />
                </LabelComponent>
                <LabelComponent>
                    <label htmlFor="rent">Rent{this.renderRequired()}</label>
                    <TextInput  value={values.rent} errorMessages={'Enter rent'}   className={'textinput'} required ref={(ref) => this._refs['rent'] = ref}/>
                </LabelComponent>
            </FieldComponent>
            <FieldComponent>
                <LabelComponent>
                    <label htmlFor="securitydeposit">Security Deposit{this.renderRequired()}</label>
                    <TextInput  value={values.securitydeposit} errorMessages={'Enter Security Deposit'}   className={'textinput'} required ref={(ref) => this._refs['securitydeposit'] = ref}/>
                </LabelComponent>
                <LabelComponent>
                    <label htmlFor="beds">Beds{this.renderRequired()}</label>
                    <DropDown queryValue={values.beds} required default={'Beds'}  className={'dropdowninput'} ref={(ref) => this._refs['beds'] = ref} values={bedsValues} />
                </LabelComponent>
            </FieldComponent>
            <FieldComponent>
                <LabelComponent>
                    <label htmlFor="baths">Baths{this.renderRequired()}</label>
                    <DropDown queryValue={values.baths} required default={'Baths'}  className={'dropdowninput'} ref={(ref) => this._refs['baths'] = ref} values={bathsValues} />
                </LabelComponent>
                <LabelComponent>
                    <label htmlFor="leaseterms">Lease Terms{this.renderRequired()}</label>
                    <TextInput  value={values.leaseterms} errorMessages={'Enter lease terms'}   className={'textinput'} required ref={(ref) => this._refs['leaseterms'] = ref}/>
                </LabelComponent>
            </FieldComponent>
            <FieldComponent>
                <LabelComponent>
                    <label htmlFor="leaseduration">Square Feet{this.renderRequired()}</label>
                    <TextInput  value={squarefeet} errorMessages={'Enter Square Feet'}   className={'textinput'} required ref={(ref) => this._refs['squarefeet'] = ref}/>
                </LabelComponent>
                <LabelComponent>
                    <label htmlFor="description">Description{this.renderRequired()}</label>
                    <TextInput  value={values.description} errorMessages={'Enter description'}   className={'textinput'} required ref={(ref) => this._refs['description'] = ref}/>
                </LabelComponent>
            </FieldComponent>
        </Field>
        )
    }
    renderContactInformation(){
        const {values} = this.props
        return(
            <Field>
                <h1 className="fieldtitle">Contact Information</h1>
                  <FieldComponent>
                    <LabelComponent>
                      <label htmlFor="name">Name{this.renderRequired()}</label>
                      <TextInput  errorMessages={'Enter name'} value={values.contactinfoname}   className={'textinput'} required ref={(ref) => this._refs['contactinfoname'] = ref}/>
                    </LabelComponent>
                    <LabelComponent>
                      <label htmlFor="forrentby">For rent by:{this.renderRequired()}</label>
                      <DropDown queryValue={values.contactinfoforrentby} required default={'For rent by'}  className={'dropdowninput'} ref={(ref) => this._refs['contactinfoforrentby'] = ref} values={forRentByValues} />
                    </LabelComponent>
                  </FieldComponent>
                   <FieldComponent>
                        <LabelComponent>
                            <label htmlFor="phone">Phone{this.renderRequired()}</label>
                            <TextInput  value={values.contactinfophone}errorMessages={'Enter phone'}   className={'textinput'} required ref={(ref) => this._refs['contactinfophone'] = ref}/>
                        </LabelComponent>
                  </FieldComponent>
  
                    <FieldComponent>
                      <LabelComponent>
                          <label htmlFor="email">Email{this.renderRequired()}</label>
                          <TextInput  value={values.contactinfoemail} errorMessages={'Enter email'}  className={'textinput'} required ref={(ref) => this._refs['contactinfoemail'] = ref}/>
                      </LabelComponent>
                    </FieldComponent>
            </Field>
        )
      }
      addAmenties = () => {
        var value = this.additionalAmenitiesTextinput.getValue()
        this.additionalAmenitiesTextinput.clearValue()
        this.setState({additionalAmenities: [...this.state.additionalAmenities,value]})
      }
      removeAmenities = (value) => {
        var array = this.state.additionalAmenities
        for(var i in array){
            if(array[i] === value){
                array.splice(i,1)
                break;
            }
        }
        this.setState({additionalAmenities: array})
      }
      renderAdditionalAmenities = () => {
        const values = this.state.additionalAmenities
        if(values.length === 0){
            return<div></div>
        }
        const array = values.map((value) => {
            return(
                <div className="additionalamenities">
                    {value}
                    <div className="removeamenities" onClick={() => this.removeAmenities(value)}>
                        <i class="fal fa-times"></i>
                    </div>
                </div>
            )
        })
        return array
    }
      renderAmenities(){
        const {values} = this.props
        return(
            <Field>
                <h1 className="fieldtitle">Amenities</h1>
                  <FieldComponent>
                    <LabelComponent>
                      <label htmlFor="amenitiesoptional">Amenities{this.renderOptional()}{this.renderOptional}</label>
                      <Checkbox  queryValue={values.amenitiesoptional} values={optionalAmenitiesValues} ref={(ref) => this._refs['amenitiesoptional'] = ref} />
                    </LabelComponent>
                    <LabelComponent>
                      <label htmlFor="amenitiespets">Pets{this.renderRequired()}</label>
                      <DropDown queryValue={values.amenitiespets} default={'Pets'} required className={'dropdowninput'} ref={(ref) => this._refs['amenitiespets'] = ref} values={pets} />
                    </LabelComponent>
                  </FieldComponent>
  
                    <FieldComponent>
                      <LabelComponent>
                          <label htmlFor="laundry">Laundry{this.renderRequired()}</label>
                          <DropDown queryValue={values.amenitiespets} required default={'Laundry'}  className={'dropdowninput'} ref={(ref) => this._refs['amenitieslaundry'] = ref} values={laundryValues} />
                      </LabelComponent>
                    </FieldComponent>
  
                    <FieldComponent>
                      <LabelComponent>
                          <label htmlFor="additionalamenities">Additional Amenities</label>
                          <TextInput className={'textinput'}  ref={(ref) => this.additionalAmenitiesTextinput = ref}/>
                          <a className="addamenitiesbutton" onClick={this.addAmenties}>Add</a>
                      </LabelComponent>
                    </FieldComponent>
                    <div className="additionalamenitiescomponent">
                        {this.renderAdditionalAmenities()}
                    </div>
            </Field>
        )
      }
      renderPhotos = () => {
                if(this.props.values.photos){
                    const {photos, _id} = this.props.values
                    return(
                        <Fragment>
                            <ListRentalPhoto photos={photos} id={_id}  ref={(ref) => this._refs['photos'] = ref} />
                        </Fragment>
                    ) 
                }
                return(
                    <Fragment>
                        <ListRentalPhoto ref={(ref) => this._refs['photos'] = ref} />
                    </Fragment>
                )
      }
      renderSubmitButton(){
        return(
        <div className="submitfield">
        {this.props.edit ? (<button type="submit" className="publishbutton">EDIT</button>) 
        : (<button type="submit" className="publishbutton">SUBMIT</button>)}
        </div>
        )
      }
      closeAddressComponent = (values) => {
          const {streetName, city, state, zipcode, lat, lon} = values
            this.setState(
            {
                streetName,
                city,
                state,
                zipcode,
                lat,
                lon,
                editAddress: false
            }
        )
      }
    render(){
        if(this.state.redirect){
            const {_id} = this.state
            return(
                <Fragment>
                    <Redirect to={`/listing/${_id}`} />
                </Fragment>
            )
        }
        if(this.state.editAddress){
            const {streetName, city, state, zipcode} = this.state
            return(
                <Fragment>
                    <AddressComponent edit streetName={streetName} city={city} state={state} zipcode={zipcode} sendAddress={this.closeAddressComponent} />
                </Fragment>
            )
        }
        if(this.props.edit){
            return(
                <Mutation 
                mutation={EDIT_PROPERTY}
                errorPolicy="all"
                onCompleted={(data) => {
                    const {_id} = data.editProperty
                    this.setState({redirect: true, _id})
                }}
                onError={(error) => console.log(error)}
                >
                {(editProperty, {data}) => {
                    return (
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            this.handleEditProperty(editProperty)
                        }
                        }>
                        <MainContainer>
                            {this.renderDetails()}
                            {this.renderContactInformation()}
                            {this.renderAmenities()}
                            {this.renderPhotos()}
                            {this.renderSubmitButton()}
                        </MainContainer>
                    </form>
                    )
                }}
                </Mutation>
            )
        }else{
            return(
                <Mutation 
                mutation={CREATE_PROPERTY}
                errorPolicy="all"
                onError={(error) => console.log(error)}
                >
                {(createProperty, {data}) => {
                    return(
                        <div>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                this.handleCreateProperty(createProperty)
                            }}>
                                <MainContainer>
                                    {this.renderDetails()}
                                    {this.renderContactInformation()}
                                    {this.renderAmenities()}
                                    {this.renderPhotos()}
                                    {this.renderSubmitButton()}
                                </MainContainer> 
                            </form>
                        </div>
                    )
                }}
                </Mutation>
            )
        }
    }
    handleCreateProperty = (createProperty) => {
        var propertyInput = {}
        for(var key in fields){
            propertyInput[key] = this._refs[key].getValue()
        }
        const {additionalAmenities} = this.state
        if(additionalAmenities.length !== 0){
            propertyInput['additionalamenities'] = additionalAmenities
        }
        const {address, city, state, zipcode, lat, lon} = this.props.address
        propertyInput['address'] = {
            streetName: address,
            city,
            state,
            zipcode,
            lat,
            lon
        }
        console.log(propertyInput)  
        createProperty({variables: {propertyInput: propertyInput}})
    }
    handleEditProperty = (editProperty) => {
        var propertyInput = {}
        for(var key in fields){
            propertyInput[key] = this._refs[key].getValue()
        }
        const {additionalAmenities} = this.state
        if(additionalAmenities.length !== 0){
            propertyInput['additionalamenities'] = additionalAmenities
        }
        const {streetName, city, state, zipcode, lat, lon} = this.state
        propertyInput['address'] = {
            streetName,
            city,
            state,
            zipcode,
            lat,
            lon
        }
        propertyInput['_id'] = this.props.values._id
        console.log(propertyInput)
        editProperty({variables: {propertyInput}})  
    }
}

export default ListRentalComponent