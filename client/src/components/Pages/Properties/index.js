import React,{Component,Fragment} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import PropertiesComponent from './PropertiesComponent'
import './Properties.css'
const GET_USER_PROPERTIES = gql`
    query GetUserProperties {
        getUserProperties {
            _id
            photos
            address
        }
    }
`
class Properties extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Query query={GET_USER_PROPERTIES}>
                {({data,error}) => {
                    const {getUserProperties} = data
                    console.log(getUserProperties)
                    if(getUserProperties){
                        return(
                            <PropertiesComponent values={getUserProperties} />
                        )
                    }
                    return(
                        <div></div>
                    )
                    
                }}
            </Query>
        )
    }
}
export default Properties