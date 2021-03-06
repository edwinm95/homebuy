import React, {Component, Fragment} from 'react'
import { google, tomtom } from '../config/keys'
class Map extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {lat,lon} = this.props
        if(window.tomtom){
            var map = window.tomtom.L.map('map', {
                key: tomtom.API,
                basePath: `${process.env.PUBLIC_URL}/sdk`,
                center: [lat,lon],
                zoom: 15
            })
            var markerOptions = {
                icon: window.tomtom.L.icon({
                    iconUrl: process.env.PUBLIC_URL+'/sdk/images/ic_map_poi_013_white.png',
                    iconSize: [30,34],
                    iconAnchor: [15,34]
                })

            }
            this.props.properties.forEach((property) => {
                const {lat, lon} = property.address
                window.tomtom.L.marker([lat,lon]).addTo(map)
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
            height: 500,
            left: '2%',
            top: '10%',
            position: 'absolute'

        }
        return(
            <div id='map' style={style}/>
        )
    }   
}
export default Map