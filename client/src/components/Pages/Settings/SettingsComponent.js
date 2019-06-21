import React, { Component, Fragment } from 'react'
import {Query, Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {size, minDeviceWidth, maxDeviceWidth} from '../../DeviceLayout'
import TextInput from '../../Input/Text'
import DropDown from '../../Input/DropDown'
import File from '../../Input/File'
import {Redirect} from 'react-router-dom'
import states from '../../states'
import styled from 'styled-components'
const SUBMIT = gql`
  mutation EditUser($userInput: UserInput){
    editUser(userInput: $userInput)
  }
`
const TESTPHOTO= gql`
  mutation TestPhoto($file: Upload!){
    testPhoto(file: $file)
  }
`
const MainContainer = styled.div`
  position: absolute;
  left: 10%;
  margin: 1em;
  width: 80%;
  top: 10%;
  background-color: white;
  border: 1px solid #ccc;
  @media only screen and ${maxDeviceWidth.tablet} {
    width: 100%;
    margin: 0;
    left: 0;
}
`
const Title = styled.h1`
  align: left;
  margin: 10px;
  @media only screen and ${maxDeviceWidth.tablet} {
    text-align: center;
}
`
const LabelInputComponnets = styled.div`
  margin: 2em 0;
`
const Label = styled.div`
  display: inline-block;
  width: 45%;
  margin: 0 10px;
  height: 100%;
  font-size: 1em;
  font-weight: bold;
  @media only screen and ${maxDeviceWidth.tablet} {
    width: 100%;
    display: block;
}
`
const TextInputComponnet = styled.div`
  display: inline-block;
  width: 45%;
  height: 2em;
  @media only screen and ${maxDeviceWidth.tablet} {
    width: 90%;
    margin: 0 10px;
    display: block;
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
  width: 40%;
  display: inline-block;
  color: black;
  margin-left: 0.5em;
  height: 100%;
  font-size: 1em;
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
const CheckBox = styled.input`
  width: 5%;
  height: 1em;
  float: left;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  @media only screen and ${maxDeviceWidth.tablet} {
    margin 0 10px;
}

`
const CheckBoxDesc = styled.div`
  display: block;
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
  userphoto: {
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
  buisnessphone:{
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
const profressionalCategories =  ['Real Estate Agent/Broker', 'Mortgage Lender', 'Home Improvement', 'Home Builder', 'Other']
class SettingsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
          industryProfressional: false,
          filename: null
        }
        this._refs = {}
      }
    handleSubmit = async (editUser) => {
      var userInput = {}
      var passed = true
      for(var key in fields){
          if(fields[key].required && fields[key].profressional === false){
            if(this._refs[key].containsError()){
                passed = false;
            }else{
                userInput[key] = this._refs[key].getValue()
            }
          }else if (!fields[key].required && fields[key].profressional === false){
              userInput[key] = this._refs[key].getValue()
          }else if(this.state.industryProfressional){
            if(fields[key].profressional === true){
                if(this._refs[key].containsError()){
                passed = false;
                }else{
                userInput[key] = this._refs[key].getValue()
                }
            }
          }else{
            userInput[key] = this._refs[key].getValue()
          }
      }
      if(this.state.industryProfressional){
          userInput['industryProfressional'] = true
      }else{
          userInput['industryProfressional'] = false
      }
      if(!passed){
        alert('Error')
      }
      editUser({variables: {userInput}})
    }


    activateFileInput = () => {
      this._refs['userphoto'] .activate();
    }
    getFile = (event) => {
      const files = event.currentTarget.files
      var filename = null;
      if(files.length !== 0){
        filename = files[0].name
      }
      this.setState({filename})
    }
    renderFileName = () => {
    const filename = this.state.filename === null ? 'No File' : this.state.filename
    if(filename.length > 14){
        const newFileName = filename.substring(0,11)
        return <FileName>{newFileName}...</FileName>
    }
        return <FileName>{filename}</FileName>
    }
    toggleFields = () => {
        this.checkbox.click()
        this.setState({industryProfressional: !this.state.industryProfressional})
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
    componentDidMount(){
      const {values} = this.props
      if(values){
        this.setState({industryProfressional: values.industryProfressional})
      }
    }
    render() {
            if(this.props.values){
              const {values} = this.props
              return(
                <Mutation mutation={SUBMIT}
                errorPolicy="all"
                onError={(error) => {
                  console.log(error)
                }}
                >
                  {(editUser,{data}) => {
                     return(
                      <form enctype="multipart/form-data" onSubmit={(e) => {
                        e.preventDefault()
                        this.handleSubmit(editUser)
                      }}>
                    <MainContainer>
                    <Title>Edit User Settings</Title>
                    
                    <LabelInputComponnets>
                      <Label>
                        <label htmlFor="email">Email{this.renderRequired()}</label>
                      </Label>
                      <TextInputComponnet>
                          <TextInput email errorMessages={'Enter valid email'} value={values.email}  className={'settingstextinput'} required ref={(ref) => this._refs['email'] = ref}/>
                      </TextInputComponnet>
                    </LabelInputComponnets>
                    
                     <LabelInputComponnets>
                      <Label>
                        <label htmlFor="fullname">Full&nbsp;name{this.renderRequired()}</label>
                      </Label>
                      <TextInputComponnet>
                        <TextInput   className={'settingstextinput name'} value={values['firstname']}  required ref={(ref) => this._refs['firstname'] = ref}/>
                        <TextInput   className={'settingstextinput name'} value={values['lastname']}  required ref={(ref) => this._refs['lastname'] = ref}/>
                      </TextInputComponnet>
                    </LabelInputComponnets>
                    
                    <LabelInputComponnets>
                      <Label>
                        <label htmlFor="username">Username{this.renderRequired()}</label>
                      </Label>
                      <TextInputComponnet>
                        <TextInput   errorMessages={'Enter valid username'} value={values['username']}  className={'settingstextinput'} required ref={(ref) => this._refs['username'] = ref}/>
                      </TextInputComponnet>
                    </LabelInputComponnets>
                    
                    <LabelInputComponnets>
                      <Label>
                        <label htmlFor="email">Profile photo{this.renderOptional()}</label>
                      </Label>
                      <TextInputComponnet>
                          <FileInputButton onClick={this.activateFileInput}>Choose File</FileInputButton>
                          <File className={'settingsfile'} ref={(ref) => this._refs['userphoto'] = ref} setFileName={(filename) => this.setState({filename})} />
                          <FileName>{this.renderFileName()}</FileName>
                      </TextInputComponnet>
                    </LabelInputComponnets>
                    
                    <LabelInputComponnets>
                        <ProfressionalCheckBoxComponent onClick={this.toggleFields}>
                          {this.state.industryProfressional ? <CheckBox type = "checkbox" checked ref={(ref) => this.checkbox = ref}/>  : 
                        <CheckBox type = "checkbox" ref={(ref) => this.checkbox = ref}/>}
                        <CheckBoxDesc>I am an industry profressional</CheckBoxDesc>
                        </ProfressionalCheckBoxComponent>
                    </LabelInputComponnets>
                    {this.state.industryProfressional && this.renderProfressionalFields(values)}
                    
                    <LabelInputComponnets>
                      <Label/>
                      <TextInputComponnet>
                          <SubmitButton>Submit</SubmitButton>
                          <CancelButton href="/myaccount">Cancel</CancelButton>
                      </TextInputComponnet>
                    </LabelInputComponnets>
                    
                    </MainContainer>
                    </form>
                    )
                  }}
                </Mutation>
              )
            }
    }
    renderProfressionalFields = (queryValues) => {
        return(
          <div>
            <LabelInputComponnets>
              <Label>
                <label htmlFor="profressionalcategory" >Profressional Category{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  <DropDown required className={'settingsdropdown'} queryValue={queryValues['profressionalcategory']} ref={(ref) => this._refs['profressionalcategory'] = ref} values={profressionalCategories} default={'Category'} />
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="proffesionaltitle">Profressional Title{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                <TextInput required errorMessages={'Enter profressional title'} value={queryValues['profressionaltitle']} className={'settingstextinput'} ref={(ref) => this._refs['profressionaltitle'] = ref}/>
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessname">Buisness Name{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  <TextInput required errorMessages={'Enter buisness name'} value={queryValues['buisnessname']} className={'settingstextinput'} ref={(ref) => this._refs['buisnessname'] = ref}/>
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessaddress">Buisness Addresss{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  <TextInput required errorMessages={'Enter buisness address'} value={queryValues['buisnessaddress']} className={'settingstextinput'} ref={(ref) =>  this._refs['buisnessaddress'] = ref}/>
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesscity">City{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  <TextInput required errorMessages={'Enter city'} className={'settingstextinput'} value={queryValues['buisnesscity']} ref={(ref) => this._refs['buisnesscity'] = ref}/>
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessstate">State{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                  <DropDown required default={'State'} queryValue={queryValues['buisnessstate']} className={'settingsdropdown'} ref={(ref) => this._refs['buisnessstate'] = ref} values={states} />
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesszipcode">ZIP Code{this.renderRequired()}</label>
              </Label>
              <TextInputComponnet>
                <TextInput required value={queryValues['buisnesszipcode']} errorMessages={'Enter zipcode'} className={'settingstextinput'} ref={(ref) => this._refs['buisnesszipcode'] = ref}/>
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessphone">Buisness phone{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                  <TextInput  className={'settingstextinput'} value={queryValues['buisnessphone']} ref={(ref) => this._refs['buisnessphone'] = ref}/>
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnessfacebook">Facebook{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                  <TextInput className={'settingstextinput'} value={queryValues['buisnessfacebook']}  ref={(ref) => this._refs['buisnessfacebook'] = ref}/>
              </TextInputComponnet>
            </LabelInputComponnets>

             <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesstwitter">Twitter{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                    <TextInput className={'settingstextinput'} value={queryValues['buisnesstwitter']}  ref={(ref) => this._refs['buisnesstwitter'] = ref}/>
              </TextInputComponnet>
              </LabelInputComponnets>

              <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesslinkedin">Linkedin{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
              <TextInput  className={'settingstextinput'} value={queryValues['buisnesslinkedin']} ref={(ref) => this._refs['buisnesslinkedin'] = ref}/>
              </TextInputComponnet>
            </LabelInputComponnets>

            <LabelInputComponnets>
              <Label>
                <label htmlFor="buisnesswebsite">Website{this.renderOptional()}</label>
              </Label>
              <TextInputComponnet>
                <TextInput  className={'settingstextinput'} value={queryValues['buisnesswebsite']} ref={(ref) => this._refs['buisnesswebsite'] = ref}/>
              </TextInputComponnet>
            </LabelInputComponnets>
          </div>
        )
    }
}
export default SettingsComponent