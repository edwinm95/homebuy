import React,{Component,Fragment} from 'react'
import {Link,Redirect} from 'react-router-dom'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
const DELETE_PROPERTY = gql`
    mutation DeleteProperty($propertyID: ID!){
        deleteProperty(propertyID: $propertyID)
    }
`
class PropertiesComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: null,
        }
    }
    editProperty = (id) => {
        this.setState({id})
    }   
    handleDelete = (id, deleteProperty) => {
        deleteProperty({variables: {propertyID: id}})
    }
    renderProperties = (deleteProperty) => {
        if(this.props.values !== undefined && this.props.values !== null){
            const propertiesArray = this.props.values
            const messageArray = propertiesArray.map((property) => {
                 const {streetName, city, state, zipcode} = property.address
                 const address = `${streetName}, ${city}, ${state} ${zipcode}` 
                 const {photos} = property
                 const propertyId = property._id
                 const style = {
                     background: `url(http://localhost:5000/images/listing/${propertyId}/${photos[0]})`,
                     backgroundPosition: '50% 50%',
                     backgroundSize: 'cover',
                 }
                 return(
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.handleDelete(propertyId,deleteProperty)
                    }}>
                        <div className="myproperty">
                            <div className="mypropertyphotocomponent" style={style} />
                            <div className="mypropertyaddresscomponent">
                                    <Link className="mypropertyaddresslink" to={`/listing/${propertyId}`}>{address}</Link>
                            </div>
                            <div className="mypropertybuttoncomponent">
                                <button className="mypropertyedit" onClick={() => this.editProperty(propertyId)}>Edit</button>
                                <button className="mypropertydelete" type="submit">Delete</button>
                            </div>
                        </div>
                    </form>
                 )
             })
             return messageArray
        }
        return<div></div>
    }
    render(){
        return(
            <Mutation 
            mutation={DELETE_PROPERTY}
            onCompleted={() => {
                window.location.reload()
            }}
            >
            {(deleteProperty) => {
                if(this.state.id){
                    return(
                        <Redirect to={`/listrental/edit/${this.state.id}`} />
                    )
                }
                return( 
                    <form>
                        <div className="mypropertiesmaincontainer">
                            <h1 className="mypropertiestitle">My Properties</h1>
                            <div className="mypropertiescomponent">
                                {this.renderProperties(deleteProperty)}
                            </div>
                        </div>
                    </form>           
                )
            }}

            </Mutation>
        )
    }
}
export default PropertiesComponent