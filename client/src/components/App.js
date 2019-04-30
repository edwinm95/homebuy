import React,{Component} from 'react'
import NavBar from './Layout/NavBar/NavBar';
import Home from './Pages/Home'
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
            </Router>
        )
    }
}
export default App