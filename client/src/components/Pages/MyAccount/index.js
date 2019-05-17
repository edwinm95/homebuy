import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import './MyAccount.css'
class MyAccount extends Component {
    state = {
        _id: null,
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        userphoto: null
    }
    componentDidMount(){
        this.getUserInformation()
    }
    getUserInformation =  async () => {
        const {token} = this.props
        const requestBody = {
            query: `
                query {
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
        }
        try{
            const response = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const responseData = await response.json()
            const {errors, data} = responseData
            if(errors){
                throw new Error(errors)
            }else{
                const {_id, firstname, lastname, username, email, userphoto} = data.getUser
                this.setState({_id, firstname, lastname, username, email, userphoto})
            }
        }catch(error){
            throw error
        }
    }
    render(){
        return(
            <div>
                {this.renderProfile()}
            </div>
        )
    }
    redirectToSettings(){
        return <Redirect to="/settings"/>
    }
    renderProfile(){
        return(
            <div className="component">
                <div className="profilepicturecomponent">
                    <div className="profilepicture">
                    </div>
                </div>
                <div className="usernamecomponent">
                    <h1>John Doe</h1>
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
    }
}
const mapStateToProps = state => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(MyAccount)