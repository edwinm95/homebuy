import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import ListingContent from '../../Layout/Listing'
class Listing extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const {id} = this.props.match.params
        if(id){
            return(
                <div>
                    <ListingContent id={id} />
                </div>
            )
        }
            return(
                <Fragment>
                    <Redirect to="/" />
                </Fragment>
            )
    }

}

export default Listing
