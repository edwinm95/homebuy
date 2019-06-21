import React, { Component } from 'react'
import styled from 'styled-components'
import {size} from '../../DeviceLayout'
import MediaQuery from 'react-responsive'
import SignUp from '../../Modal/SignUp/'
import {Link, NavLink} from 'react-router-dom'
import './navbar.css'
import { Query } from 'react-apollo'
import {IS_LOGGED_IN} from '../../../query'
const NavBarComponent = styled.div`
    width: 100%;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-bottom: 1px solid #ccc;
    background-color: #FFFFFF;
`
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
const NavBarLinkComponent = styled.div`
  float: left;
  font-size: 1em;
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
  margin: 10px;
  text-align: center;
  font-size: 2em;
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
  myproperties: {
    text: 'My Properties'
  },
  settings: {
    text: 'Settings'
  },
  signout: {
    text: 'Sign Out'
  }
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
  signout = (client) => {
    if(window.gapi){
      var auth2 = window.gapi.auth2.getAuthInstance()
      auth2.signOut().then(() => {
      })
    }
    localStorage.removeItem('token')
    client.resetStore()
    window.location.reload()
  }
  renderDesktopNavBar = (data,client) => {
          return(
            <NavBarComponent>
            <NavBarLinkComponent>
              <LeftLinkComponent>
                <Link to="/rent"  className="links">{links.rent.text}</Link>
              </LeftLinkComponent>
            </NavBarLinkComponent>
    
            <NavBarLinkComponent>
              <Logo>
                <Link to="/" className="logo">{links.logo.text}</Link>
              </Logo>
            </NavBarLinkComponent>
    
            <NavBarLinkComponent onMouseLeave={this.hideSubMenu}>
              <RightLinksComponent>
                {data.isLoggedIn ? (<Link to="/myaccount" onMouseEnter={this.showSubMenu} className="links">{links.my_account.text}</Link>): 
                    (<a onClick={() => this.showLoginSignupModal()} className="links">{links.login_signup.text}</a>)
                    }
                {this.state.showAccountSubMenu && ( 
              <SubMenuComponent>
                <Links><Link to ="/myproperties" className="links">My Properties</Link></Links>
                <Links><Link to="/settings" className="links">Settings</Link></Links>
                <Links onClick={() => {
                  this.signout(client)
                }}>Sign out</Links>
               </SubMenuComponent>
                )} 
              </RightLinksComponent>
              <RightLinksComponent>
                  {data.isLoggedIn ? (<Link to ="/sell"  className="links">{links.sell.text}</Link>): 
                  (<Link className="links" onClick={() => this.showLoginSignupModal()} >{links.sell.text}</Link>)
                  }
              </RightLinksComponent>
              <RightLinksComponent>
              {data.isLoggedIn ? (<Link to ="/listrental/new"  className="links">{links.rental.text}</Link>): 
                  (<Link className="links" onClick={() => this.showLoginSignupModal()} >{links.rental.text}</Link>)
                  }
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
  renderDrawer = (data,client) => {
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
    z-index: 4999;
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
      {data.isLoggedIn === false && (<DrawerLink>
          <Link style={{textDecoration: 'none', color: 'black'}} to='/signup' onClick={this.closeDrawer} >{links.login_signup.text}</Link>
        </DrawerLink>)}
        <DrawerLink>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/buy' onClick={this.closeDrawer} >{links.buy.text}</Link>
        </DrawerLink>
        <DrawerLink>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/rent' onClick={this.closeDrawer} >{links.rent.text}</Link>
        </DrawerLink>
        <DrawerLink>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/sell' onClick={this.closeDrawer} >{links.sell.text}</Link>
        </DrawerLink>
        <DrawerLink>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/listrental' onClick={this.closeDrawer} >{links.rental.text}</Link>
        </DrawerLink>
        {data.isLoggedIn && (<DrawerLink>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/myaccount' onClick={this.closeDrawer} >{links.my_account.text}</Link>
        </DrawerLink>)}
        {data.isLoggedIn && (<DrawerLink>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/myproperties' onClick={this.closeDrawer} >{links.myproperties.text}</Link>
        </DrawerLink>)}
        {data.isLoggedIn && (<DrawerLink>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/settings' onClick={this.closeDrawer} >{links.settings.text}</Link>
        </DrawerLink>)}
        {data.isLoggedIn && (<DrawerLink>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/settings' 
        onClick={ () => {
          this.signout(client)
        }} >{links.signout.text}</Link>
        </DrawerLink>)}
      </Drawer>
      <CloseButton>
        <i class="fal fa-times" onClick={this.closeDrawer}></i>
      </CloseButton>
    </DrawerComponent>
  )
  }
  renderMobileNavBar(data,client){
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
                <Link to="/" className="logo">{links.logo.text}</Link>
              </Logo>
          </NavBarLinkComponent>
          {this.renderDrawer(data,client)}
        </NavBarComponent>
      </div>
    )
  }
  render() {
    return (
      <Query query={IS_LOGGED_IN}>
      {({client, data, loading, error}) => {
          if(loading){
            return<div></div>
          }
          if(error){
            return<div>{error}</div>
          }
            return(
              <div>
              <MediaQuery maxDeviceWidth={size.tablet}>
                {this.renderMobileNavBar(data,client)}
              </MediaQuery>
              <MediaQuery minDeviceWidth={size.laptop}>
                {this.renderDesktopNavBar(data,client)}
              </MediaQuery>
              {this.renderLoginSignUp(data)}
            </div>
            )
      }}
      </Query>
    )
}
}
export default NavBar
