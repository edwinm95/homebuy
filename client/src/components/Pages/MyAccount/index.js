import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import './MyAccount.css'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
const GET_USER = gql`
    query GetUser {
        getUser{
            _id
            firstname
            lastname
            username
            email
            userphoto
        }
    }
`
class MyAccount extends Component {
    state = {
        _id: null,
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        userphoto: null
    }
    render() {
        return(
            <Query query={GET_USER}>
            {({data,loading,error}) => {
                    if(loading) return (<div></div>)
                    if(error){
                        console.log(error) 
                        return (<Redirect to="/" />)
                    } 
                    const {_id, firstname, lastname, username, email, userphoto} = data.getUser
                    return(
                        <div className="component">
                            <div className="profilepicturecomponent">
                                <div className="profilepicture">
                                </div>
                            </div>
                            <div className="usernamecomponent">
                                <h1>{`${firstname} ${lastname}`}</h1>
                            </div>
                            <div className="rightcomponent">
                            <div className="editbuttoncomponent">
                                         <a className="editbutton" href="/settings">Edit</a>
                                     </div>
                                 <div className="userinfocomponent">
                                     <h3>Personal Information</h3>
                                     <p>Member Since: 04/03/2019</p>
                                 </div>
                            </div>
                        </div>
                    )
            }}
            </Query>
        )
    }
}
export default MyAccount