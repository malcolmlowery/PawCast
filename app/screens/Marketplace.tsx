import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Button from '../components/Button';
import PremiumCard from '../components/PremiumCard';
import Text from '../components/Text';
import { colors } from '../utils/theme';


const fakeData = [
  {
    displayName: 'Daniel Martinez',
    dogType: 'Doberman',
    specialty: 'Breeder',
    desc: 'The Dobermann, or Doberman Pinscher in the United States and Canada, is a medium-large breed.',
    postImages: [
      'https://scontent.fmia1-2.fna.fbcdn.net/v/t1.0-9/116813737_2365641817074574_2228343714345378971_o.jpg?_nc_cat=110&ccb=2&_nc_sid=e3f864&_nc_ohc=Mf0GlFrYbq8AX9j5zOf&_nc_ht=scontent.fmia1-2.fna&oh=dc0dbd7e62c9f90c2125ad4cb2a0da55&oe=5FFBFAFB'
    ],
    postOwner: {
      location: {
        city: 'Racine',
        state: 'WI'
      },
      verified: true,
      profileImage: 'https://i.pinimg.com/originals/6b/33/e0/6b33e05a6fb6eef0f45a493bf6ec0be4.jpg',
    }
  },
  {
    displayName: 'Malcolm Lowery',
    dogType: 'Doberman',
    specialty: 'Trainer',
    desc: 'I have American pure breed Dobermann I am looking to breed',
    postImages: [
      'https://www.mypets.net.au/wp-content/uploads/2019/05/Doberman-Pinscher-%E2%80%93-Dobermann.jpg'
    ],
    postOwner: {
      location: {
        city: 'Fort Lauderdale',
        state: 'FL'
      },
      verified: true,
      profileImage: 'https://scontent.fmia1-1.fna.fbcdn.net/v/t1.0-9/22449965_2001742866776403_2777850263476188422_n.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=BGCQbo1IZ4UAX82HOBb&_nc_ht=scontent.fmia1-1.fna&oh=aa0399168c9bce947226ae67a5e24c10&oe=5FFA0D1A',
    }
  },
  {
    displayName: 'Malani Ki',
    dogType: 'Doberman',
    specialty: 'Veterinarian',
    desc: 'I have American pure breed Dobermann I am looking to breed',
    postImages: [
      'https://precisionk9work.com/wp-content/uploads/2017/10/dobermann.jpg'
    ],
    postOwner: {
      location: {
        city: 'Maimi',
        state: 'FL'
      },
      verified: true,
      profileImage: 'https://diy-magazine.s3.amazonaws.com/d/diy/Artists/G/Girl-In-red/Girl-in-Red_-by-Chris-Almeida-1.png',
    }
  }
]

const DropDown = ({ 
  labels, 
  onValueChange, 
  title,
}) => {
  return (
    <View 
      style={{ 
        alignItems: 'flex-end'
      }}
    >
      <View 
      style={{ 
        backgroundColor: colors.primary, 
        width: 170, 
        borderRadius: 3, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end' 
      }}>
    <Text fontWeight='semi-bold' color='white' fontSize={15} left={4}>{title}</Text>
    <View 
      style={{ 
        padding: 8, 
        backgroundColor: '#f4f4f4', 
        width: 120,
        marginLeft: 10,
      }}
    >
      <RNPickerSelect
        onValueChange={(value) => onValueChange(value)}
        items={labels}
      />
    </View>
    </View>
    </View>
  )
};

const Marketplace = ({
  navigation,
  user
}) => {

  const [filterBy, setFilterBy] = useState('');

  return (
    <Container>
      <Header>
        <Text 
          color='primary' 
          fontSize={32} 
          fontWeight='bold'
          position='relative'
          left={10}>
            Marketplace
        </Text>
        <HeaderOptions>
          { user.premium_user ?
            <Button marginLeft={17} color='white' expand='none' height={35}  width={100} fontSize={14} fill='primary' right={16} onPress={() => setPostFormVisible(!postFormVisible)}>
              New Post
            </Button>
           :
            <Button color='alert' fill='none' fontSize={14} expand='none' onPress={() => navigation.push('premium-signup')}>Become a Member</Button>
          }
          <DropDown 
            title='Filter'
            labels={[
              { label: 'Breeders', value: 'breeders' },
              { label: 'Trainers', value: 'trainers' },
              { label: 'Veterinarian', value: 'veterinarian' },
            ]} 
            onValueChange={(value) => setFilterBy(value)} 
          />
        </HeaderOptions>
      </Header>

      <Content>
        <ScrollView style={{ paddingTop: 10 }}>
        { fakeData &&
          fakeData.map((post, index) => {
            
            const specialtyColor = () => {
              if(post.specialty === 'Breeder') {
                return colors.primary
              }
              if(post.specialty === 'Trainer') {
                return '#9c27b0'
              }
              if(post.specialty === 'Veterinarian') {
                return '#26a69a'
              } else {
                return colors.primary
              }
            }

            return (
              <PremiumCard
                key={index}
                navigationToProfile={() => navigation.push('premium-profile')}
                profileImage={post.postOwner.profileImage}
                desc={post.desc}
                specialty={post.specialty}
                verified={post.postOwner.verified}
                city={post.postOwner.location.city}
                state={post.postOwner.location.state}
                postImages={post.postImages}
                displayName={post.displayName}
                dogType={post.dogType}
                capsuleColor={specialtyColor()}
              />
            )
          })
        }
        </ScrollView>
      </Content>
    </Container>
  )
};

const mapStateToProps = (state) => ({
  user: state.user.user
})

export default connect(mapStateToProps, null)(Marketplace);

const Container = styled.View`
  flex: 1;
  background: #fff;
`;  

const Header = styled.View`
  padding-top: 50px;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
`;

const Content = styled.View`
  background-color: #fff;
  flex: 1;
`;

const HeaderOptions = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;
  padding-bottom: 6px;
  padding: 0 10px;
`;