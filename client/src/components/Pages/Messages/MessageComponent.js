import React,{Component, Fragment} from 'react'
import TimeAgo from 'react-timeago'
import {Link} from 'react-router-dom'
class MessageComponent extends Component {
    state = {
        latestMessage: null,
        timezonearray: null
    }
    renderMessages = () => {
        if(this.props.values !== undefined && this.props.values !== null){
            console.log(this.props.values)
            const messageReferenceArray = this.props.values
            const messageArray = messageReferenceArray.map((messageReference) => {
                 var recentDate = 0
                 var body = ''
                 var userInfo = null
                 messageReference.messages.forEach((message) => {
                     const messageDate = parseInt(message.timestamp)
                     if(messageDate > recentDate){
                         recentDate = messageDate
                         body = message.body
                     }
                 })
                 messageReference.recepients.forEach((user) => {
                   if(user._id !== this.props.userId){
                    userInfo = user
                   }
                 })
                 const date = new Date(recentDate)
                 const {streetName, city, state, zipcode} = messageReference.property.address
                 const address = `${streetName}, ${city}, ${state} ${zipcode}` 
                 const {photos} = messageReference.property
                 const propertyId = messageReference.property._id
                 const style = {
                     background: `url(http://localhost:5000/images/listing/${propertyId}/${photos[0]})`,
                     backgroundPosition: '50% 50%',
                     backgroundSize: 'cover',
                 }
                 return(
                    <div className="messages">
                        <div className="messagespropertyphotocomponent" style={style}>
                        </div>
                        <div className="messagespropertyaddresscomponent">
                                <Link className="messagespropertyaddresslink" to={`/listing/${propertyId}`}>{address}</Link>
                        </div>
                        <div className="messagebody">
                            {body}
                        </div>
                        <div className="messagetimecomponent">
                            <div className="messagetime">
                                <TimeAgo date={date}/>
                            </div>
                            <div className="messageusername">
                                {userInfo.username}
                            </div>
                        </div>
                    </div>
                 )
             })
             return messageArray
        }
        return<div></div>
    }
    render(){
        return(
            <div className="messagesmaincontainer">
                <h1 className="messagetitle">Messages</h1>
                <div className="messagescomponent">
                    {this.renderMessages()}
                </div>
            </div>
        )
    }
}

export default MessageComponent