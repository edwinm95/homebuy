import React, { Component } from 'react'
import styled from 'styled-components'
import {maxDeviceWidth} from '../../DeviceLayout'
import {size} from '../../DeviceLayout'
import MediaQuery from 'react-responsive'
import SignUp from '../../Modal/SignUp'
import {Link} from 'react-router-dom'
const NavBarComponent = styled.div`
    width: 100%;
    height: 60px;
    margin: auto;
`
const NavBarLinkComponent = styled.div`
  float: left;
  font-size: 16px;
  width: 33.33%
`
const LeftLinkComponent = styled.div`
  cursor: pointer;
  display: inline-block;
  margin: 20px 10px;
`
const Logo = styled.div`
  cursor: pointer;
  float: center;
  margin: 20px 10px;
  text-align: center;
  font-size: 25px;
  font-weight: 600;
`
const RightLinksComponent = styled.div`
  cursor: pointer;
  display: inline-block;
  margin: 20px 10px;
  float: right
`
const links = {
  buy:{
    text: 'Buy'
  },
  rent:{
    text: 'Rent'
  },
  logo:{
    text:'HomeBuy'
  },
  login_signup:{
    text:`Login/SignUp`
  },
  sell:{
    text: 'Sell'
  },
  rental:{
    text: 'List Rental'
  },
}
class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      width: '0',
      display: 'none',
      showLoginSignUp: false,
    }
    this.renderDrawer = this.renderDrawer.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.showLoginSignupModal = this.showLoginSignupModal.bind(this)
    this.renderLoginSignUp = this.renderLoginSignUp.bind(this);
    this.closeLoginSignupModal = this.closeLoginSignupModal.bind(this);
  }
  showLoginSignupModal(){
    this.setState({showLoginSignUp: true})
  }
  closeLoginSignupModal(){
    this.setState({showLoginSignUp: false})
  }
  renderLoginSignUp(){
    const {showLoginSignUp} = this.state
    if(showLoginSignUp){
      return(
        <SignUp close={this.closeLoginSignupModal}/>
      )
    }

    return(
      <div>
      
      </div>
    )
  }
  renderDesktopNavBar(){
    return(
      <NavBarComponent>
        <NavBarLinkComponent>
          <LeftLinkComponent>
            {links.buy.text}
          </LeftLinkComponent>
          <LeftLinkComponent>
            {links.rent.text}
          </LeftLinkComponent>
        </NavBarLinkComponent>

        <NavBarLinkComponent>
          <Logo>
            {links.logo.text}
          </Logo>
        </NavBarLinkComponent>

        <NavBarLinkComponent>
          <RightLinksComponent onClick={() => this.showLoginSignupModal()}>
              {links.login_signup.text}
          </RightLinksComponent>
          <RightLinksComponent>
              {links.sell.text}
          </RightLinksComponent>
          <RightLinksComponent>
              {links.rental.text}
          </RightLinksComponent>
        </NavBarLinkComponent>

    </NavBarComponent>
    )
  }
  showDrawer(){
    this.setState({width: '60%', display: 'block'})
  }
  closeDrawer(){
    this.setState({width: '0', display: 'none'})
  }
  renderDrawer(){
  const DrawerComponent = styled.div`
    display: ${this.state.display}; 
    position: fixed; 
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    background-color: rgba(0,0,0,0.7); 
    transition: 0.5s;
  ` 
  const Drawer = styled.div`
    height: 100%;
    overflow-x: hidden;
    background-color: white;
    width: ${this.state.width};
  `
  const DrawerLink = styled.div`
    margin: 10px 0;
    padding: 5px;
    border-bottom: 1px solid black;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
  `
  const CloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    margin: auto;
    color: white;
    font-size: 30px;
  `
  return(
    <DrawerComponent>
      <Drawer>
        <DrawerLink>
          <Link style={{textDecoration: 'none', color: 'black'}} to='/signup' onClick={() => this.closeDrawer()} >{links.login_signup.text}</Link>
        </DrawerLink>
        <DrawerLink>
          {links.buy.text}
        </DrawerLink>
        <DrawerLink>
          {links.rent.text}
        </DrawerLink>
        <DrawerLink>
          {links.sell.text}
        </DrawerLink>
        <DrawerLink>
          {links.rental.text}
        </DrawerLink>
      </Drawer>
      <CloseButton>
        <i class="fal fa-times"></i>
      </CloseButton>
    </DrawerComponent>
  )
  }
  renderMobileNavBar(){
    return(
      <div>
        <NavBarComponent>
          <NavBarLinkComponent>
            <LeftLinkComponent>
              <i class="fas fa-bars" onClick={() => this.showDrawer()}></i>
            </LeftLinkComponent>
          </NavBarLinkComponent>
          <NavBarLinkComponent>
            <Logo>
              HomeBuy
            </Logo>
          </NavBarLinkComponent>
          {this.renderDrawer()}
        </NavBarComponent>
      </div>
    )
  }
  render() {
    return (
      <div>
        <MediaQuery maxDeviceWidth={size.tablet}>
          {this.renderMobileNavBar()}
        </MediaQuery>
        <MediaQuery minDeviceWidth={size.laptop}>
          {this.renderDesktopNavBar()}
        </MediaQuery>
        {this.renderLoginSignUp()}
      </div>
    )
  }
}
export default NavBar
