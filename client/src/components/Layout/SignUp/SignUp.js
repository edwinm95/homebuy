import React, { Component } from 'react'
import styled from 'styled-components'
import LoginSignUpform from '../../Forms/Login_SignUp/form'
import {maxDeviceWidth, minDeviceWidth} from '../../DeviceLayout'
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
const SocialLoginComponent = styled.div`
    width: 90%;
    margin: 20px auto;
    border-top: 0.5px solid #ccc;

`
const SocialDesc = styled.div`
    width: 50%;
    display: inline-block;
    text-align: right;
    font-size: 22px;
`
const SocialLogoComponent = styled.div`
    width: 50%;
    display: inline-block;
    text-align: left;
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
  renderModalContent(){
    return(
        <ModalContent>
            <TitleComponent>
                    <Title>Welcome to HomeBuy</Title>
                    <CloseButton><i class="fal fa-times" onClick={() => this.props.close()}></i></CloseButton>
                </TitleComponent>
                <LoginSignUpform/>
                <SocialLoginComponent>
                    <SocialDesc>or connect with:</SocialDesc>
                    <SocialLogoComponent>
                        <FaceBookLogo><i class="fab fa-facebook-f"></i></FaceBookLogo>
                        <GoogleLogo><i class="fab fa-google"></i></GoogleLogo>
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
                    <SocialDesc>or connect with:</SocialDesc>
                    <SocialLogoComponent>
                        <FaceBookLogo><i class="fab fa-facebook-f"></i></FaceBookLogo>
                        <GoogleLogo><i class="fab fa-google"></i></GoogleLogo>
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
