import React, {Component, Fragment} from 'react'
import Settings from '../Forms/Settings'
import styled from 'styled-components'
import gql from 'graphql-tag'
import {Mutation, ApolloConsumer} from 'react-apollo'
const SocialAuthenticationContainer = styled.div`
        width: 60%;
        position: relative;
        height: 100%;
        left: 20%;
        top: 10%;
        max-height: calc(100vh - 210px);
        overflow-y: auto;
        background-color: white;

`
const CREATE_GOOGLE_USER = gql`
    mutation AddGoogleUser($userInput: UserInput){
        addGoogleUser(userInput: $userInput){
            userId
            token
            tokenExpiration
            googleUserFound
        }
    }
`
class SocialAuthentication extends Component {
    constructor(props){
        super(props)
    }
    getValues = (values,addGoogleUser) => {
        let googleToken;
        if(window.gapi){
            googleToken = window.gapi.auth2.getAuthInstance().currentUser.Ab.Zi.id_token
        }
        values['googleToken'] = googleToken
        addGoogleUser({variables: {userInput: values}})
    }
    render() {
        return(
            <ApolloConsumer>
                {(client) => (
                    <Mutation mutation={CREATE_GOOGLE_USER}
                onError={(error) => {
                    console.log(error)
                }}
                onCompleted={({addGoogleUser}) => {
                    const{token} = addGoogleUser
                    localStorage.setItem('token',token)
                    client.resetStore()
                    window.location.reload()
                }}
                >
                {(addGoogleUser, {data}) => {
                    return (
                        <SocialAuthenticationContainer>
                            <Settings values={this.props.values} sendValues={(values) => this.getValues(values,addGoogleUser)} />
                        </SocialAuthenticationContainer>
                    )
                }}
                </Mutation>
                )
                }
            </ApolloConsumer>
        )
    }
}

export default SocialAuthentication