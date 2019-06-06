import React, { Component, Fragment } from 'react'
import './file.css'
class File extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: null
        }
    }
    getValue = () => {
        return this.state.value
    }
    handleChange = (event) => {
        const files = event.currentTarget.files
        const {valid} = event.target.validity
        var name = null
        if(files.length !== 0){
            if(valid){
                name = files[0].name
                this.setState({value: files[0]})
            }
        }
        this.props.setFileName(name)
    }
    activate = () => {
        this.file.click()
    }
    render() {
        return (
            <Fragment>
                <input type = "file"  className={this.props.className} ref={(ref) => this.file = ref} onChange={this.handleChange}/>
            </Fragment>

        )
    }
}
export default File
