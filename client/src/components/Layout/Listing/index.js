import React, {Component, Fragment} from 'react'
import SignUp from '../../Modal/SignUp'
import Message from '../../Modal/Message'
import { Query } from 'react-apollo';
import publicIp  from 'public-ip'
import {Redirect} from 'react-router-dom'
import './Listing.css'
import {IS_LOGGED_IN} from '../../../query'
class Listing extends Component {
    state = {
        property: null,
        renderLogin: false,
        renderMessage: false,
        editlisting: false,
        saves: []
    }
    componentDidMount = async () => {
        const ipAddress = await publicIp.v4()
        const {id} = this.props
        const requestBody = {
            query: 
            `mutation {
                addViews(propertyID: "${id}", ipAddress: "${ipAddress}"){
                    _id
                    rent
                    beds
                    baths
                    squarefeet
                    date
                    _id
                    photos
                    address
                    views
                    description
                    createdBy
                    saves
                }
            } 
            `
        }
        const url = 'http://localhost:5000/graphql'
        const response = await fetch(url,{
            body: JSON.stringify(requestBody),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        const responseData = await response.json()
        console.log(responseData)
        const {saves} = responseData.data.addViews
        this.setState({property: responseData.data.addViews, saves})
        if(this.props.modal){
            window.addEventListener("click",this.handleEvent,false)
        }
    }
    handleEvent = (e) => {
        if(this.background === e.path[0]){
            this.props.closeModal()
        }
    }
    handleEditListing = () => {
        this.setState({editlisting: true})
    }
    closeLoginSignupModal = () => {
        this.setState({renderLogin: false})
    }
    closeMessageModal = () => {
        this.setState({renderMessage: false})
    }
    renderLogin = () => {
        if(this.state.renderLogin){
            console.log('Rendering Login')
            return(
                <SignUp close={this.closeLoginSignupModal} modal />
            )
        }else{
            return(<div></div>)
        }
    }
    renderMessage = () => {
        if(this.state.renderMessage){
            console.log('Entered if statement')
            return(<Message close={this.closeMessageModal} property={this.state.property}/>)
        }else{
            return(<div></div>)
        }
    }
    handleMessage = (data) => {
        let renderLogin;
        let renderMessage;
        if(!data.isLoggedIn){
            renderLogin = true
            renderMessage = false;
        }else{
            renderLogin = false
            renderMessage = true
        }
        this.setState({renderLogin: renderLogin, renderMessage: renderMessage})
    }
    renderPhotos = (photos,_id) => {
        if(photos.length > 1){
            var array = []
            for(var i = 1; i < photos.length; i++){
                array.push(
                    <div className="listingotherphotos">
                        <img className="listingimage" src={`http://localhost:5000/images/listing/${_id}/${photos[i]}`}></img>
                    </div>
                    )
            }
            return array
        }else{
            return <div></div>
        }
    }
    handleSave = async (command,client) => {
        const {isLoggedIn} = client.cache.data.data.ROOT_QUERY
        const {_id} = this.state.property
        if(!isLoggedIn){
            this.setState({renderLogin: true})
        }else{
            const requestBody = {
                query : `
                    mutation {
                        handleSave(command: "${command}" , propertyID: "${_id}"){
                            saves
                        }
                    }
                `
            }
            const url = 'http://localhost:5000/graphql'
            const response = await fetch(url,{
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const responseData = await response.json()
            const {saves} = responseData.data.handleSave
            console.log(saves)
            this.setState({saves})
        }
    }
    renderSaves = (userId,saves,client) => {
        if(userId !== null){
            if(saves.indexOf(userId) !==  -1){
                return(
                    <i class="fas fa-heart" onClick={() => this.handleSave('unlike',client)}></i>
                )
            }
        }
        return(
            <i class="far fa-heart" onClick={() => this.handleSave('like',client)}></i>
        )
            
    }
    renderListingFields = (property,userId,data,client) => {
        const {rent, beds, baths, squarefeet, date, _id, photos, views, description, createdBy,} = property
        const {streetName, city, state, zipcode} = property.address
        const {saves} = this.state
        var intDate = parseInt(date,10)
        var newDate = new Date(intDate)
        return(
                <Fragment>
                    <div className="listinghouseinfo">
                        <div className="listinghousepricecontainer">
                            <div className="listinghouseprice">
                                    {`$ ${rent}`}
                            </div>
                            <div className="lisitinghousebed">
                                {`${beds} bd`}
                            </div>
                            <div className="lisitinghousebath">
                                {`${baths} ba`}
                            </div>
                            <div className="lisitinghousesqft">
                                {`${squarefeet} sqft`}
                            </div>
                            <div className="listingsaves">
                                <div className="listingsavesicon">
                                    {this.renderSaves(userId,saves,client)}
                                </div>{saves.length}
                            </div>
                        </div>
                        <div className="listinghouseaddress">
                            {`${streetName}, ${city}, ${state} ${zipcode}`}
                        </div>
                        {userId === createdBy ? (<button className="listingeditbutton" onClick={() => {
                            this.handleEditListing()
                        }}>Edit Listing</button>) : (<button className="lisitingmessageseller" onClick={() => {
                            this.handleMessage(data)
                        }}>Contact Agent</button>)}
                    </div>
                    <div className="listinghousdescription">
                        <div className="lisitngdescriptiontitle">
                            Description
                        </div>
                        <div className="lisitngviewsdatesaves">
                            <div className="listingdate">
                                Date:<div style={{fontWeight: 'bold', display: 'inline'}}>&nbsp;{newDate.toLocaleDateString()}</div>
                            </div>
                            <div className="listingviews">
                                Views:<div style={{fontWeight: 'bold', display: 'inline'}}>&nbsp;{views.length}</div>
                            </div>
                        </div>
                        <div className="listingdescription">
                            {description}
                        </div>
                    </div>
                    <div className="listingphotos">
                        <div className="listingmainphoto">
                            <img className="listingimage" src={`http://localhost:5000/images/listing/${_id}/${photos[0]}`}></img>
                        </div>
                        {this.renderPhotos(photos,_id)}
                    </div>
                </Fragment>
        )
    }
    renderModal = (property,userId,data,client) => {
        return(
                <div className="listingmodalbackground" ref={(ref) => this.background = ref}>
                    {this.renderLogin()}
                    {this.renderMessage()}
                    <div className="listingmodalContent">
                        {this.renderListingFields(property,userId,data,client)}
                    </div>
                </div>
        )
    }
    renderPage = (property,userId,data,client) => {
        return(
            <div>
                {this.renderLogin()}
                {this.renderMessage()}
                <div className="lisitingmaincontainer">
                    {this.renderListingFields(property,userId,data,client)}
                </div>
            </div>
        )
    }
    render(){
        const {property} = this.state
        if(property){
            const{_id} = property
            if(this.state.editlisting){
                return(<Redirect to={`/listrental/edit/${_id}`} />)
            }
            return(
                <Query query={IS_LOGGED_IN}>
                {({client, data, loading, error}) => {
                    const {userId} = client.cache.data.data.ROOT_QUERY
                    if(this.props.modal){
                        return(
                            <Fragment>
                                {this.renderModal(property,userId,data,client)}
                            </Fragment>
                        )
                    }else{
                        return(
                            <Fragment>
                                {this.renderPage(property,userId,data,client)}
                            </Fragment>
                        )
                    }
                }}
                </Query>
            )

        }else{
            return(
                <div></div>
            )
        }
    }
}
export default Listing