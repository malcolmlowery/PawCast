import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { colors } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TextInput from '../../components/TextInput';
import { addBusinessDetails } from '../../redux/actions/premiumAccountActions/addPremBusinessDetails';

const AddBusinessDetails = ({
  navigation,
  route,
  addDetails,
}) => {

  const { specialty } = route.params;

  const [farmName, setFarmName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [regBreeder, setRegBreeder] = useState('');
  const [yearsInBusiness, setYearsInBusiness] = useState(null);
  const [specialized, setSpecialized] = useState('');
  const [ears, setEars] = useState('');
  const [tail, setTail] = useState('');
  const [breederId, setBreederId] = useState('');
  const [trainingStyles, setTrainingStyles] = useState('');

  const onSubmit = async () => {

    const streetName = address.replace( /\s/g, '+').substring(1);
    console.log(streetName)

    const coord = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${streetName},+${city},+${state}&key=AIzaSyAOVOe0iFeZTy2jp83N2XQwY7AsHD-BN8Q`)
      .then(data => data.json())
      .then(res => res.results[0].geometry.location)
      .catch(error => console.log(error))

      console.log(coord) 

      if(specialty === 'breeder') {
        const userInput = {
          lat: coord.lat,
          lng: coord.lng,
          city,
          state,
          address,
          farmName,
          yearsInBusiness,
          breederId,
        }
        return addDetails(userInput)
      }
      if(specialty === 'trainer') {
        const userInput = {
          lat: coord.lat,
          lng: coord.lng,
          city,
          state,
          address,
          specialized,
          yearsInBusiness,
          businessName,
          trainingStyles
        }
        return addDetails(userInput)
      }
      if(specialty === 'veterinarian') {
        const userInput = {
          lat: coord.lat,
          lng: coord.lng,
          city,
          state,
          address,
        }
        return addDetails(userInput)
      }
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity style={{ alignItems: "center", flexDirection: 'row' }} onPress={() => navigation.pop()}>
          <>
          <Ionicons name='ios-arrow-back' color={colors.primary} size={24} />
          <Text 
            color='primary' 
            fontSize={18} 
            fontWeight='bold'
            position='relative'
            left={10}>
              Back
          </Text>
          </>
        </TouchableOpacity>
      </Header>

      <ScrollView style={{ marginBottom: 30 }}>

        { specialty === 'breeder' &&
        <Content>
            <TextInput label='Farm Name' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} />
            <TextInput label='Registered Breeder' placeholder='Yes or No' onChangeText={(text) => setRegBreeder(text)} value={regBreeder} />
            { regBreeder === 'Yes' && 
              <TextInput label='What is your breeder ID?' placeholder='N/A' onChangeText={(text) => setBreederId(text)} value={breederId} />
            }
            <TextInput label='Years In Business' placeholder='N/A' onChangeText={(text) => setYearsInBusiness(text)} value={yearsInBusiness} />
            <LocationContainer>
              <Text fontSize={20} fontWeight='semi-bold'>Location</Text>
              <TextInput label='Address' placeholder='N/A' onChangeText={(text) => setAddress(text)} value={address} />
              {/* <TextInput label='Suite/Unit' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} /> */}
              <TextInput label='City' placeholder='N/A' onChangeText={(text) => setCity(text)} value={city} />
              <TextInput label='State' placeholder='N/A' onChangeText={(text) => setState(text)} value={state} />
              {/* <TextInput label='Zip code' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} /> */}
            </LocationContainer>
          </Content> 
        }

        { specialty === 'trainer' &&
          <Content>
            <TextInput label='Business Name' placeholder='N/A' onChangeText={(text) => setBusinessName(text)} value={businessName} />
            <TextInput label='Years In Business' placeholder='N/A' onChangeText={(text) => setYearsInBusiness(text)} value={yearsInBusiness} />
            <TextInput label='Are you specialized with Dobermanns?' placeholder='Yes or No' onChangeText={(text) => setSpecialized(text)} value={specialized} />
            <TextInput label='Specify training styles' placeholder='Ex: house training, guard training, show training, pet training' onChangeText={(text) => setTrainingStyles(text)} value={trainingStyles} />
            <LocationContainer>
            <Text fontSize={20} fontWeight='semi-bold'>Location</Text>
              <TextInput label='Address' placeholder='N/A' onChangeText={(text) => setAddress(text)} value={address} />
              {/* <TextInput label='Suite/Unit' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} /> */}
              <TextInput label='City' placeholder='N/A' onChangeText={(text) => setCity(text)} value={city} />
              <TextInput label='State' placeholder='N/A' onChangeText={(text) => setState(text)} value={state} />
              {/* <TextInput label='Zip code' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} /> */}
            </LocationContainer>
          </Content> 
        }

        { specialty === 'veterinarian' &&
        <Content>
            <TextInput label='Business Name' placeholder='N/A' onChangeText={(text) => setBusinessName(text)} value={businessName} />
            <TextInput label='Registered Breeder' placeholder='Yes or No' onChangeText={(text) => setRegBreeder(text)} value={regBreeder} />
            <TextInput label='Years In Business' placeholder='N/A' onChangeText={(text) => setYearsInBusiness(text)} value={yearsInBusiness} />
            <TextInput label='Do you crop ears?' placeholder='Yes or No' onChangeText={(text) => setEars(text)} value={ears} />
            <TextInput label='Do you crop tail?' placeholder='Yes or No' onChangeText={(text) => setTail(text)} value={tail} />
            <LocationContainer>
              <Text fontSize={20} fontWeight='semi-bold'>Location</Text>
              <TextInput label='Address' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} />
              <TextInput label='Suite/Unit' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} />
              <TextInput label='City' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} />
              <TextInput label='State' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} />
              <TextInput label='Zip code' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} />
            </LocationContainer>
          </Content> 
        }

        <Button marginTop={20} width={300} onPress={onSubmit}>Submit</Button>
      </ScrollView>

    </Container>
  )
};

const mapDispatchToProps = (dispatch) => ({
  addDetails: (userInput) => dispatch(addBusinessDetails(userInput))
})

export default connect(null, mapDispatchToProps)(AddBusinessDetails);

const Container = styled.View`
  flex: 1;
  background: #fff;
`;

const Header = styled.View`
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 50px;
  padding-bottom: 10px;
`;

const Content = styled.View`
  margin: 0 10px;
`;

const LocationContainer = styled.View`
  margin-top: 10px;
`;