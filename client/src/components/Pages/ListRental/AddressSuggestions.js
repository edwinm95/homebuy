import React,{Component,Fragment} from 'react'

class AddressSugestions extends Component {
    constructor(props){
        super(props)
    }
    handleClick = (element) => {
        this.props.clicked(element)
    }
    render(){
        const options = this.props.address.map((element) => {
            return(
            <div className="addresssuggestionlist" onClick={() => this.handleClick(element)}>
                {element.address.freeformAddress}
            </div>)
        })
        return(
        <div className="addresssuggestioncontainer">
            {options}
        </div>
        )
    }
}

export default AddressSugestions