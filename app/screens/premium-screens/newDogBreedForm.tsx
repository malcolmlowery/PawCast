import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import Text from '../../components/Text';
import { colors } from '../../utils/theme';
import { Alert, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { createPremiumPet } from '../../redux/actions/premiumAccountActions/addPremDogBreed';

const DropDown = ({ 
  labels, 
  onValueChange, 
  title,
}) => {
  return (
    <View style={{ marginTop: 10  }}>
    <Text fontWeight='semi-bold' fontSize={15} left={10}>{title}</Text>
    <View 
      style={{ 
        padding: 10, 
        backgroundColor: '#f4f4f4', 
        borderRadius: 2, 
        marginTop: 8,
      }}
    >
      <RNPickerSelect
        onValueChange={(value) => onValueChange(value)}
        items={labels}
      />
    </View>
    </View>
  )
};

const NewDogBreedForm = ({ 
  navigation,
  submitNewDog,
  isCreating,
  error,
}) => {

  const numbers = [ 
    { label: '1', value: 1 },
    { label: '1.5', value: 1.5 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    { label: '15', value: 15 },
    { label: '16', value: 16 },
    { label: '17', value: 17 },
    { label: '18', value: 18 },
    { label: '19', value: 19 },
    { label: '20', value: 20 },
  ];

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [breedLine, setBreedLine] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(null);
  const [color, setColor] = useState('');
  const [earCrop, setEarCrop] = useState('');
  const [tailCrop, setTailCrop] = useState('');
  const [personality, setpPersonality] = useState('');
  const [price, setPrice] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [shotsGiven, setShotsGiven] = useState('');

  const openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    let result: any = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    
    if(permissionResult.granted === false) {
      return (
        Alert.alert(
          'Permission Denied',
          'Permission to access camera roll is required!'
        )
      )
    }
        
    if(!result.cancelled) {
      setImage(result.uri)
    }
  }

  const onSubmit = () => {
    const userInput = {
      image,
      name,
      breed,
      breedLine,
      gender,
      age,
      color,
      earCrop,
      tailCrop,
      personality,
      shotsGiven,
      price,
    }

    submitNewDog(userInput)

    if(isCreating == false && error == null) {
      return navigation.pop()
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


      <ScrollView style={{ paddingBottom: 20, marginTop: 10, borderBottomColor: '#f2f2f2', borderBottomWidth: 1 }}>
        <View style={{ paddingBottom: 70, marginLeft: 10, marginRight: 10 }}>

          <TextInput label='Name' onChangeText={(text) => setName(text)} value={name} />

          <DropDown 
            title='Breed'
            onValueChange={(value) => setBreed(value)}
            labels={[
              { label: 'Doberman', value: 'doberman' },
            ]} 
          />

          <DropDown 
            title='Breed Line'
            onValueChange={(value) => setBreedLine(value)}
            labels={[
              { label: 'American', value: 'american' },
              { label: 'European', value: 'european' },
              { label: 'American/European', value: 'american/european' },
            ]} 
          />

          <DropDown 
            title='Gender'
            onValueChange={(value) => setGender(value)}
            labels={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]} 
          />

          <DropDown 
            onValueChange={(value) => setAge(value)}
            title='Age (human years)'
            labels={numbers.map(values => values)} 
          />

          <TextInput label='Color' onChangeText={(text) => setColor(text)} value={color} />

          <DropDown 
            onValueChange={(value) => setEarCrop(value)}
            title='Ear Crop Style'
            labels={[
              { label: 'Natural', value: 'natural' },
              { label: 'Military Ear Crop', value: 'military' },
              { label: 'Long Ear Crop', value: 'long' },
              { label: 'Medium Ear Crop', value: 'medium' },
              { label: 'Short Ear Crop', value: 'short' },
            ]} 
          />

          <DropDown 
            onValueChange={(value) => setTailCrop(value)}
            title='Tail Crop Style'
            labels={[
              { label: 'Normal Tail Crop', value: 'normal' },
              { label: 'Short Tail Crop', value: 'short' },
              { label: 'Long Tail Crop', value: 'long' },
              { label: 'Military Tail Crop', value: 'military' },
            ]} 
          />

          <TextInput label='Shots Given' placeholder='Deworming, Rabies, Boosters' onChangeText={(text) => setShotsGiven(text)} value={shotsGiven} />

          <DropDown 
            onValueChange={(value) => setTailCrop(value)}
            title='Tail Crop Style'
            labels={[
              { label: 'Long Tail Crop', value: 'long tail crop' },
              { label: 'Short Tail Crop', value: 'short tail crop' },
            ]} 
          />

          <DropDown 
            onValueChange={(value) => setpPersonality(value)}
            title='Personality'
            labels={[
              { label: 'Aggressive', value: 'aggressive' },
              { label: 'Reactivity', value: 'reactivity' },
              { label: 'Fearfulness', value: 'fearfulness' },
              { label: 'Sociability', value: 'sociability' },
              { label: 'Responsiveness', value: 'responsiveness' },
              { label: 'Submissiveness', value: 'submissiveness' },
            ]} 
          />

          <TextInput label='Blood Type' placeholder='' onChangeText={(text) => setBloodType(text)} value={bloodType} />

          <TextInput label='Price' placeholder='$2000.00' onChangeText={(text) => setPrice(text)} value={price} />

      <ImageSection>
        <Icon onPress={() => openImagePicker()}>
          <Text fontSize={12}>Add Image</Text>
          <Ionicons color={colors.primary} name='ios-add-circle' size={48} />
        </Icon>
        { image !== null ?
          <ImagePreview source={{ uri: image }} />  
          :
          <ImagePreview />  
        }
      </ImageSection>

      <Button onPress={() => onSubmit()}>
        <Text fontWeight='semi-bold' fontSize={16}>Add Doberman</Text>
      </Button>
      </View>
    </ScrollView>


    </Container>
  )
};

const mapStateToProps = (state) => ({
  isCreating: state.premiumPets.isCreating,
  error: state.premiumPets.error,
});

const mapDispatchToProps = (dispatch) => ({
  submitNewDog: (userInput) => dispatch(createPremiumPet(userInput))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDogBreedForm);

const Container = styled.View`
  background: #fff;
  flex: 1;
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

const Icon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 70px;
`;

const ImageSection = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
`;

const ImagePreview = styled.Image`
  background: #ebebeb;
  border-radius: 8px;
  height: 200px;
  width: 200px;
  margin-left: 20px;
`