import React, {Component, Fragment} from 'react'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import { verify } from 'crypto';
import {google} from '../../../config/keys'
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
            try{    
                if(window.gapi){
                    const element = document.getElementById('googlebutton')
                    var auth2 = window.gapi.auth2.init({
                        client_id: google.CLIENT_ID,
                        cookiepolicy: 'single_host_origin',
                        // Request scopes in addition to 'profile' and 'email'
                        //scope: 'additional_scope'
                      });
                    auth2.attachClickHandler(element,{}, this.onSuccess, this.onFailure)
                }
            }catch(error){
                console.log(error)
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
                <div id="googlebutton">
                    <i class="fab fa-google"></i>
                </div>
            </Fragment>
        )
    }
}
export default withApollo(GoogleSignUp)