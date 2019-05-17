import React,{Component} from 'react'
import NavBar from './Layout/NavBar/';
import Home from './Pages/Home'
import {connect} from 'react-redux'
import SignUp from './Pages/Signup'
import Buy from './Pages/Buy'
import Sell from './Pages/Sell'
import Rent from './Pages/Rent'
import ListRental from './Pages/ListRental'
import MyAcoount from './Pages/MyAccount/'
import Settings from './Pages/Settings'
import Properties from './Pages/Properties'
import * as actions from '../actions/token'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
class App extends Component{
    componentDidMount(){
        if(this.props.token !== null){
            this.props.refreshToken(this.props.token)
        }
    }
    render(){
        return(
            <Router>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    {this.props.token && (<Redirect from="/signup" to="/" />)}
                    <Route path="/signup"  component={SignUp} />
                    <Route path="/buy" component={Buy} />
                    {!this.props.token && (<Redirect from="/sell" to="/" />)}
                    <Route path="/sell" component={Sell} />
                    <Route path="/rent" component={Rent} />
                    {!this.props.token && (<Redirect from="/listrental" to="/" />)}
                    <Route path="/listrental" component={ListRental} /> 
                    {!this.props.token && (<Redirect from="/myaccount" to="/" />)}
                    <Route path="/myaccount" component={MyAcoount} />
                    {!this.props.token && (<Redirect from="/settings" to="/" />)}
                    <Route path="/settings" component={Settings} />
                    {!this.props.token && (<Redirect from="/settings" to="/" />)}
                    <Route path="/myproperties" component={Properties} />
                </Switch>

            </Router>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps,actions)(App)