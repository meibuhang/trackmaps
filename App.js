import React, { useState } from "react";
import MapView, { UrlTile, Marker, Circle } from 'react-native-maps';
import Geolocation from "@react-native-community/geolocation";
import {Dimensions } from "react-native";
import { Button, View, Text, StyleSheet} from "react-native";

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
	  },
	mapcontainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: width,
		height: height,
	  },
	markerCoords: {
		position: 'absolute',
		padding: 20
	}
});

const CurrentPosition = () => {
  const [error, setError] = useState("");
  const [position, setPosition] = useState({
  latitude: 0,
	longitude: 0,
	markerCoords:0
  });

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setError("");
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      e => setError(e.message)
    );
  };


const Rendermap = () => {
	return(
<View style={styles.container}>
			<MapView
				style={styles.mapcontainer}
				showsUserLocation={true}
				showsMyLocationButton={false}
				zoomEnabled = {true}
				initialRegion={{
					latitude: position.latitude,
					longitude: position.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				showsUserLocation
				mapType='none'
				onPress={(e) => setPosition({ markerCoords: e.nativeEvent.coordinate })}>
				<Circle
					center={{ latitude: position.latitude, longitude: position.longitude }}
					radius={1000}
					strokeWidth={1}
					strokeColor={'#1a66ff'}
					zIndex={2}
				/>
				<UrlTile
					urlTemplate={
						'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
					}
				/>
				{position.markerCoords && (
					<Marker
						draggable
						coordinate={position.markerCoords}
						onPress={(e) => this.setState({ markerCoords: null })}
						onDragEnd={(e) => this.setState({ markerCoords: e.nativeEvent.coordinate })}
					/>
				)}
				{position.markerCoords && (
					<Circle
						center={position.markerCoords}
						radius={1000}
						strokeWidth={1}
						strokeColor={'#1a66ff'}
						fillColor={'rgba(r,g,b,0.5)'}
						zIndex={2}
					/>
				)}
			</MapView>
			<View>
			<Text style={styles.markerCoords}>
				{position.markerCoords ? (
					`(${position.markerCoords.latitude})-(${position.markerCoords.longitude})`
				) : (
					`(${position.latitude})-(${position.longitude})`
				)}
			</Text>
			</View>
		</View>
	)
  }

  return (
    <View>
      <Button title="Click to Get Current Position" onPress={getPosition} />
      {error ? (
        <Text>Error retrieving current position</Text>
      ) : (position.latitude ? ( <>
	  <Text>Latitude: {position.latitude}</Text>
          <Text>Longitude: {position.longitude}</Text>
		  <Rendermap/>
		  </>):(<Text>No position</Text>)
      )}
    </View>
  );
};
export default CurrentPosition;