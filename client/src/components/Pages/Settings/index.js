import React, { Component, Fragment } from 'react'
import Settings from '../Settings';
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import SettingsComponent from './SettingsComponent'
import {Redirect} from 'react-router-dom'
const GET_USER = gql`
  query GetUser {
    getUser{
      firstname
      lastname
      username
      email
      userphoto
      profressionalcategory
      profressionaltitle
      industryProfressional
      buisnessname
      buisnessaddress
      buisnesscity
      buisnessstate
      buisnesszipcode
      buisnessphone
      buisnessfacebook
      buisnesstwitter
      buisnesslinkedin
      buisnesswebsite
    }
  }
`
const SUBMIT = gql`
  mutation EditUser($userInput: UserInput){
    editUser(userInput: $userInput)
  }
`
class SettingsContainer extends Component {
    render() {
        return (
            <Query query={GET_USER}>
            {({data,loading,error}) => {
                if(loading){
                    return(<div></div>)
                }
                if(error){
                    return (<Redirect to="/" />)
                }
                const values = data.getUser
                    return (
                        <Mutation mutation={SUBMIT}>
                            {(editUser, data) => {
                                return(<SettingsComponent values={values} />)
                            }}

                        </Mutation>
                        )
            }}
            </Query>
        )
    }
}

export default SettingsContainer