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
        editlisting: false
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
        this.setState({property: responseData.data.addViews})
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
    renderListingFields = (property,userId,data) => {
        const {rent, beds, baths, squarefeet, date, _id, photos, views, description, createdBy} = property
        const {streetName, city, state} = property.address
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
                        </div>
                        <div className="listinghouseaddress">
                            {`${streetName}, ${city}, ${state}`}
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
                            <div className="listingsaves">
                                Saves
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
                        <div className="listingotherphotos">
                            <img className="listingimage" src={`http://localhost:5000/images/listing/${_id}/${photos[0]}`}></img>
                        </div>
                        <div className="listingotherphotos">
                            <img className="listingimage" src={`http://localhost:5000/images/listing/${_id}/${photos[0]}`}></img>
                        </div>
                    </div>
                </Fragment>
        )
    }
    renderModal = (property,userId,data) => {
        return(
                <div className="listingmodalbackground" ref={(ref) => this.background = ref}>
                    {this.renderLogin()}
                    {this.renderMessage()}
                    <div className="listingmodalContent">
                        {this.renderListingFields(property,userId,data)}
                    </div>
                </div>
        )
    }
    renderPage = (property,userId,data) => {
        return(
            <div>
                {this.renderLogin()}
                {this.renderMessage()}
                <div className="lisitingmaincontainer">
                    {this.renderListingFields(property,userId,data)}
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
                                {this.renderModal(property,userId,data)}
                            </Fragment>
                        )
                    }else{
                        return(
                            <Fragment>
                                {this.renderPage(property,userId)}
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