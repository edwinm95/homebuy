import React, {Fragment, Component} from 'react'
import './message.css'
import styled from 'styled-components'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'

const CREATE_MESSAGE = gql`
    mutation CreateMessage($messageInput: MessageInput){
        createMessage(messageInput: $messageInput)
    }
`
class Message extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: ''
        }
    }
    componentDidMount = () => {
        window.addEventListener('click', this.handleClose, false)
    }
    handleClose = (event) => {
        if(this.modalbackground === event.path[0]){
            this.props.close()
        }
    }
    renderRequired(){
        const RequiredComponent = styled.div`
            color: red;
            font-size: 0.7em;
            display: inline-block;
            padding: 0.5em;
        `
        return<RequiredComponent>*</RequiredComponent>
    }
    handleChange = (event) => {
        this.setState({message: event.currentTarget.value})
    }
    handleSubmit = (createMessage) => {
        const {createdBy, _id} = this.props.property
        const messageInput = {
            to: createdBy,
            body: this.state.message,
            property: _id
        }
        createMessage({variables: {messageInput}})
    }
    handleCompletion = (e) => {
        console.log(e)
        this.props.close()
    }
    render(){
        return(
            <Mutation 
            mutation={CREATE_MESSAGE}
            onCompleted={this.handleCompletion}
            >
            {(createMessage) => {
                return(
                    <form onSubmit={(event) => {
                        event.preventDefault() 
                        this.handleSubmit(createMessage)
                    }}>
                        <div className="messagemodalbackground" ref={(ref) => this.modalbackground = ref}>
                            <div className="messagemodalcontent">
                                <div className="messagemodaltitle">
                                    Message
                                    <div className="closecontainer"><i class="fal fa-times" onClick={() => this.props.close()}></i></div>
                                </div>
                                <div className="messagetextcontainer">
                                    <div className="messagetexttitle">Message Body{this.renderRequired()}</div>
                                    <textarea className="messagetextarea" placeholder={'Enter message'} onChange={this.handleChange}></textarea>
                                </div>
                                <div className="messagebuttoncontainer">
                                    <button className="messagebutton" disabled={this.state.message === ''}>
                                        SEND MESSAGE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )
            }}
        </Mutation>
        )
    }
}

export default  Message