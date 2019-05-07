import React,{Component} from 'react'
import NavBar from './Layout/NavBar/';
import Home from './Pages/Home'
import SignUp from './Pages/Signup'
import Buy from './Pages/Buy'
import Sell from './Pages/Sell'
import Rent from './Pages/Rent'
import ListRental from './Pages/ListRental'

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(

            <Router>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signup"  component={SignUp} />
                    <Route path="/buy" component={Buy} />
                    <Route path="/sell" component={Sell} />
                    <Route path="/rent" component={Rent} />
                    <Route path="/listrental" component={ListRental} /> 
                </Switch>

            </Router>
        )
    }
}
export default App