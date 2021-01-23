import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Text from '../components/Text';
import AppHeader from '../components/AppHeader';
import { colors } from '../utils/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { getMessages } from '../redux/actions/messageActions';
import { RefreshControl } from 'react-native';
import { fireAuth, fireStore } from '../firebase/firebase';
import { getAllMessages } from '../redux/Messages/MessagesActions';

const Messages = ({
  getAllMessages,
  messages,
  navigation,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [messagess, setMessages] = useState(null);
  
  useEffect(() => {
    fireStore
      .collection('messages')
      .where('members', 'array-contains', fireAuth.currentUser.uid)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push(doc.data())
        })
        setMessages(data)
      })
  }, [])

  return (
    <Container>

      <AppHeader>
        <Text color='primary' fontSize={28} fontWeight='semi-bold'>Messages</Text>
      </AppHeader>
      <ScrollView style={{ marginTop: 3 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
        fireStore
        .collection('messages')
        .where('members', 'array-contains', fireAuth.currentUser.uid)
        .get()
        .then(snapshot => {
          const data = [];
          snapshot.forEach(doc => {
            data.push(doc.data())
          })
          setMessages(data)
        })
      }} />}>
        { messagess &&
          messagess.map((message, index) => {
            const { firstName, lastName, profileImage, userId } = message.userInfo[1];
            const userInfo = message.userInfo.find(user => user.userId !== fireAuth.currentUser.uid)
            const otherUser = message.members.find(user => user !== fireAuth.currentUser.uid)
            return (
              <ItemGroup key={index} onPress={() => {
                navigation.navigate('chatroom', {
                  userProfileId: otherUser,
                })
              }}>
                <ItemLabel>
                  <UserAvatar source={{ uri: userInfo.profileImage }} />
                  <Text fontSize={15} fontWeight='semi-bold'>{userInfo.firstName} {userInfo.lastName}</Text>
                </ItemLabel>
                <Message>

                </Message>
              </ItemGroup>
            )
          })
        }
      </ScrollView>

    </Container>
  )
};

const mapStateToProps = (state) =>({
  messages: state.messages.data,
});

const mapDispatchToProps = (dispatch) =>({
  getAllMessages: () => dispatch(getAllMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

const Container = styled.View`
  flex: 1;
`;

const TitleArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const ItemGroup = styled.TouchableOpacity`
  background: #fff;
  margin: 3px 10px;
  padding: 8px;
  border-radius: 8px;
`;

const ItemLabel = styled.View`
  align-items: center;
  flex-direction: row;
`;

const UserAvatar = styled.Image`
  border-radius: 18px;
  height: 36px;
  width: 36px;
  margin-right: 10px;
`;

const Message = styled.View`

`;