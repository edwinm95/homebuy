import React, {Component, Fragment} from 'react'
import { Mutation } from 'react-apollo'
import TextInput from '../../Input/Text'
import DropDown from '../../Input/DropDown'
import styled from 'styled-components'
import AdditionalAmenities from './AdditionalAmenities'
import Checkbox from '../../Input/Checkbox'
import ListRentalPhoto from './ListRentalPhoto'
import './listrental.css'
import gql from 'graphql-tag'
import { error } from 'util';
const CREATE_PROPERTY = gql`
    mutation CreateProperty($propertyInput: PropertyInput){
        createProperty(propertyInput: $propertyInput)
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
    address:{
      required: true
    },
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
class ListRentalComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            photos: [],
            additionalAmenities: [],
        }
        this._refs = {}
    }
    renderRequired(){
        return <div className="requiredcomponent">*</div>
    }
    renderOptional(){
        return <div className="optionalcomponent">(Optional)</div>
    }
    renderDetails(){
        return(
        <div className="field">
            <h1 className="fieldtitle">Details</h1>
            <div className="fieldcomponent">
                <div className="labelcomponent">
                    <label htmlFor="address">Address{this.renderRequired()}</label>
                    <TextInput  errorMessages={'Enter address'}   className={'textinput'} required ref={(ref) => this._refs['address'] = ref}/>
                </div>
                <div className="labelcomponent">
                    <label htmlFor="leaseduration">Lease Duration{this.renderRequired()}</label>
                    <DropDown required default={'Lease Duration'}  className={'dropdowninput'} ref={(ref) => this._refs['leaseduration'] = ref} values={leasedurationValues} />
                </div>
            </div>
            <div className="fieldcomponent">
                <div className="labelcomponent">
                    <label htmlFor="rent">Rent{this.renderRequired()}</label>
                    <TextInput  errorMessages={'Enter rent'}   className={'textinput'} required ref={(ref) => this._refs['rent'] = ref}/>
                </div>
                <div className="labelcomponent">
                    <label htmlFor="securitydeposit">Security Deposit{this.renderRequired()}</label>
                    <TextInput  errorMessages={'Enter Security Deposit'}   className={'textinput'} required ref={(ref) => this._refs['securitydeposit'] = ref}/>
                </div>
            </div>
            <div className="fieldcomponent">
                <div className="labelcomponent">
                    <label htmlFor="beds">Beds{this.renderRequired()}</label>
                    <DropDown required default={'Beds'}  className={'dropdowninput'} ref={(ref) => this._refs['beds'] = ref} values={bedsValues} />
                </div>
                <div className="labelcomponent">
                    <label htmlFor="baths">Baths{this.renderRequired()}</label>
                    <DropDown required default={'Baths'}  className={'dropdowninput'} ref={(ref) => this._refs['baths'] = ref} values={bathsValues} />
                </div>
            </div>
            <div className="fieldcomponent">
                <div className="labelcomponent">
                    <label htmlFor="leaseterms">Lease Terms{this.renderRequired()}</label>
                    <TextInput  errorMessages={'Enter lease terms'}   className={'textinput'} required ref={(ref) => this._refs['leaseterms'] = ref}/>
                </div>
                <div className="labelcomponent">
                    <label htmlFor="leaseduration">Square Feet{this.renderRequired()}</label>
                    <TextInput  errorMessages={'Enter Square Feet'}   className={'textinput'} required ref={(ref) => this._refs['squarefeet'] = ref}/>
                </div>
            </div>
            <div className="fieldcomponent">
                <div className="labelcomponent">
                    <label htmlFor="description">Description{this.renderRequired()}</label>
                    <TextInput  errorMessages={'Enter description'}   className={'textinput'} required ref={(ref) => this._refs['description'] = ref}/>
                </div>
            </div>
        </div>
        )
    }
    renderContactInformation(values){
        return(
            <div className="field">
                <h1 className="fieldtitle">Contact Information</h1>
                  <div className="fieldcomponent">
                    <div className="labelcomponent">
                      <label htmlFor="name">Name{this.renderRequired()}</label>
                      <TextInput  errorMessages={'Enter name'} value={`${values.firstname} ${values.lastname}`}   className={'textinput'} required ref={(ref) => this._refs['contactinfoname'] = ref}/>
                    </div>
                    <div className="labelcomponent">
                      <label htmlFor="forrentby">For rent by:{this.renderRequired()}</label>
                      <DropDown required default={'For rent by'}  className={'dropdowninput'} ref={(ref) => this._refs['contactinfoforrentby'] = ref} values={forRentByValues} />
                    </div>
                  </div>
                   <div className="fieldcomponent">
                    <div className="labelcomponent">
                      <label htmlFor="phone">Phone{this.renderRequired()}</label>
                      <TextInput  errorMessages={'Enter phone'}   className={'textinput'} required ref={(ref) => this._refs['contactinfophone'] = ref}/>
                    </div>
                  </div>
  
                    <div className="fieldcomponent">
                      <div className="labelcomponent">
                          <label htmlFor="email">Email{this.renderRequired()}</label>
                          <TextInput  errorMessages={'Enter email'} value={values.email}   className={'textinput'} required ref={(ref) => this._refs['contactinfoemail'] = ref}/>
                      </div>
                    </div>
            </div>
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
        return(
            <div className="field">
                <h1 className="fieldtitle">Amenities</h1>
                  <div className="fieldcomponent">
                    <div className="labelcomponent">
                      <label htmlFor="amenitiesoptional">Amenities{this.renderOptional()}{this.renderOptional}</label>
                      <Checkbox values={optionalAmenitiesValues} ref={(ref) => this._refs['amenitiesoptional'] = ref} />
                    </div>
                    <div className="labelcomponent">
                      <label htmlFor="amenitiespets">Pets{this.renderRequired()}</label>
                      <DropDown default={'Pets'} required className={'dropdowninput'} ref={(ref) => this._refs['amenitiespets'] = ref} values={pets} />
                    </div>
                  </div>
  
                    <div className="fieldcomponent">
                      <div className="labelcomponent">
                          <label htmlFor="laundry">Laundry{this.renderRequired()}</label>
                          <DropDown required default={'Laundry'}  className={'dropdowninput'} ref={(ref) => this._refs['amenitieslaundry'] = ref} values={laundryValues} />
                      </div>
                    </div>
  
                    <div className="fieldcomponent">
                      <div className="labelcomponent">
                          <label htmlFor="additionalamenities">Additional Amenities</label>
                          <TextInput className={'textinput'}  ref={(ref) => this.additionalAmenitiesTextinput = ref}/>
                          <a className="addamenitiesbutton" onClick={this.addAmenties}>Add</a>
                      </div>
                    </div>
                    <div className="additionalamenitiescomponent">
                        {this.renderAdditionalAmenities()}
                    </div>
            </div>
        )
      }
      renderPhotos(){
          return(
              <Fragment>
                  <ListRentalPhoto ref={(ref) => this._refs['photos'] = ref} />
              </Fragment>
          )
      }
      renderSubmitButton(){
        return(
        <div className="submitfield">
          <button type="submit" className="publishbutton">SUBMIT</button>
        </div>
        )
      }
    render(){
        const userValues = this.props.values
        return(
            <Mutation 
            mutation={CREATE_PROPERTY}
            errorPolicy="all"
            onError={(error) => console.log(error)}
            >
            {(createProperty, {data}) => {
                return (
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        this.handleSubmit(createProperty)
                    }
                    }>
                    <div className="maincontainer">
                        {this.renderDetails()}
                        {this.renderContactInformation(userValues)}
                        {this.renderAmenities()}
                        {this.renderPhotos()}
                        {this.renderSubmitButton()}
                    </div>
                </form>
                )
            }}
            </Mutation>
        )
    }
    handleSubmit = (createProperty) => {
        var propertyInput = {}
        for(var key in fields){
            propertyInput[key] = this._refs[key].getValue()
        }
        const {additionalAmenities} = this.state
        if(additionalAmenities.length !== 0){
            propertyInput['additionalamenities'] = additionalAmenities
        } 
        console.log(propertyInput)  
        createProperty({variables: {propertyInput: propertyInput}})
    }
}

export default ListRentalComponent