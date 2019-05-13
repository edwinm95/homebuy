import React, {Component} from 'react'
import { connect } from 'react-redux'
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