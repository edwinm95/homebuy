import React, {Component, Fragment} from 'react'

class Checkbox extends Component {
    constructor(props){
        super(props)
        this.state = {
            checked: []
        }
    }
    getValue = () => {
        return this.state.checked
    }
    handleClick = (event) => {
        const checkbox = event.currentTarget
        if(checkbox.checked){
            this.setState({checked: [...this.state.checked, checkbox.value]})
        }else{
            var array = this.state.checked
            for (var i in array){
                if(array[i] === checkbox.value){
                    array.splice(i,1)
                    break;
                }
            }
            this.setState({checked: array})
        }

    }
    renderCheckbox(values){
        const array = values.map((value) => {
            return (
            <div>
                <input type="checkbox" value={value} onClick={this.handleClick}/>{value}
            </div> )
        })
        return array
    }

    render () {
        return(
            <Fragment>
                {this.renderCheckbox(this.props.values)}
            </Fragment>

        )
    }
}

export default Checkbox