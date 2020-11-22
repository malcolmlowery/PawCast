import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReactMapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Marker, Circle, Callout } from 'react-native-maps';
import AppHeader from '../components/AppHeader';
import Text from '../components/Text';
import { colors } from '../utils/theme';
import { fireAuth } from '../firebase/firebase';
import { getUserLocations } from '../redux/actions/userLocationActions';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const MapView = ({ 
  getUserLocations,
  locations,
  navigation 
}) => {

  useEffect(() => {
    getUserLocations()
  }, [])

  const currentUserLoc = locations.find(userLoc => userLoc.uid === fireAuth.currentUser.uid)

  return (
    <Container>
      <AppHeader>
        <TitleArea onStartShouldSetResponder={() => navigation.pop()}>
          <Ionicons 
            color={colors.primary} 
            name='ios-arrow-back' 
            size={30} 
          />
          <Text color='primary' fontSize={18} fontWeight='semi-bold' left={10}>Back</Text>
        </TitleArea>
      </AppHeader>

      { locations !== undefined &&
        <Map>
          <ReactMapView 
            // provider='google'
            camera={{ 
              pitch: 0, 
              zoom: 0, 
              heading: 0, 
              altitude: 40000, 
              center: { 
                longitude: currentUserLoc && currentUserLoc?.lng, 
                latitude: currentUserLoc && currentUserLoc?.lat - 0.015
              } 
            }} 
            style={{ 
              height: screenHeight, 
              width: screenWidth 
            }}
          >
            { locations &&
              locations.map((loc, index) => {
                return (
                  <Marker 
                    key={index}
                    coordinate={{ longitude: loc.lng + 0.0041, latitude: loc.lat + 0.0021 }}
                    title={`${loc.firstName} ${loc.lastName}`}
                    onCalloutPress={() => navigation.push('profile', { uid: loc.uid })}
                    zIndex={index}
                  > 
                    <Image 
                      style={{ 
                        borderRadius: 25, 
                        borderColor: colors.alert, 
                        borderWidth: 1,
                      }} 
                      source={{ 
                        uri: loc.profileImage, 
                        height: 50, 
                        width: 50 
                      }
                    }/>
                  </Marker>
                )
              })
            }
          </ReactMapView>
        </Map>
      }

    </Container>
  )
};

const mapStateToProps = (state) => ({
  isLoading: state.userLocationsData.isLoading,
  locations: state.userLocationsData.data,
  error: state.userLocationsData.error
});

const mapDispatchToProps = (dispatch) => ({
  getUserLocations: () => dispatch(getUserLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);

const Container = styled.View`
  flex: 1;
`;

const TitleArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Map = styled.View`
  height: 200px;
  width: 200px;
`;