import React, {Component, Fragment} from 'react'
import TextInput from '../../Input/Text'

class AdditionalAmenities extends Component {
    constructor(props){
        super(props)
        this.state = {
            values: []
        }
    }
    getValues = () => {
        if(this.state.values.length === 0){
            return null;
        }
        return this.state.values
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const value = this.textinput.getValue()
        this.setState({values: [...this.state.values, value]})
        this.textinput.clearValue()
    }
    renderAdditionalAmenities = () => {
        const values = this.state.values
        if(values.length === 0){
            return<div></div>
        }
        const array = values.map((value) => {
            return(
                <div className="additionalamenities">{value}</div>
            )
        })
        return array
    }
    render(){
        const style = {
            position: 'relative'
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <div style={style}>
                    <TextInput className={'textinput'}  ref={(ref) => this.textinput = ref}/>
                    <button type="submit" className="addamenitiesbutton">Add</button>
                </div>
                <div className="additionalamenitiescomponent">
                        {this.renderAdditionalAmenities()}
                    </div>
          </form>
        )
    }
}

export default AdditionalAmenities