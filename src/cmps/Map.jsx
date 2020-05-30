import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"
import UserService from '../services/UserService'
// const API_KEY='AIzaSyA61EAVmAo2YECcoYMVz_hJITa6l67Mm1E'
const API_KEY='AIzaSyA4SHtEoWU34-H_zLBuEhO6BMYDakaQV5g'

  function Map() {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        ></GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export class MapToDisplay extends Component {


    render() {
        return (
            <div style={{ height: `100vh` ,width:'100vw'}}>
                <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}></WrappedMap>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.loggedInUser
})


const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MapToDisplay)
