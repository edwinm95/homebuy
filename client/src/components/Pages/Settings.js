import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import regex from '../regex'
import states from '../states'
const SettingsComponent = styled.div`
  position: absolute;
  left: 25%;
  margin: 1em;
  width: 50%;
`
const Title = styled.h1`
  align: left;
`
const LabelInputComponnets = styled.div`
  margin: 2em 0;
`
const Label = styled.div`
  display: inline-block;
  width: 50%;
  height: 100%;
  font-size: 1em;
  font-weight: bold;
`
const TextInputComponnet = styled.div`
  display: inline-block;
  width: 50%;
  height: 2em;
`
const TextInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1em;
  border: ${props => props.error ? "1px solid #ff5a50" : "1px solid black"};
  background-color: ${props => props.error ? "#ffe3e2" : "#fff"};
  box-sizing: border-box;
  padding: 0.5em;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  :hover{
    border: 1px solid green;
  }
  :focus{
    outline: none !important;
    border: 1px solid green;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
  }
`
const Errors = styled.div`
  width: 100%;
  font-size: 0.8em;
  padding: 0.5em;
  color: red;
`
const PhoneInput = styled.input`
  width: 15%;
  height: 100%;
  margin-right: 5px;
  font-size: 1em;
  border: ${props => props.error ? "1px solid #ff5a50" : "1px solid black"};
  background-color: ${props => props.error ? "#ffe3e2" : "#fff"};
  box-sizing: border-box;
  padding: 0.5em;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  :hover{
    border: 1px solid green;
  }
  :focus{
    outline: none !important;
    border: 1px solid green;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
  }
`
const ExtentsionInput = styled.input`
  width: 20%;
  height: 100%;
  margin-right: 5px;
  font-size: 1em;
  border: ${props => props.error ? "1px solid #ff5a50" : "1px solid black"};
  background-color: ${props => props.error ? "#ffe3e2" : "#fff"};
  box-sizing: border-box;
  padding: 0.5em;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  :hover{
    border: 1px solid green;
  }
  :focus{
    outline: none !important;
    border: 1px solid green;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
  }
`
const FirstNameInput = styled.input`
  width: 40%;
  height: 100%;
  font-size: 1em;
  padding: 0.5em;
  border: ${props => props.error ? "1px solid #ff5a50" : "1px solid black"};
  background-color: ${props => props.error ? "#ffe3e2" : "#fff"};
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  :hover{
    border: 1px solid green;
  }
  :focus{
    outline: none !important;
    border: 1px solid green;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
  }
`
const LastNameInput = styled.input`
  width: 40%;
  height: 100%;
  font-size: 1em;
  padding: 0.5em;
  border: ${props => props.error ? "1px solid #ff5a50" : "1px solid black"};
  background-color: ${props => props.error ? "#ffe3e2" : "#fff"};
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin-left:1em;
  :hover{
    border: 1px solid green;
  }
  :focus{
    outline: none !important;
    border: 1px solid green;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
  }
`

const FileInput = styled.input`
  display: none;
`
const FileInputButton = styled.div`
  width: 30%;
  background-color: #ccc;
  display: block;
  float: left;
  height: 40px;
  text-align: center;
  padding-top: 5px;
  color: black;
  height: 100%;
  font-size: 1em;
  font-weight: 100;
  cursor: pointer;
  :hover{
    -webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
  }
`
const FileName = styled.div`
  width: 30%;
  display: inline-block;
  color: black;
  margin-left: 0.5em;
  height: 100%;
  font-size: 1em;
`
const DropDown = styled.select`
  width: 100%;
  height: 100%;
  font-size: 1em;
  border: ${props => props.error ? "1px solid #ff5a50" : "1px solid black"};
  background-color: ${props => props.error ? "#ffe3e2" : "#fff"};
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  :hover{
    border: 1px solid green;
  }
  :focus{
    outline: none !important;
    border: 1px solid green;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
    box-shadow: 0px 0px 5px 0px rgba(15,133,32,1);
  }
`

const ProfressionalCheckBoxComponent = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1em;
  cursor: pointer;
  :hover{
    color: green;
  }
`
const SubmitButton = styled.button`
  width: 30%;
  float: left;
  background-color: green;
  color: white;
  border: 1px solid black;
  margin: 2px 0;
  height: 100%;
  font-size: 1em;
  font-weight: 100;
  text-align: center;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  cursor: pointer;
  :hover{
    -webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
  }
`
const CancelButton = styled.a`
  width: 30%;
  display: block;
  float: left;
  background-color: #ccc;
  color: black;
  height: 100%;
  margin: 2px 0.5em;
  font-size: 1em;
  font-weight: 100;
  text-align: center;
  padding-top: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  :hover{
    -webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
  }
`

const fields = {
  firstname:{
    required: true,
    profressional: false
  },
  lastname:{
    required: true,
    profressional: false
  },
  username:{
    required: true,
    profressional: false
  },
  email:{
    required: true,
    profressional: false
  },
  userphoto:{
    required: false,
    profressional: false
  },
  profressionalcategory:{
    required: true,
    profressional: true
  } ,
  profressionaltitle:{
    required: true,
    profressional: true
  },
  buisnessname:{
    required: true,
    profressional: true
  },
  buisnessaddress:{
    required: true,
    profressional: true
  },
  buisnesscity:{
    required: true,
    profressional: true
  },
  buisnessstate:{
    required: true,
    profressional: true
  },
  buisnesszipcode:{
    required: true,
    profressional: true
  },
  buisnessareacode:{
    required: false,
    profressional: true
  },
  buisnessphone1:{
    required: false,
    profressional: true
  },
  buisnessphone2:{
    required: false,
    profressional: true
  },
  buisnessextenstion:{
    required: false,
    profressional: true
  },
  buisnessfacebook:{
    required: false,
    profressional: true
  },
  buisnesstwitter:{
    required: false,
    profressional: true
  },
  buisnesslinkedin:{
    required: false,
    profressional: true
  },
  buisnesswebsite:{
    required: false,
    profressional: true
  }
}


class Settings extends Component {
  state = {
    _id: null,
    firstname:{
      value: null,
      errors: true
    },
    lastname:{
      value: null,
      errors: true
    },
    username:{
      value: null,
      errors: true
    },
    email:{
      value: null,
      errors: true
    },
    userphoto:{
      value: null
    },
    profressionalcategory: {
      value: null,
      errors: true,
    },
    profressionaltitle:{
      value: null,
      errors: true
    },
    buisnessname:{
      value: null,
      errors: true
    },
    buisnessaddress:{
      value: null,
      errors: true
    },
    buisnesscity:{
      value: null,
      errors: true
    },
    buisnessstate:{
      value: null,
      errors: true
    },
    buisnesszipcode:{
      value: null,
      errors: true
    },
    buisnessareacode:{
      value: null,
      errors: false,
    },
    buisnessphone1:{
      value: null,
      errors: false
    },
    buisnessphone2:{
      value: null,
      errors: false
    },
    buisnessextenstion:{
      value: null,
      errors: false
    },
    buisnessfacebook:{
      value: null,
      errors: false
    },
    buisnesstwitter:{
      value: null,
      errors: false
    },
    buisnesslinkedin:{
      value: null,
      errors: false
    },
    buisnesswebsite:{
      value: null,
      errors: false
    },
    filename: 'No file chosen',
    profressionalCategories: ['Real Estate Agent/Broker', 'Mortgage Lender', 'Home Improvement', 'Home Builder', 'Other'],
    showProfressionalFields: false
}
constructor(props){
  super(props)
  this.fileInput = React.createRef()
  this.profressionalCheckbox = React.createRef()
}
  componentDidMount(){
    this.getUserInformation()
  }
  valueChange = (key) => (e) => {
    const value = e.target.value
    var errors = false
    if(key === 'email'){
      errors = !regex.email.test(value)
    }else if((key === 'buisnesszipcode') || (key === 'buisnessareacode') || 
      (key === 'buisnessphone1') || 
      (key === 'buisnessphone2') ||
      (key === 'buisnessextenstion') ){
        errors = !regex.number.test(value)
        if((key === 'buisnessareacode') || (key === 'buisnessphone1')){
              if(value.toString().length !== 3 && value.length !== 0){
                  errors = true
              }
        }else if(key === 'buisnessphone2'){
          if(value.toString().length !== 4 && value.length !== 0){
            errors = true
          }
        }else if (key === 'buisnesszipcode'){
          if(value.toString().length !== 5){
            errors = true
          }
        }
    }
    if(value.length === 0 && fields[key].required === true){
      errors = true;
    }else if(value.length === 0 && fields[key].required === false){
      errors = false;
    }
      this.setState({[key]: {value,errors}})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    var passed = true
    for(var key in fields){
      if(fields[key].required && fields[key].profressional === false){
        if(this.state[key].errors){
          passed = false;
        }
      }else if(this.state.showProfressionalFields){
        if(fields[key].profressional === true){
          if(this.state[key].errors){
            passed = false;
          }
        }
      }
    }
    var lengthofAreaCode = this.state.buisnessareacode.value ? this.state.buisnessareacode.value.length : 0
    var lengthofBuisnessPhone1 = this.state.buisnessphone1.value ? this.state.buisnessphone1.value.length : 0
    var lengthofBuisnessPhone2 = this.state.buisnessphone2.value ? this.state.buisnessphone2.value.length : 0

    if((lengthofAreaCode !== 3 || lengthofBuisnessPhone1 !== 3 || lengthofBuisnessPhone2 !== 4) &&
    (lengthofAreaCode !== 0 || lengthofBuisnessPhone1 !== 0 || lengthofBuisnessPhone2 !== 0)){
        passed = false
    }
    if(passed){
      const requestBody = {
        query: `
          mutation {
              editUser(
                userInput: { email:"${this.state.email.value}", firstname:"${this.state.firstname.value}", lastname:"${this.state.lastname.value}", username:"${this.state.username.value}" }
              )
          }
        `
      }
      const response = await fetch('http://localhost:5000/graphql',{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        }
      })
      const responseData = await response.json()
      console.log(responseData)
    }else{
      alert('Please enter required fields')
    }

  }
  activateFileInput = () => {
    this.fileInput.current.click();
  }
  getFile = (event) => {
    const {name} = event.target.files[0]
    this.setState({filename: name})
    console.log(this.fileInput.current.files[0]);
  }
  renderFileName = () => {
    const {filename} = this.state
    if(filename.length > 14){
      const newFileName = filename.substring(0,11)
      return <FileName>{newFileName}...</FileName>
    }
    return <FileName>{filename}</FileName>
  }
  toggleFields = () => {
    this.profressionalCheckbox.current.click()
    this.setState({showProfressionalFields: !this.state.showProfressionalFields})
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
  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
          <SettingsComponent>
            <Title>Edit User Settings</Title>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="email">Email{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  {this.state.email.errors ? <TextInput name="email" error value={this.state.email.value} onChange={this.valueChange('email')}/> : 
                  <TextInput name="email" value={this.state.email.value} onChange={this.valueChange('email')}/>}
                  {(this.state.email.errors) && <Errors>Please enter valid Email</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

             <LabelInputComponnets>
              <Label>
                <label htmlFor="fullname">Full&nbsp;name{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  {this.state.firstname.errors ? <FirstNameInput name="firstname" error placeholder={'First'} value={this.state.firstname.value} onChange={this.valueChange('firstname')}/> :
                  <FirstNameInput name="firstname"  placeholder={'First'} value={this.state.firstname.value} onChange={this.valueChange('firstname')}/>}
                  {this.state.lastname.errors ? <LastNameInput name="lastname" error placeholder={'Last'} value={this.state.lastname.value} onChange={this.valueChange('lastname')}/>
                  : <LastNameInput name="lastname" placeholder={'Last'} value={this.state.lastname.value} onChange={this.valueChange('lastname')}/>}
                  {(this.state.firstname.errors || this.state.lastname.errors) && <Errors>Please enter First Name and Last Name</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="username">Username{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  {this.state.username.errors ?  <TextInput name="username" error placeholder={'Username'} value={this.state.username.value} onChange={this.valueChange('username')}/>
                  : <TextInput name="username"  placeholder={'Username'} value={this.state.username.value} onChange={this.valueChange('username')}/>}
                  {this.state.username.errors && <Errors>Please enter Username</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="email">Profile photo{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                  <FileInputButton onClick={this.activateFileInput}>Choose File</FileInputButton>
                  {this.renderFileName()}
                  <FileInput type="file" ref={this.fileInput} onChange={this.getFile}/>
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
                <ProfressionalCheckBoxComponent onClick={this.toggleFields}>
                    <input type = "checkbox" ref={this.profressionalCheckbox}/> I am an industry profressional
                </ProfressionalCheckBoxComponent>
            </LabelInputComponnets>
            {this.state.showProfressionalFields && this.renderProfressionalFields()}

            <LabelInputComponnets>
              <Label/>
              <TextInputComponnet>
                  <SubmitButton>Submit</SubmitButton>
                  <CancelButton href="/myaccount">Cancel</CancelButton>
              </TextInputComponnet>
            </LabelInputComponnets>

          </SettingsComponent>
          </form>
      </div>
    )
  }
  renderProfressionalFields = () => {
      if(this.state.showProfressionalFields){
        return(
          <div>
            <LabelInputComponnets>
              <Label>
                <label htmlFor="profressionalcategory" >Profressional Category{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  {this.state.profressionalcategory.errors ? 
                    (<DropDown error value={this.state.profressionalcategory.value} onChange={this.valueChange('profressionalcategory')}>
                      {this.renderProfressionalCategories()}
                    </DropDown>) 
                  : (<DropDown value={this.state.profressionalcategory.value} onChange={this.valueChange('profressionalcategory')}>
                      {this.renderProfressionalCategories()}
                  </DropDown>)  }
                  {this.state.profressionalcategory.errors && <Errors>Please Select Category</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="proffesionaltitle">Profressional Title{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  {this.state.profressionaltitle.errors ? <TextInput name="proffesionaltitle" error placeholder={'Title'} value={this.state.profressionaltitle.value} onChange={this.valueChange('profressionaltitle')} />
                  : <TextInput name="proffesionaltitle" placeholder={'Title'} value={this.state.profressionaltitle.value} onChange={this.valueChange('profressionaltitle')} />}
                  {this.state.profressionaltitle.errors && <Errors>Enter Profressional Title</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessname">Buisness Name{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  {this.state.buisnessname.errors ? <TextInput name="buisnessname" error placeholder={'Buisness Name'} value={this.state.buisnessname.value} onChange={this.valueChange('buisnessname')} />
                  : <TextInput name="buisnessname" placeholder={'Buisness Name'} value={this.state.buisnessname.value} onChange={this.valueChange('buisnessname')} />}
                  {this.state.buisnessname.errors && <Errors>Enter Buisness Name Title</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessaddress">Buisness Adresss{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  {this.state.buisnessaddress.errors ? <TextInput name="buisnessaddress" error placeholder={'Buisness Addresss'} value={this.state.buisnessaddress.value} onChange={this.valueChange('buisnessaddress')}/>
                  : <TextInput name="buisnessaddress"  placeholder={'Buisness Addresss'} value={this.state.buisnessaddress.value} onChange={this.valueChange('buisnessaddress')}/>}
                  {this.state.buisnessaddress.errors && <Errors>Enter Street Address</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesscity">City{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  {this.state.buisnesscity.errors ? <TextInput name="buisnesscity" error placeholder={'City'} value={this.state.buisnesscity.value} onChange={this.valueChange('buisnesscity')} />
                  : <TextInput name="buisnesscity" placeholder={'City'} value={this.state.buisnesscity.value} onChange={this.valueChange('buisnesscity')} />}
                  {this.state.buisnesscity.errors && <Errors>Enter City</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessstate">State{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                    {this.state.buisnessstate.errors ? 
                    (<DropDown error value={this.state.buisnessstate.value} onChange={this.valueChange('buisnessstate')}>
                      {this.renderStates()}
                    </DropDown>) 
                  : (<DropDown value={this.state.buisnessstate.value} onChange={this.valueChange('buisnessstate')}>
                      {this.renderStates()}
                  </DropDown>)  }
                  {this.state.buisnessstate.errors && <Errors>Please Select State</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesszipcode">ZIP Code{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  {this.state.buisnesszipcode.errors ? <ExtentsionInput name="buisnessszipcode" error size={5} maxLength={5} pattern="\d*" placeholder={'Zip'} value={this.state.buisnesszipcode.value} onChange={this.valueChange('buisnesszipcode')} />
                  : <ExtentsionInput name="buisnessszipcode" size={5} maxLength={5} pattern="\d*" placeholder={'Zip'} value={this.state.buisnesszipcode.value} onChange={this.valueChange('buisnesszipcode')} />}
                  {this.state.buisnesszipcode.errors &&  <Errors>Enter ZIP code</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessphone">Buisness phone{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                  <PhoneInput name="buisnessareacode" size={3} maxLength={3} pattern="\d*" value={this.state.buisnessareacode.value} placeholder={'123'} onChange={this.valueChange('buisnessareacode')} />
                  <PhoneInput name="buisnessphone1" size={3} maxLength={3} pattern="\d*" value={this.state.buisnessphone1.value} placeholder={'456'} onChange={this.valueChange('buisnessphone1')} />
                  <PhoneInput name="buisnessphone2" size={4} maxLength={4} pattern="\d*" value={this.state.buisnessphone2.value} placeholder={'7890'} onChange={this.valueChange('buisnessphone2')}/>
                  ext&nbsp;
                  <ExtentsionInput name="buisnessextenstion" size={5} maxLength={5} pattern="\d*"placeholder={'12345'} value={this.state.buisnessextenstion.value} onChange={this.valueChange('buisnessextenstion')} />
                  {(this.state.buisnessareacode.errors || this.state.buisnessphone1.errors || this.state.buisnessphone2.errors
                    || this.state.buisnessextenstion.errors) && <Errors>Please enter valid Phone number</Errors>}
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessfacebook">Facebook{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                  <TextInput name="buisnessfacebook" placeholder={'www.facebook.com/[username]'} value={this.state.buisnessfacebook.value} />
              </TextInputComponnet>
            </LabelInputComponnets>

             <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesstwitter">Twitter{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                  <TextInput name="buisnesstwitter" placeholder={'www.twitter.com/[username]'} value={this.state.buisnesstwitter.value} />
              </TextInputComponnet>
              </LabelInputComponnets>

              <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesslinkedin">Linkedin{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                  <TextInput name="buisnesslinkedin" placeholder={'www.linkedin.com/[username]'} value={this.state.buisnesslinkedin.value} />
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesswebsite">Website{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                  <TextInput name="buisnesslinkedin" placeholder={'www.mywebsite.com/'} value={this.state.buisnesslinkedin.value}/>
              </TextInputComponnet>
            </LabelInputComponnets>
          </div>
        )
      }
  }
  renderStates = () => {
    var optionarray = []
    optionarray.push(<option selected disabled value="null">State</option>)
    for(var state in states){
        optionarray.push(<option value ={state}>{states[state]}</option>)
    }
    return optionarray;
  }
  renderProfressionalCategories = () => {
    const categoryArray = this.state.profressionalCategories
    const mappedArray = this.state.profressionalCategories.map((profressional) =>  {
      if(this.state.profressionalcategory.value === profressional){
        return(<option selected value={profressional}>{profressional}</option>)
      }
     return(<option value={profressional}>{profressional}</option>)
    })
    if(this.state.profressionalcategory.value === null){
      mappedArray.push(<option value={null} selected disabled>Category</option>)
    }
    return mappedArray
  }
  getUserInformation = async () => {
    const requestBody = {
      query: `
        query {
          getUser {
            _id
            firstname
            lastname
            username
            email
            userphoto
          
          }
        }
      `
    }
    try{
      const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token}`
      }
    })
    const responseData = await response.json()
    const {errors, data} = responseData
    if(errors){
      throw new Error(errors)
    }else{
      for(var key in data.getUser){
        var error = false;
        var value = data.getUser[key]
        if(value === null){
          error = true;
        }
        this.setState({[key]: {value,errors: error} })
      }
    }
    }catch(error){
      throw error
    }
  }
}
const mapStateToProps =  state => {
  return {token: state.token}
}

export default connect(mapStateToProps)(Settings)