import React,{Component} from 'react'
import NavBar from './Layout/NavBar/NavBar';
import Home from './Pages/Home'
import SignUp from './Pages/Signup'
import {BrowserRouter as Router, Route} from 'react-router-dom'
class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(

            <Router>
                <NavBar/>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" exact component={SignUp} />
            </Router>
        )
    }
}
export default App