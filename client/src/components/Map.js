import React, {Component, Fragment} from 'react'
import { google, tomtom } from '../config/keys'
class Map extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {lat,lon} = this.props
        if(window.tomtom){
            window.tomtom.L.map('map', {
                key: tomtom.API,
                basePath: '../../public/sdk/',
                center: [lat,lon],
                zoom: 15
            })
        }
        // const script = document.createElement('script')
        // script.src = '../../public/sdk/tomtom.min.js'
        // script.async = true
        // script.defer = true
        // document.body.appendChild(script)
        // script.onload = () => {
        // }
        // if(!window.google){
        //     var script = document.createElement('script')
        //     script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPI}`
        //     script.async = true
        //     script.defer = true
        //     document.body.appendChild(script)
        //     script.addEventListener("load" ,() => {
        //         this.onScriptLoad()
        //     })
        // }else{
        //     this.onScriptLoad()
        // }
    }
    render(){
        const style = {
            width: 600,
            height: 600

        }
        return(
            <div id='map' style={style}/>
        )
    }   
}
export default Map