import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { Query, withApollo, Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
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
const Error = styled.div`
    width: 100%;
    color: red;
    font-size: 0.8em;
`
const EmailInput = styled.input`
    width:100%;
    height: 40px
    margin: 5px 0;
    font-size: 18px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: ${props => props.error ? "#FFE3E2" : "white"};
    border: ${props => props.error ? "1px solid red" : "1px solid #ccc"};
    :active {
        background-color: white;
    }
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
    background-color: ${props => props.error ? "#FFE3E2" : "white"};
    border: ${props => props.error ? "1px solid red" : "1px solid #ccc"};
    :active {
        background-color: white;
    }
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
    :disabled {
        background-color: #ccc;
    }
`
const ForgotPassword = styled.div`
    width: 50%;
    display: inline-block;
    font-size: 16px;
    color: green;
    cursor: pointer;
    text-align: center;
`
const LOG_IN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            userId
            token
            tokenExpiration
        }
    }
`
const CREATE_USER = gql`
    mutation createUser($userInput: UserInput){
        createUser(userInput: $userInput){
            _id
            email
        }
    }
`
 class form extends Component {
  constructor(props){
      super(props)
      this.state = {
            active: 'signin',
            error: {
                email: {
                    showError: true,
                    style:{
                        text: 'Enter a valid email address',
                    }
                },
                password:{
                    showError: true,
                    style:{
                        text: {
                            length: 'At least 8 characters',
                            containNumber: 'Mix of letters and numbers',
                        },
                    }
                }
            }
      }
      this.email = React.createRef()
      this.password = React.createRef()
  }
  reset = (selection) => {
            this.setState({
                active: selection,
                email: '',
                password: '',
                error: {
                    email: {
                        showError: true,
                        style:{
                            text: 'Enter a valid email address',
                        }
                    },
                    password:{
                        showError: true,
                        style:{
                            text: {
                                length: 'At least 8 characters',
                                containNumber: 'Mix of letters and numbers'
                            },
                        }
                    }
                }
            })
    }

  validateEmail(event){
      const emailRegEx = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const email = event.currentTarget.value
      if(!emailRegEx.test(email) || email.length === 0){
          if(!this.state.error.email.showError){
              this.setState({
                  email,
                  error:{
                      email:{
                          showError: true,
                          style:{
                             text: 'Enter a valid email address'
                          }
                      },
                      password:{
                          showError: this.state.error.password.showError,
                          style:{
                            text: {
                                length: this.state.error.password.style.text.length,
                                containNumber: this.state.error.password.style.text.containNumber
                            }
                         }
                      }
                  }
              })
          }
      }else{
        if(this.state.error.email.showError){
            this.setState({
                email,
                error:{
                    email:{
                        showError: false,
                        style:{
                           text: ''
                        }
                    },
                    password:{
                        showError: this.state.error.password.showError,
                        style:{
                            text: {
                                length: this.state.error.password.style.text.length,
                                containNumber: this.state.error.password.style.text.containNumber
                            }
                         }

                    }
                }
            })
        }
      }
  }

  validatePassword(event){
    const passwordRegEx = /.*[0-9].*/
    const password = event.currentTarget.value
    if(!passwordRegEx.test(password) || password.length < 8){
        var error = {}

        if(passwordRegEx.test(password)){
            error.containNumber = ''
        }else{
            error.containNumber = 'Mix of letters and numbers'
        }

        if(password.length >= 8){
            error.length = ''
        }else{
            error.length = 'At least 8 characters'
        }

        this.setState({
            error:{
                email: {
                    showError: this.state.error.email.showError,
                    style: {
                        text: this.state.error.email.style.text
                    }
                },
                password: {
                    showError: true,
                    style:{
                       text: {
                           length: error.length,
                           containNumber: error.containNumber
                       }
                    }
                }
            }
        })
    }else{
        this.setState({
            error: {
                email:{
                    showError: this.state.error.email.showError,
                    style: {
                        text: this.state.error.email.style.text
                    }
                },
                password: {
                    showError: false,
                    style: {
                        text: {
                            length: '',
                            containNumber: ''
                        }
                    }
                }
            }
        })
    }
}

  renderForm = () => {
      if(this.state.active === 'signin'){
        return(
            <ApolloConsumer>
                {(client) => (
                    <Mutation 
                        mutation={LOG_IN}
                        onCompleted={({login}) => {
                            const {token} = login
                            localStorage.setItem('token',token)
                            client.resetStore()
                            window.location.reload()
                        }}
                        >
                    {(login,{data}) => (
                    <form onSubmit={e => {
                        e.preventDefault()
                        login({variables: {email: this.email.current.value, password: this.password.current.value} })
                    }}> 
                        <LinkComponent>
                            <SigninLink onClick={() => this.reset('signin')} style={{borderBottom: '1px solid green'}} >Sign In</SigninLink>
                            <SignUpLink onClick={() => this.reset('signup')}>Sign Up</SignUpLink>
                        </LinkComponent>
                        <InputComponent>
                        { this.state.error.email.showError ?  <EmailInput error type="text" placeholder="Enter email" ref={this.email} onChange={(e) => this.validateEmail(e)} /> :
                            <EmailInput  type="text" placeholder="Enter email" ref={this.email} onChange={(e) => this.validateEmail(e)} />}
                            <Error>{this.state.error.email.style.text}</Error>
                            <PasswordInput type="password" placeholder='Enter password' ref={this.password} />
                            <SubmitButton disabled={this.state.error.email.showError}>Submit</SubmitButton>
                            <ForgotPassword>Forgot Password ?</ForgotPassword>
                        </InputComponent>
                    </form>
                    )}
                </Mutation>
                )}
            </ApolloConsumer>
        )
      }else{
        return(
            <Mutation mutation={CREATE_USER}>
                {(createUser, {data}) => (
                <form onSubmit={e => {
                    e.preventDefault()
                    const userInput = {
                        email: this.state.email.value,
                        password: this.state.password.value
                    }
                    createUser({variables: {userInput}})
                    console.lof(data)
                }}>
                    <LinkComponent>
                        <SigninLink onClick={() => this.reset('signin')}>Sign In</SigninLink>
                        <SignUpLink onClick={() => this.reset('signup')} style={{borderBottom: '1px solid green'}}>Sign Up</SignUpLink>
                    </LinkComponent>
                    <InputComponent>
                        { this.state.error.email.showError ?  <EmailInput error type="text" placeholder="Enter email" ref={this.email} onChange={(e) => this.validateEmail(e)} /> :
                        <EmailInput  type="text" placeholder="Enter email" ref={this.email} onChange={(e) => this.validateEmail(e)} />}
                        <Error>{this.state.error.email.style.text}</Error>
                        { this.state.error.password.showError ?  <PasswordInput error type="password" placeholder="Create password" ref={this.password} onChange={(e) => this.validatePassword(e)}/> : 
                            <PasswordInput  type="password" placeholder="Create password" ref={this.password} onChange={(e) => this.validatePassword(e)}/> }
                        <Error>{this.state.error.password.style.text.length}</Error>
                        <Error>{this.state.error.password.style.text.containNumber}</Error>
                        <SubmitButton disabled={this.state.error.email.showError || this.state.error.password.showError}>Create Account</SubmitButton>
                    </InputComponent>
                </form>
                )}
            </Mutation>
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
