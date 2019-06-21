import React, { Component } from 'react'
import styled from 'styled-components'
import LoginSignUpform from '../../Forms/Login_SignUp'
import GoogleSignUp from './GoogleSignUp'
import {maxDeviceWidth} from '../../DeviceLayout'
import './signup.css'
import SocialAuthentication from '../../Pages/SocialAuthentication';
const TitleComponent = styled.div`
    width: 90%;
    margin: auto;
`
const Title = styled.h2`
    dispaly: inline-block;
    float: left;
    font-size: 20px;
`
const CloseButton = styled.div`
    position: absolute;
    top: 20px;
    right: 5%;
    font-size: 20px;
    cursor: pointer;
    :hover{
        color: #90EE90;
    }
`
const ModalContent = styled.div`
    width: 30%;
    position: absolute;
    left: 35%;
    top: 2%;
    background-color: white;
    border: 0.5px solid #2A2A33;
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
    @media only screen and ${maxDeviceWidth.laptop} {
        width: 50%;
        left: 25%;
    }
    @media only screen and ${maxDeviceWidth.mobileL} {
        width: 100%;
        height: 100%;
        left: 0;
        border: 0px;
    }
`
const PageContent = styled.div`
    width: 30%;
    position: absolute;
    left: 35%;
    top: 15%;
    background-color: white;
    border: 0.5px solid #2A2A33;
    @media only screen and ${maxDeviceWidth.laptop} {
        width: 50%;
        left: 25%;
    }
    @media only screen and ${maxDeviceWidth.mobileL} {
        width: 100%;
        height: 100%;
        left: 0;
        border: 0px;
    }
`
const SocialLoginComponent = styled.div`
    width: 90%;
    margin: 20px auto;
    border-top: 0.5px solid #ccc;

`
const SocialDesc = styled.div`
    width: 50%;
    display: inline-block;
    text-align: right;
    font-size: 1em;
`
const SocialLogoComponent = styled.div`
    width: 50%;
    display: inline-block;
    text-align: left;
    margin: 20px auto;
`
const FaceBookLogo = styled.button`
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #3C5A99;
    color: white;
    padding: auto;
    cursor: pointer;
    font-size: 18px;
    margin: 10px;
`
const GoogleLogo = styled.button`
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #DB4437;
    color: white;
    border-radius: 100%;
    cursor: pointer;
    font-size: 18px;
`
export default class SignUp extends Component {
    state = {
        google: {
            id: '',
            name: '',
            email: '',
            photo: '',
            token: '',
            auth: false
        },
        facebookAuth: false
    }
    googleUserValues = (values) => {
        const {id, name, photo, email, token} = values
        this.setState({
            google: {
                id,
                name,
                email,
                photo,
                token,
                auth: true
            }
        })
    }
  renderModalContent(){
    if(this.state.google.auth){
        const {id, photo, name, email, token} = this.state.google
        const values = {id,photo,firstname: name,email,token}
        return( 
                <SocialAuthentication values={values} social={'Google'} />
        )
    }
    return(
        <ModalContent>
            <TitleComponent>
                    <Title>Welcome to HomeBuy</Title>
                    <CloseButton><i class="fal fa-times" onClick={() => this.props.close()}></i></CloseButton>
                </TitleComponent>
                <LoginSignUpform/>
                <SocialLoginComponent close={() => this.props.close()}>
                <SocialDesc>Or Connect with:&nbsp;</SocialDesc>
                    <SocialLogoComponent>
                        <GoogleSignUp  sendValues={this.googleUserValues}/>
                    </SocialLogoComponent>
                </SocialLoginComponent>
        </ModalContent>
    )
  }
  renderPageContent(){
      return(
          <PageContent>
              <TitleComponent>
                    <Title>Welcome to HomeBuy</Title>
                </TitleComponent>
                <LoginSignUpform/>
                <SocialLoginComponent>
                    <SocialDesc>Or Connect with:&nbsp;</SocialDesc>
                    <SocialLogoComponent>
                        <GoogleSignUp  sendValues={this.googleUserValues}/>
                    </SocialLogoComponent>
                </SocialLoginComponent>
          </PageContent>
      )
  }
  render() {
    var content = this.props.modal ? this.renderModalContent() : this.renderPageContent()
    return(
        <div>
            {content}
        </div>
    )
  }
}
