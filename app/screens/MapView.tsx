import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReactMapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Marker } from 'react-native-maps';
import AppHeader from '../components/AppHeader';
import Text from '../components/Text';
import { colors } from '../utils/theme';
import { fireAuth } from '../firebase/firebase';
import { getUserLocations } from '../redux/actions/userLocationActions';
import { getAllDobermannsByCount } from '../redux/actions/dobermanCountActions';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('screen').width;

const MapView = ({ 
  dobermannTotal,
  dobermannIsLoading,
  getUserLocations,
  getAllDobermanns,
  locations,
  navigation 
}) => {

  useEffect(() => {
    getUserLocations()
    getAllDobermanns()
  }, [])

  const currentUserLoc = locations.find(userLoc => userLoc.uid === fireAuth.currentUser.uid)

  return (
    <Container>
      <AppHeader>
        <Text color='primary' fontSize={28} fontWeight='semi-bold'>Map View</Text>
      </AppHeader>

      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={dobermannIsLoading} 
            onRefresh={getAllDobermanns}
          /> 
        }
      >
      <HeaderContainer>
        <Text fontSize={24} color='darkText' fontWeight='semi-bold'>There are {dobermannTotal} Dobermanns</Text>
        <Text fontSize={24} color='darkText' fontWeight='bold'>on Pawcast!</Text>
      </HeaderContainer>

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
              height: 500, 
              width: screenWidth - 20,
              borderRadius: 30
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
      </ScrollView>

    </Container>
  )
};

const mapStateToProps = (state) => ({
  isLoading: state.userLocationsData.isLoading,
  locations: state.userLocationsData.data,
  error: state.userLocationsData.error,
  dobermannTotal: state.dobermannCounter.total,
  dobermannIsLoading: state.dobermannCounter.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getUserLocations: () => dispatch(getUserLocations()),
  getAllDobermanns: () => dispatch(getAllDobermannsByCount())
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
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  box-shadow: 0 4px 24px rgba(0,0,0, 0.1);
`;

const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;