import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../utils/theme';
import Text from './Text';
import Button from './Button';

const PremiumCard = ({
  navigationToProfile,
  desc,
  profileImage,
  specialty,
  verified,
  city, 
  state,
  postImages,
  displayName,
  dogType,
  capsuleColor,
}) => {

  return (
      <Card>
        <Header>
          <UserInfo>
            <Image source={{ uri: profileImage }} />
            <Text color='darkText' fontWeight='semi-bold' fontSize={14} position='relative' left={10}>{displayName}</Text>
          </UserInfo>
          <Capsule style={{ backgroundColor: capsuleColor }}>
            <Text color='white' fontWeight='bold'>{specialty}</Text>
          </Capsule>
        </Header>
        <Content>
          

          { specialty === 'breeder' &&
            <Specialties>
              <Text color='lightGray'>~ {dogType}</Text>
              <Text color='lightGray'>~ {city}, {state}</Text>
              { verified &&
                <Capsule style={{ backgroundColor: colors.alert }}>
                  <Text fontSize={10} fontWeight='bold' color='white'>PENDING</Text>
                  <Text color='white'>Verification</Text>
                </Capsule>
              }
            </Specialties>
          }
          
          { desc !== '' && 
            <CardDesc>
              <Text>{desc}</Text>
            </CardDesc>
          }

          { postImages.length > 0 && 
            <CardImageGroup>
                <CardImage source={{ uri: postImages[0] }} />
            </CardImageGroup>
          }
          

          <ButtonGroup>
            <Button onPress={() => navigationToProfile()}>View Profile</Button>
          </ButtonGroup>
        </Content>
      </Card>
  )
};

export default PremiumCard;

const Card = styled.View`
  box-shadow: 0 4px 16px rgba(0,0,0, 0.1);
  background-color: ${colors.white};
  border-radius: 16px;
  margin: 0 10px;
  margin-bottom: 16px;
`;

const Header = styled.View`
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  padding-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`;

const Capsule = styled.View`
  align-items: center;
  border-radius: 20px;
  margin-left: 10px;
  padding: 5px 12px;
`;

const UserInfo = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Image = styled.Image`
  border-radius: 19px;
  height: 38px;
  background-color: ${colors.primary};
  width: 38px;
`;

const Content = styled.View`

`;

const Specialties = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

const CardDesc = styled.View`
  margin-top: 10px;
  padding: 0 10px 0 10px;
  margin-bottom: 6px;
`;

const CardImageGroup = styled.View`
  height: 200px;
  margin-top: 10px;
  padding: 0 10px 0 10px;
  width: 100%;
`;

const CardImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const ButtonGroup = styled.View`
  padding: 10px;
`;