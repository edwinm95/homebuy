import React, {Component, Fragment} from 'react'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import { verify } from 'crypto';
import SocialAuthentication from '../../Pages/SocialAuthentication'
import {withApollo} from 'react-apollo'
const VERIFY_TOKEN = gql`
    mutation VerifyGoogleToken($token: String!){
        verifyGoogleToken(token: $token)
    }
`
class GoogleSignUp extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount = () => {
            if(window.gapi){
                window.gapi.signin2.render('my-signin2', {
                    'width': 240,
                    'height': 32,
                    'longtitle': true,
                    'theme': 'dark',
                    'onsuccess': this.onSuccess,
                    'onfailure': (error) => {
                        console.log(error)
                    }   
    
                })
            }
    }
    onSuccess = async (googleUser) => {
        var profile = googleUser.getBasicProfile()
        const id = profile.getId()
        const name = profile.getName()
        const photo = profile.getImageUrl()
        const email = profile.getEmail()
        const token = googleUser.getAuthResponse().id_token
        const requestBody = {
            query: 
            `mutation {
                verifyGoogleToken(token: "${token}"){
                    userId
                    token
                    tokenExpiration
                    googleUserFound
                }
            }
            `
        }
        const url =  'http://localhost:5000/graphql'
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json()
        let googleUserFound
        if(responseData.data){
            googleUserFound = responseData.data.verifyGoogleToken.googleUserFound
        }
        if(googleUserFound === false){
            var values = {
                id,
                name,
                photo,
                email,
                token
            }
            this.props.sendValues(values)
        }else{
            const{token} = responseData.data.verifyGoogleToken
            localStorage.setItem('token',token)
            this.props.client.resetStore()
            window.location.reload()
        }
        console.log(responseData)

    }
    onFailure = (error) => {
        console.log(error)
    }   
    render() {
        return(
            <Fragment>
                <div id="my-signin2"></div>
            </Fragment>
        )
    }
}
export default withApollo(GoogleSignUp)