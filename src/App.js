import React, { Component } from 'react';
import Layout from './core/Layout';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import {apis} from './Config'

const mapStyles = {
  width: '75%',
  height: '75%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Layout>
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{
          lat: 45.3440365,
          lng: -75.663363
          }}
        />
      </Layout>
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apis.GOOGLE_MAPS_API
})(MapContainer);
