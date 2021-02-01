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
  pleaseWait,
}) => {

  const { 
    specialty,
    editMode,
    registeredBreeder,
  } = route.params;

  const [farmName, setFarmName] = useState(route.params.farmName);
  const [address, setAddress] = useState(route.params.address);
  const [city, setCity] = useState(route.params.city);
  const [state, setState] = useState(route.params.state);
  const [zipcode, setZipcode] = useState(route.params.zipcode);
  const [businessName, setBusinessName] = useState(route.params.businessName);
  const [regBreeder, setRegBreeder] = useState('');
  const [yearsInBusiness, setYearsInBusiness] = useState(route.params.yearsInBusiness);
  const [specialized, setSpecialized] = useState(route.params.specialized);
  const [ears, setEars] = useState(route.params.ears);
  const [tail, setTail] = useState(route.params.tail);
  const [breederId, setBreederId] = useState(route.params.breederId);
  const [trainingStyles, setTrainingStyles] = useState(route.params.trainingStyles);
  const [shots, setShots] = useState(route.params.shots);

  const onSubmit = async () => {

    const streetName = address.replace( /\s/g, '+').substring(1);

    const coord = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+components=postal_code:${zipcode},+${city},+${state}&key=AIzaSyAOVOe0iFeZTy2jp83N2XQwY7AsHD-BN8Q`)
      .then(data => data.json())
      .then(res => res.results[0].geometry.location)
      .catch(error => console.log(error)) 

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
          zipcode
        }
        return addDetails(userInput).then(() => navigation.pop())
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
          trainingStyles,
          zipcode
        }
        return addDetails(userInput).then(() => navigation.pop())
      }
      if(specialty === 'veterinarian') {
        const userInput = {
          lat: coord.lat,
          lng: coord.lng,
          city,
          state,
          address,
          zipcode,
          businessName,
          yearsInBusiness,
          ears,
          tail,
          shots,
        }
        return addDetails(userInput, editMode).then(() => navigation.pop())
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
              <TextInput label='Zip code' placeholder='N/A' onChangeText={(text) => setZipcode(text)} value={zipcode} />
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
              <TextInput label='Zip code' placeholder='N/A' onChangeText={(text) => setZipcode(text)} value={zipcode} />
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
            <TextInput label='Years In Business' placeholder='N/A' onChangeText={(text) => setYearsInBusiness(text)} value={yearsInBusiness} />
            <TextInput label='Do you crop ears?' placeholder='Yes or No' onChangeText={(text) => setEars(text)} value={ears} />
            <TextInput label='Do you crop tail?' placeholder='Yes or No' onChangeText={(text) => setTail(text)} value={tail} />
            <TextInput label='What shots do you offer?' placeholder='Deworming, Rabies' onChangeText={(text) => setShots(text)} value={shots} />
            <LocationContainer>
            <Text fontSize={20} fontWeight='semi-bold'>Location</Text>
              <TextInput label='Address' placeholder='N/A' onChangeText={(text) => setAddress(text)} value={address} />
              <TextInput label='Zip code' placeholder='N/A' onChangeText={(text) => setZipcode(text)} value={zipcode} />
              {/* <TextInput label='Suite/Unit' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} /> */}
              <TextInput label='City' placeholder='N/A' onChangeText={(text) => setCity(text)} value={city} />
              <TextInput label='State' placeholder='N/A' onChangeText={(text) => setState(text)} value={state} />
              {/* <TextInput label='Zip code' placeholder='N/A' onChangeText={(text) => setFarmName(text)} value={farmName} /> */}
            </LocationContainer>
          </Content> 
        }

        <ButtonBox>
          { pleaseWait !== true ?
            <Button marginTop={20} width={300} onPress={onSubmit}>Submit</Button>
            :
            <Button marginTop={20} fill='alert' width={300}>Please wait...</Button>
          }
        </ButtonBox>
      </ScrollView>

    </Container>
  )
};

const mapStateToProps = (state) => ({
  pleaseWait: state.addBusiness.pleaseWait
})

const mapDispatchToProps = (dispatch) => ({
  addDetails: (userInput, editMode) => dispatch(addBusinessDetails(userInput, editMode))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBusinessDetails);

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

const ButtonBox = styled.View`
  align-items: center;
`;