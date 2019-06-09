import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import {Query, Mutation} from 'react-apollo'
import ListRentalComponent from './ListRentalComponent'
import gql from 'graphql-tag'
const GETUSER = gql`
    query GetUser{
        getUser{
            firstname
            lastname
            email
        }
    }
`
class ListRental extends Component {
    constructor(props){
        super(props)
    }
    render(){
       return(
           <Query query={GETUSER}>
            {({data,loading,error}) => {
                if(loading){
                    return <div></div>
                }
                if(error){
                    return <Redirect to="/" />
                }
                return (
                    <div>
                        <ListRentalComponent values={data.getUser} />
                    </div>
                )
            }}

           </Query>
       )
    }
}
export default ListRental