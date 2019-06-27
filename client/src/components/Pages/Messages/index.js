import React,{Component,Fragment} from 'react'
import MessageComponent from './MessageComponent'
import './Messages.css'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
const GETMESSAGE = gql`
    query GetMessage{
        getMessage {
            _id
            messages {
                _id
                body
                timestamp
            }
            property {
                _id
                address
                photos
            }
            recepients {
                _id
                username
            }
        }
    }
`
class Messages extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Query query={GETMESSAGE}>
                {({data, loading, error, client}) => {
                    if(error){
                        console.log(error)
                        return(
                            <div>
                                {error}
                            </div>
                            )
                    }
                    if(loading){
                        return(<div></div>)
                    }
                    const {userId} = client.cache.data.data.ROOT_QUERY
                    const{getMessage} = data
                    if(getMessage) {
                        return(
                            <Fragment>
                                <MessageComponent values={getMessage} userId={userId} />
                            </Fragment>
                        )
                    }
                }}
            </Query>
        )
    }
}
export default Messages 