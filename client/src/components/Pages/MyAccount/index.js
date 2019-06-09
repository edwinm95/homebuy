import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import './MyAccount.css'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
const GET_USER = gql`
    query GetUser {
        getUser{
            _id
            firstname
            lastname
            username
            email
            userphoto
            dateCreated
            industryProfressional
            profressionalcategory
            profressionaltitle
            buisnessname
            buisnessaddress
            buisnesscity
            buisnessstate
            buisnesszipcode
            buisnessphone
        }
    }
`
const EditButton = styled.a`
    background-color: green;
    color: white;
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    height: 30px;
    display: block;
    padding: 2px 0;
    text-align :center;
    box-sizing: border-box;
    :hover{
        border: 1px solid green;
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
    renderProfressionalFields(values){
        const {
                profressionalcategory,
                 profressionaltitle, 
                 buisnessname, 
                 buisnessaddress, 
                 buisnesscity, 
                 buisnessstate, 
                 buisnesszipcode, 
                 buisnessphone
            } = values
        return(
            <Fragment>
                <p>Profressional Category: {profressionalcategory}</p>
                <p>Profressional Title: {profressionaltitle}</p>
                <p>Buisness Name: {buisnessname}</p>
                <p>Address: {buisnessaddress}</p>
                <p>City: {buisnesscity}</p>
                <p>State: {buisnessstate}</p>
                <p>Zip Code {buisnesszipcode}</p>
                <p>Phone: {buisnessphone}</p>
            </Fragment>
        )
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
                    const {_id, firstname, lastname, username, dateCreated, email, userphoto, industryProfressional} = data.getUser
                    var array = dateCreated.split(' ')
                    const date = {
                        month: array[1],
                        date: array[2],
                        year: array[3]
                    }
                    console.log(date)
                    return(
                        <div className="component">
                            <div className="profilepicturecomponent">
                                <div className="profilepicture">
                                </div>
                            </div>
                            <div className="usernamecomponent">
                                <h1>{`${username}`}</h1>
                            </div>
                            <div className="rightcomponent">
                            <div className="editbuttoncomponent">
                                        <EditButton href="/settings">Edit</EditButton>
                                     </div>
                                 <div className="userinfocomponent">
                                     <h3>Personal Information</h3>
                                     <p>Name: {`${firstname} ${lastname}`}</p>
                                     <p>Email: {email}</p>
                                     <p>Member Since: {`${date.month}-${date.date}-${date.year}`}</p>
                                     {industryProfressional === true ? this.renderProfressionalFields(data.getUser) : <div></div>}
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