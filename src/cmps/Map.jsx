import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"
import UserService from '../services/UserService'
import { useEffect } from 'react'
import { compose, withProps } from "recompose"

const API_KEY = 'AIzaSyA61EAVmAo2YECcoYMVz_hJITa6l67Mm1E'
// const API_KEY='AIzaSyA4SHtEoWU34-H_zLBuEhO6BMYDakaQV5g'

// function Map(props) {
//     useEffect(()=>{
        
//     },[])
 
      
//     const user = props.user
//     debugger
//     const userLocation=user.profile.location
//     const [markers, setMarkers] = useState({userLocation})
//     useEffect(async () => {
//         user.profile.location=markers
//        await UserService.updateUser(user)
//         }, [markers])
//     return (
//         <GoogleMap
//             defaultZoom={10}
//             defaultCenter={{ lat: 32.0853, lng: 34.7818 }}
//             onClick={(event) => {
//                 setMarkers({
//                     lat: event.latLng.lat(),
//                     lng: event.latLng.lng(),
//                     time: new Date()
//                 })
//             }}
//         >
//             <Marker position={{ lat: markers.lat, lng: markers.lng }}></Marker>
//         </GoogleMap>
//     )
// }
const MyMapComponent = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100vh` ,width: `50vw`}} />,
      containerElement: <div style={{ height: `400px`,width: `50vw` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 32.0853, lng: 34.7818 }}
             onClick={(event) => {
            props.setMarkers({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date()
            })
        }}
    >
      {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />} */}
    </GoogleMap>
  )

// const WrappedMap = withScriptjs(withGoogleMap(Map))

class WrappedMap extends React.PureComponent {
    state = {
      isMarkerShown: false,
    }
  
    componentDidMount() {
      this.delayedShowMarker()
    }
  
    delayedShowMarker = () => {
      setTimeout(() => {
        this.setState({ isMarkerShown: true })
      }, 3000)
    }
  
    handleMarkerClick = () => {
      this.setState({ isMarkerShown: false })
      this.delayedShowMarker()
    }
    setMarkers=(data)=>{
    console.log("WrappedMap -> onClick -> data", data)

    }
  
    render() {
      return (
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          user={this.props.user}
          setMarkers={this.setMarkers}
        />
      )
    }
  }

const mapStateToProps = (state) => ({
    user: state.user.loggedInUser
})


const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedMap)
