import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
const LisitingComponent = styled.div`
  position: absolute;
  width: 80%;
  left: 10%;
  background-color: #FFFFFF;
  border: 1px solid #ccc;
  margin: 10px;
`
const Title = styled.h1`
  margin: 20px;
`
const ImageFileComponent = styled.div`
  position: relative;
  width: 83%;
  left: 10%;
  margin: 10px 0;
`
const Field = styled.div`
  position: relative;
  width: 90%;
  left: 5%;
  border-bottom: 1px solid #ccc;
  margin: 20px 0;
  padding: 10px 0;
`
const FieldTitle = styled.h1`
  display: inline-block;
  position: relative;
  font-weight: bold;
  left: 10%;
`
const FileInput = styled.input`
  display: none;
`
const FieldComponent = styled.div`
  display: flex;
  width: 100%;
`
const PhotoFieldComponent = styled.div`
  width: 100%;
`
const ImageContainer = styled.div`
  display: inline-block
  width: 200px;
  cursor: pointer;
  height: 200px;
  margin: 20px;
`
const ImageTag = styled.div`
  position: absolute;
  width: 100%;
  background-color: rgba(0,0,0,0.7);
  color: white;
  height: 30px;
  bottom: 0;
  z-index: 1;
`
const LabelComponent = styled.div`
  position: relative;
  width: 40%;
  left: 10%;
  margin-right: 20px;
  padding: 10px 0;
  font-size: 1.2em;
`
const PhotoComponent = styled.div`
  position: relative
  width: 83%;
  height: 10em;
  border: 2px dashed #7A7A7A;
  left: 10%;
  margin: 10px 0;
  background-color: white;
  cursor: pointer;
  :hover{
    border: 2px dashed green;
  }
`
const TextInput = styled.input`
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1em;
`
const TextArea = styled.textarea`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  font-size: 1em;
`
const DropDownInput = styled.select`
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1em;
`
const leasedurationValues = ['Please Select', '1 month', '6 months', '1 year', 'Rent to own', 'Sublet/temporary']
const bedsValues = ['Studio','1','2','3','4','5','6','7','8']
const bathsValues = ['1','1.5','2','2.5','3','3.5','4','4.5','5+']
const laundryValues = ['None','In unit','Shared/In-building']
const optionalAmenitiesValues = ['A/C','Balcony/Deck','Furnished','Hardwood Floor', 'Wheelchair Access', 'Garage Parking', 'Off-street Parking']
const forRentByValues = ['Property Owner', 'Management Company/ Broker', 'Tenant']
  const fields = {
    adresss:{
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
    contactinforentby:{
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
    },
    showingavaliability:{
      required: false
    }
  }


  class ListRental extends Component {
    state = {
      adresss:{
        value: null,
        errors: true
      },
      leaseduration:{
        value: null,
        errors: true
      },
      leaseterms:{
        value: null,
        errors: true
      },
      securitydeposit:{
        value: null,
        errors: true
      },
      description:{
        value: null,
        errors: true
      },
      beds:{
        value: null,
        errors: true
      },
      baths:{
        value: null,
        errors: true,
      },
      squarefeet: {
        value: null,
        errors: true,
      },
      contactinfoname:{
        value: null,
        errors: true
      },
      contactinfoemail:{
        value: null,
        errors: true
      },
      contactinfophone:{
        value: null,
        errors: true
      },
      contactinforentby:{
        value: null,
        errors: true
      },
      amenitiesoptional:{
        value: null,
        errors: true
      },
      amenitieslaundry:{
        value: null,
        errors: true
      },
      amenitiespets:{
        value: null,
        errors: true,
      },
      photos:{
        value: [],
        errors: true
      },
      showingavaliability:{
        value: null,
        errors: false
      },
      forrentby:{
        value: null,
        errors: false
      }
    }
    constructor(props){
      super(props)
      this.fileInput = React.createRef()
    }
    renderRequired(){
      const RequiredComponent = styled.div`
        color: red;
        font-size: 0.7em;
        display: inline-block;
        padding: 0.5em;
      `
      return<RequiredComponent>*</RequiredComponent>
    }
    renderOptional(){
      const OptionalComponent = styled.div`
        display: inline-block;
        color: #ccc;
        font-size: 0.7em;
        padding: 0.5em;
      `
      return<OptionalComponent>(Optional)</OptionalComponent>
    }
    renderCheckboxes(arrayValues){
      var count = 0;
      const optionArray = arrayValues.map((value) => {
        count++;
      return (
        <div>
          <input type="checkbox" name={`amenities${count}`} value={value}/>{value}
        </div>
      )
      })
      return optionArray
    }
    renderDropdownValues(arrayValues){
      const optionArray = arrayValues.map((value) => <option value={value}>{value}</option> )
      return optionArray
    }
    handleChange = (key) => (e) => {
      var value = e.currentTarget.value
      this.setState({[key]: {value}})
    }
    renderDetails(){
      return(
        <Field>
        <FieldTitle>Details</FieldTitle>
        <FieldComponent>
          <LabelComponent>
            <label htmlFor="address">Address{this.renderRequired()}</label>
            <TextInput name="address" placeholder="Enter address" value={this.state.adresss.value} onChange={this.handleChange('adresss')}/>
          </LabelComponent>
          <LabelComponent>
              <label htmlFor="leaseduration">Lease Duration{this.renderRequired()}</label>
              <DropDownInput value={this.state.leaseduration.value} onChange={this.handleChange('leaseduration')}>
                {this.renderDropdownValues(leasedurationValues)}
              </DropDownInput>
            </LabelComponent>
        </FieldComponent>

         <FieldComponent>
          <LabelComponent>
            <label htmlFor="securitydeposit">Security Deposit{this.renderRequired()}</label>
            <TextInput value={this.state.securitydeposit.value} onChange={this.handleChange('securitydeposit')}/>
          </LabelComponent>
          <LabelComponent>
            <label htmlFor="squarefeet">Square Feet{this.renderRequired()}</label>
            <TextInput value={this.state.squarefeet.value} onChange={this.handleChange('squarefeet')}/>
          </LabelComponent>
        </FieldComponent>

          <FieldComponent>
            <LabelComponent>
              <label htmlFor="beds">Beds{this.renderRequired()}</label>
              <DropDownInput value={this.state.beds.value} onChange={this.handleChange('beds')}>
                {this.renderDropdownValues(bedsValues)}
              </DropDownInput>
            </LabelComponent>
            <LabelComponent>
              <label htmlFor="baths">Baths{this.renderRequired()}</label>
              <DropDownInput value={this.state.baths.value} onChange={this.handleChange('baths')}>
                {this.renderDropdownValues(bathsValues)}
              </DropDownInput>
            </LabelComponent>
          </FieldComponent>


          <FieldComponent>
          <LabelComponent>
            <label htmlFor="leaseterms">Lease Terms{this.renderRequired()}</label>
            <TextInput value={this.state.leaseterms.value} onChange={this.handleChange('leaseterms')}/>
          </LabelComponent>
          <LabelComponent>
            <label htmlFor="description">Description{this.renderRequired()}</label>
            <TextArea value={this.state.description.value} onChange={this.handleChange('description')}/>
          </LabelComponent>
        </FieldComponent>

        </Field>
      )
    }
    renderContactInformation(){
      return(
          <Field>
              <FieldTitle>Contact Information</FieldTitle>

                <FieldComponent>
                  <LabelComponent>
                    <label htmlFor="name">Name{this.renderRequired()}</label>
                    <TextInput value={this.state.contactinfoname.value} placeholder={'Enter name'} onChange={this.handleChange('contactinfoname')}/>
                  </LabelComponent>
                  <LabelComponent>
                    <label htmlFor="forrentby">For rent by:{this.renderRequired()}</label>
                    <DropDownInput values={this.state.forrentby.value} onChange={this.handleChange('forrentby')}>
                        {this.renderDropdownValues(forRentByValues)}
                    </DropDownInput>
                  </LabelComponent>
                </FieldComponent>

                 <FieldComponent>
                  <LabelComponent>
                    <label htmlFor="phone">Phone{this.renderRequired()}</label>
                    <TextInput value={this.state.contactinfophone.value} placeholder={'(XXX)-(XXX)-(XXXX)'} onChange={this.handleChange('contactinfophone')}/>
                  </LabelComponent>
                </FieldComponent>

                  <FieldComponent>
                    <LabelComponent>
                        <label htmlFor="email">Email{this.renderRequired()}</label>
                        <TextInput value={this.state.contactinfoemail.value} onChange={this.handleChange('contactinfoemail')}/>
                    </LabelComponent>
                  </FieldComponent>
          </Field>
      )
    }
    renderAmenities(){
      return(
          <Field>
              <FieldTitle>Amenities</FieldTitle>

                <FieldComponent>
                  <LabelComponent>
                    <label htmlFor="amenitiesoptional">Amenities{this.renderOptional()}{this.renderOptional}</label>
                    {this.renderCheckboxes(optionalAmenitiesValues)}
                  </LabelComponent>
                  <LabelComponent>
                    <label htmlFor="amenitiespets">Pets{this.renderRequired()}</label>
                    <TextInput/>
                  </LabelComponent>
                </FieldComponent>

                  <FieldComponent>
                    <LabelComponent>
                        <label htmlFor="laundry">Laundry{this.renderRequired()}</label>
                        <DropDownInput>
                          {this.renderDropdownValues(laundryValues)}
                        </DropDownInput>
                    </LabelComponent>
                  </FieldComponent>

                  <FieldComponent>
                    <LabelComponent>
                        <label htmlFor="additionalamenities">Additional Amenities</label>
                        <TextInput/>
                    </LabelComponent>
                  </FieldComponent>
          </Field>
      )
    }
    getFile = (event) => {
      const photo = URL.createObjectURL(event.target.files[0])
      this.setState({photos:{value: [...this.state.photos.value, photo], error: false } })
    }
    uploadFile = () => {
      this.fileInput.current.click();
    }
    renderImage(){
      if(this.state.photos.value.length === 0){
        return(<div></div>)
      }
      var count = 0;
      const mappedArray = this.state.photos.value.map((photo) => {
        const style = {
          position: 'relative',
          backgroundImage: `url(${photo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
        }
        count++
        return(
            <ImageContainer>
              <div style={style}>
                <ImageTag>{count}.</ImageTag>
              </div>
            </ImageContainer>
          )
      })
      return mappedArray
    }
    renderPhotos(){
      return(
          <Field>
              <FieldTitle>Photos{this.renderRequired()}</FieldTitle>
              <PhotoFieldComponent>
                    <ImageFileComponent>
                      {this.renderImage()}
                    </ImageFileComponent>
                    <PhotoComponent onClick={this.uploadFile}>
                        <FileInput type="file" ref={this.fileInput} onChange={this.getFile}/>
                      </PhotoComponent>
                  </PhotoFieldComponent>
          </Field>
      )
    }
    render(){
        return(
            <div>
              <LisitingComponent>
                {this.renderDetails()}
                {this.renderContactInformation()}
                {this.renderAmenities()}
                {this.renderPhotos()}
              </LisitingComponent>
            </div>
            )
    }
  }
    
  const mapStateToProps =  state => {
    return {token: state.token}
  }

  export default connect(mapStateToProps)(ListRental)
