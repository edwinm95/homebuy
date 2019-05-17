import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {size} from '../../DeviceLayout'
import MediaQuery from 'react-responsive'
import SignUp from '../../Modal/SignUp/'
import {Link, NavLink} from 'react-router-dom'
import * as actions from '../../../actions/token/'
import './navbar.css'
const NavBarComponent = styled.div`
    width: 100%;
    height: 60px;
    margin: auto;
    border-bottom: 1px solid #ccc;
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
  :hover{
    color: green
  }
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
  :hover{
    color: green;
  }
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
  my_account:{
    text: 'My Account'
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
      showAccountSubMenu: false
    }
    this.renderDrawer = this.renderDrawer.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.showLoginSignupModal = this.showLoginSignupModal.bind(this)
    this.renderLoginSignUp = this.renderLoginSignUp.bind(this);
    this.closeLoginSignupModal = this.closeLoginSignupModal.bind(this);
  }
  showSubMenu = () => {
    this.setState({showAccountSubMenu: true})
  }
  hideSubMenu = () => {
    this.setState({showAccountSubMenu: false})
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
        <SignUp close={this.closeLoginSignupModal} modal/>
      )
    }

    return(
      <div>
      
      </div>
    )
  }
  signout = () => {
    this.props.removeToken()
    window.location.reload()
  }
  renderAccountSubmenu(){
    const SubMenuComponent = styled.div`
      position: fixed;
      right: 0;
      top: 4.2em;
      border: 0.5px solid #ccc;
      margin: auto;
      width: 20%;
      background-color: white;
      z-index: 1;
    `
    const Links = styled.div`
      margin: 1em;
      padding: 5px;
      cursor: pointer;
      :hover{
        color: green;
      }
    `
    return(
      <SubMenuComponent onMouseLeave={this.hideSubMenu}>
        <Links><a href ="/myproperties" className="links">My Properties</a></Links>
        <Links><a href="/settings" className="links">Settings</a></Links>
        <Links onClick={this.signout}>Sign out</Links>
      </SubMenuComponent>
    )
  }
  renderDesktopNavBar(){
    return(
      <NavBarComponent>
        <NavBarLinkComponent>
          <LeftLinkComponent>
            <a href="/buy" className="links">{links.buy.text}</a>
          </LeftLinkComponent>
          <LeftLinkComponent>
            <a href="/rent"  className="links">{links.rent.text}</a>
          </LeftLinkComponent>
        </NavBarLinkComponent>

        <NavBarLinkComponent>
          <Logo>
            <a href="/" className="logo">{links.logo.text}</a>
          </Logo>
        </NavBarLinkComponent>

        <NavBarLinkComponent >
          <RightLinksComponent>
            {this.props.token ? (<a href="/myaccount" onMouseEnter={this.showSubMenu} className="links">{links.my_account.text}</a>): 
                (<a onClick={() => this.showLoginSignupModal()} className="links">{links.login_signup.text}</a>)
                }
          </RightLinksComponent>
          <RightLinksComponent>
              {this.props.token ? (<a href ="/sell"  className="links">{links.sell.text}</a>): 
              (<a className="links" onClick={() => this.showLoginSignupModal()} >{links.sell.text}</a>)
              }
          </RightLinksComponent>
          <RightLinksComponent>
              <a href="/listrental" className="links">{links.rental.text}</a>
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
          <a style={{textDecoration: 'none', color: 'black'}} href='/signup' onClick={this.closeDrawer} >{links.login_signup.text}</a>
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
        <i class="fal fa-times" onClick={this.closeDrawer}></i>
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
          {this.state.showAccountSubMenu && (this.renderAccountSubmenu())} 
        </MediaQuery>
        {this.renderLoginSignUp()}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {token: state.token}
}
export default connect(mapStateToProps,actions)(NavBar)
