import React, { Component } from 'react'
import styled from 'styled-components'

const LinkComponent = styled.div`
    clear: both;
    width: 90%;
    margin: auto;
    border-bottom: 0.5px solid #ccc;
`
const SigninLink = styled.h2`
    display: inline-block;
    font-weight: 200;
    cursor: pointer;
    padding: 10px;
    margin: auto 0;
`
const SignUpLink = styled.h2`
    display: inline-block;
    margin: 0 10px;
    font-weight: 200;
    padding: 10px;
    cursor: pointer;
`
const InputComponent = styled.div`
    margin: 20px auto;
    width: 90%;
`
const UserNameInput = styled.input`
    width:100%;
    height: 40px
    margin: 5px 0;
    font-size: 18px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ccc;
`
const PasswordInput = styled.input`
    width: 100%;
    height: 40px;
    margin: 5px 0;
    font-size: 18px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ccc;
`
const SubmitButton = styled.button`
    width: 50%;
    height: 40px;
    font-size: 16px;
    border-radius: 5px;
    display: inline-block;
    background-color: green;
    cursor: pointer;
    color: white;
    margin: auto;
`
const ForgotPassword = styled.div`
    width: 50%;
    display: inline-block;
    font-size: 16px;
    color: green;
    cursor: pointer;
    text-align: center;
`
 class form extends Component {
  constructor(props){
      super(props)
      this.state = {
            active: 'signin',
      }
      this.setSignUpActive = this.setSignUpActive.bind(this)
      this.setSignInActive = this.setSignInActive.bind(this)
  }

  setSignUpActive(){
            console.log('Signup')
            this.setState({active: 'signup'})
  }

  setSignInActive(){
        this.setState({active: 'signin'})
  }
  renderForm(){
      if(this.state.active === 'signin'){
        return(
            <div>
                <LinkComponent>
                    <SigninLink onClick={() => this.setSignInActive()} style={{borderBottom: '1px solid green'}} >Sign In</SigninLink>
                    <SignUpLink onClick={() => this.setSignUpActive()}>Sign Up</SignUpLink>
                </LinkComponent>
                <InputComponent>
                    <UserNameInput type="text" placeholder="Enter email"/>
                    <PasswordInput type="text" placeholder="Enter password"/>
                    <SubmitButton>Submit</SubmitButton>
                    <ForgotPassword>Forgot Password ?</ForgotPassword>
                </InputComponent>
            </div>
        )
      }else{
        return(
            <div>
                <LinkComponent>
                    <SigninLink onClick={(e) => this.setSignInActive()}>Sign In</SigninLink>
                    <SignUpLink onClick={(e) => this.setSignUpActive()} style={{borderBottom: '1px solid green'}}>Sign Up</SignUpLink>
                </LinkComponent>
                <InputComponent>
                    <UserNameInput type="text" placeholder="Enter email"/>
                    <PasswordInput type="text" placeholder="Create password"/>
                    <SubmitButton>Create Account</SubmitButton>
                </InputComponent>
            </div>
          )
      }

  }

  render() {
    return (
        <div>
           {this.renderForm()}
        </div>
    )
  }
}
export default form
