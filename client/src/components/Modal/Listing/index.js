import React, {Component, Fragment} from 'react'
import ListingContent from '../../Layout/Listing'
class Listing extends Component {
    
    handleCloseModal = () => {
        this.props.closeModal()
    }
    render(){
        const {_id} = this.props.listing
        return(
            <ListingContent modal id={_id} closeModal={this.handleCloseModal} />
        )
    }
}

export default Listing