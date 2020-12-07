import React, { useState } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import AppHeader from '../components/AppHeader';
import Text from '../components/Text';
import Button from '../components/Button';
import { deleteDog } from '../redux/actions/dogActions';
import { fireAuth } from '../firebase/firebase';

const PetDetails = ({ deleteDog, navigation, route }) => {

  const [editMode, setEditMode] = useState(false);

  const { 
    age,
    breed,
    breedLine,
    color,
    dogId,
    dogOwner,
    earCrop,
    gender,
    images,
    name,
    personality,
    tailCrop,
  } = route.params.dog; 

  return (
    <Container>

      <AppHeader height={100}>
        <TitleArea onStartShouldSetResponder={() => navigation.pop()}>
          <Ionicons 
            color={colors.primary} 
            name='ios-arrow-back' 
            size={30} 
          />
          <Text color='primary' fontSize={18} fontWeight='semi-bold' left={10}>Back</Text>
        </TitleArea>
      </AppHeader>

      <ScrollView>
        <ContentTitle>
          <Text fontSize={28} fontWeight='semi-bold'>{name}</Text>
        </ContentTitle>

        <Banner>
          <BannerImage source={{ uri: images[0] }} />
        </Banner>

        { dogOwner.uid === fireAuth.currentUser.uid &&
          <ButtonGroup>
            { !editMode ? 
              <Button expand='none' width={120} onPress={() => setEditMode(!editMode)}>
                Edit
              </Button>
              :
              <>
                <Button fill='primary' expand='none' onPress={() => setEditMode(!editMode)} width={120}>
                  DONE
                </Button>
                <Button fill='danger' expand='none' onPress={() => deleteDog(dogId).then(() => navigation.pop())} width={120}>
                  Delete {name}
                </Button>
              </>
            }
          </ButtonGroup>
        }

        <Content>
          <DogInfoGroup>
            <InfoItem style={{ backgroundColor: '#303f9f' }}>
              <Text color='white' fontWeight='semi-bold'>Breed Line:</Text>
              <Text color='white' fontWeight='semi-bold'>{breedLine}</Text>
            </InfoItem>
            <InfoItem style={{ backgroundColor: colors.primary }}>
              <Text color='white' fontWeight='semi-bold'>Breed:</Text>
              <Text color='white' fontWeight='semi-bold'>{breed}</Text>
            </InfoItem>
            <InfoItem style={{ backgroundColor: '#303f9f' }}>
              <Text color='white' fontWeight='semi-bold'>Age:</Text>
              <Text color='white' fontWeight='semi-bold'>{age}</Text>
            </InfoItem>
            <InfoItem style={{ backgroundColor: colors.primary }}>
              <Text color='white' fontWeight='semi-bold'>Gender:</Text>
              <Text color='white' fontWeight='semi-bold'>{gender}</Text>
            </InfoItem>
            <InfoItem style={{ backgroundColor: '#303f9f' }}>
              <Text color='white' fontWeight='semi-bold'>Color:</Text>
              <Text color='white' fontWeight='semi-bold'>{color}</Text>
            </InfoItem>
            <InfoItem style={{ backgroundColor: colors.primary }}>
              <Text color='white' fontWeight='semi-bold'>Ear Crop:</Text>
              <Text color='white' fontWeight='semi-bold'>{earCrop}</Text>
            </InfoItem>
            <InfoItem style={{ backgroundColor: '#303f9f' }}>
              <Text color='white' fontWeight='semi-bold'>Tail Crop:</Text>
              <Text color='white' fontWeight='semi-bold'>{tailCrop}</Text>
            </InfoItem>
            <InfoItem style={{ backgroundColor: colors.primary }}>
              <Text color='white' fontWeight='semi-bold'>Personalitye:</Text>
              <Text color='white' fontWeight='semi-bold'>{personality}</Text>
            </InfoItem>
          </DogInfoGroup>

          <DogImagesGroup>
            { images &&
              images.map((dogImage, index) => {
                return (
                  <DogImage key={index} source={{ uri: dogImage }} />
                )
              })
            }
          </DogImagesGroup>
        </Content>
      </ScrollView>

    </Container>
  )
};

const mapDisptachToProps = (dispatch) => ({
  deleteDog: (dogId) => dispatch(deleteDog(dogId))
})

export default connect(null, mapDisptachToProps)(PetDetails);

const Container = styled.View`
  flex: 1;
`;

const TitleArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Banner = styled.View`
  border-radius: 32px;
  box-shadow: 0 4px 12px rgba(0,0,0, 0.15);
  height: 250px;
  margin: 10px;
`;

const BannerImage = styled.Image`
  border-radius: 16px;
  height: 100%;
`;

const Content = styled.View`
  padding-bottom: 30px;
`;

const ContentTitle = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const DogInfoGroup = styled.View`
  background: ${colors.primary};
  border-radius: 16px;
  margin: 10px;
  overflow: hidden;
`;

const InfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
`;

const DogImagesGroup = styled.View`
  background: ${colors.primary};
  border-radius: 16px;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  overflow: hidden; 
`;

const DogImage = styled.Image`
  height: 130px;
  flex-grow: 1;
  flex-basis: 130px;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  margin: 4px 10px;
  justify-content: space-evenly;
`;