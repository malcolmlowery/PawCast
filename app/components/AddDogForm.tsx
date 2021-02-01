import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import { connect } from 'react-redux';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';
import { ScrollView } from 'react-native-gesture-handler';
import { createNewDog } from '../redux/actions/dogActions';

const DropDown = ({ 
  labels, 
  onValueChange, 
  title,
}) => {
  return (
    <View style={{ marginTop: 10 }}>
    <Text fontWeight='semi-bold' fontSize={15} left={8}>{title}</Text>
    <View 
      style={{ 
        padding: 10, 
        backgroundColor: '#f4f4f4', 
        borderRadius: 2, 
        marginTop: 10,   
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

const AddDogForm = ({ 
  createDog,
  onPress,
  dogCreated,
}) => {

  const numbers = [ 
    { label: '1', value: 1 },
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
  ]

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
  const [shiftCard, setShiftCard] = useState(false);

  const openImagePicker = async () => {
    const premissions = await ImagePicker.requestCameraPermissionsAsync();
    const result: any = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    if(premissions.granted === false) {
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
    const dogFormData = {
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
    };

    createDog(dogFormData).then(() => dogCreated())
  }

  return (
    <>
      <Backdrop />
      <Container onStartShouldSetResponder={Keyboard.dismiss}>
        <KeyboardAvoidingView enabled={shiftCard} behavior='position' contentContainerStyle={{ paddingBottom: 30 }}>
          <Card>
            <CardHeader>
              <Text color='primary' fontSize={18} fontWeight='semi-bold'>New Dog</Text>
            </CardHeader>

            <Content>
              <ScrollView style={{ height: 250, paddingBottom: 20, marginTop: 20, borderBottomColor: '#f2f2f2', borderBottomWidth: 1 }}>
                <View style={{ paddingBottom: 20 }}>
                  <TextInput label='Name' onChangeText={(text) => setName(text)} value={name} onFocus={() => setShiftCard(false)}  />
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

                  <TextInput label='Age' placeholder='Human Years' onChangeText={(text) => setAge(text)} value={age} />
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
                      { label: 'No Tail', value: 'none' },
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
                </View>
              </ScrollView>
              <DogImagesContainer>
                <AddImageButton onPress={() => openImagePicker()}>
                  <Ionicons color={colors.white} name='ios-camera' size={42} />
                </AddImageButton>
                <DogImage source={{ uri: image }} />
              </DogImagesContainer>
            </Content>

            <ButtonGroup>
              <Button
                color='white' 
                fill='danger' 
                expand='none'
                height={34}
                onPress={() => onPress()}
                width={145}>
                  Cancel
              </Button>
              <Button 
                color='white' 
                fill='primary' 
                expand='none'
                height={34}
                marginBottom={10}
                onPress={() => onSubmit()}
                width={145}>
                  Add Dog
              </Button>
            </ButtonGroup>
          </Card>
        </KeyboardAvoidingView>
      </Container>
    </>
  )
};

const mapDispatchToProps = (dispatch) => ({
  createDog: (userInput) => dispatch(createNewDog(userInput))
})

export default connect(null, mapDispatchToProps)(AddDogForm);

const Backdrop = styled.View`
  background: #000;
  flex: 1;
  height: 100%;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  z-index: 10;
`;
const Container = styled.View`
  align-items: center;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 11;
`;

const Card = styled.View`
  align-items: center;
  background: ${colors.white};
  border-radius: 8px;
  padding: 10px;
  width: 320px;
`;

const CardHeader = styled.View`
  align-items: center;
  padding-top: 20px;
`;

const Content = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const DogImagesContainer = styled.View`
  align-items: center;
  border-radius: 8px;
  flex-direction: row;
  height: 150px;
  justify-content: center;
  margin-top: 20px;
  overflow: hidden;
`;

const DogImage = styled.Image`
  background: #f5f5f5;
  border-radius: 16px;
  height: 100%;
  width: 150px;
`;

const AddImageButton = styled.TouchableOpacity`
  align-items: center;
  background: ${colors.primary};
  border-radius: 35px;
  height: 70px;
  justify-content: center;
  margin-right: 24px;
  width: 70px;
`;