import React,{Component} from 'react'
import NavBar from './Layout/NavBar/';
import Home from './Pages/Home'
import { google } from '../config/keys'
import {connect} from 'react-redux'
import SignUp from './Pages/Signup'
import Buy from './Pages/Buy'
import Sell from './Pages/Sell'
import Rent from './Pages/Rent'
import ListRental from './Pages/ListRental/'
import MyAcoount from './Pages/MyAccount/'
import Settings from './Pages/Settings/'
import Properties from './Pages/Properties'
import * as actions from '../actions/token'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloProvider } from 'react-apollo'
import { typeDefs, resolvers } from '../graphql/resolvers'
import gql from 'graphql-tag';
import { IS_LOGGED_IN } from '../query/'
import {Query} from 'react-apollo'
import jwtDecode from 'jwt-decode'
const httpLink = createUploadLink({
    uri: 'http://localhost:5000/graphql',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
const cache = new InMemoryCache()
const client = new ApolloClient({
   cache,
   link: httpLink,
   typeDefs,
   resolvers,
})
cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token')
    }
})
class App extends Component{
    componentDidMount(){
        if(window.gapi){
            window.gapi.load('auth2', function(){
                window.gapi.auth2.init({
                    client_id: `${google.CLIENT_ID}`,
                    cookiepolicy: 'single_host_origin'
                })
            })
        }
    }
    render(){
        return(
            <ApolloProvider client={client}>
                <Query query={IS_LOGGED_IN}> 
                {({data}) => {
                    const token = localStorage.getItem('token')
                    if(token){
                        if(token === null || token === undefined){
                            localStorage.removeItem('token')
                        }else{
                            var decoded = jwtDecode(token)
                            if(decoded.exp < new Date().getTime() / 1000 ){
                                localStorage.removeItem('token')
                                var auth2 = window.gapi.auth2.getAuthInstance()
                                auth2.signOut().then(() => {
                                })
                                client.resetStore()
                               }
                        }
                    }
                   
                    return(
                        <Router>
                        <NavBar/>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            {data.isLoggedIn && (<Redirect from="/signup" to="/" />)}
                            <Route path="/signup"  component={SignUp} />
                            <Route path="/buy/:location" component={Buy} />
                            <Route path="/buy" component={Buy} />
                            {!data.isLoggedIn && (<Redirect from="/sell" to="/" />)}
                            <Route path="/sell" component={Sell} />
                            <Route path="/rent" component={Rent} />
                            {!data.isLoggedIn && (<Redirect from="/listrental" to="/" />)}
                            <Route path="/listrental" component={ListRental} /> 
                            {!data.isLoggedIn && (<Redirect from="/myaccount" to="/" />)}
                            <Route path="/myaccount" component={MyAcoount} />
                            {!data.isLoggedIn && (<Redirect from="/settings" to="/" />)}
                            <Route path="/settings" component={Settings} />
                            {!data.isLoggedIn && (<Redirect from="/settings" to="/" />)}
                            <Route path="/myproperties" component={Properties} />
                        </Switch>
                    </Router>
                    )
                }  }
                </Query>
            </ApolloProvider>
        )
    }
}
export default App