import React,{Component,Fragment} from 'react'

class SearchAutoCompleteSuggestions extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: false
        }
    }
    selectValue = (element) => {
        this.props.selectValue(element)
        this.setState({selected: true})
    }
    render(){
            var count = 0;
            const options = this.props.collections.map((element) => {
                count++
                return(
                    <div className="collectionfields" key={`${element}${count}`} onClick={() => this.selectValue(element)}>{element}</div>
                )
            })
            return(
                <div className ="collectionfieldcomponent">
                    {options}
                </div>
            )  
    }
}

export default SearchAutoCompleteSuggestions