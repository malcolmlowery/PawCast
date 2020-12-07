import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import Text from '../components/Text';
import { banUser, deleteReportedPost, getReportedData } from '../redux/actions/userReportingActions';
import { colors } from '../utils/theme';

const ReportedUsers = ({
  data,
  error,
  getReportedUserData,
  isLoading,
  deletePost,
  banUser,
}) => {

  useEffect(() => {
    getReportedUserData()
  }, [])


  return (
    <Container>

      <AppHeader>
        <Text color='primary' fontSize={28} fontWeight='semi-bold'>Reported Data</Text>
      </AppHeader>

      <ScrollView>
      { data &&
        data.map((post, i) => {

        // console.log(post)
          return (
            <Card key={i}>
              <Header>
                <ProfileImage source={{ uri: post.profileImage }} />
                <Text color='alert' marginLeft={30}>Posted by: {post.name}</Text>
              </Header>

              <Text>{post.description}</Text>

              { post.imageUrl !== '' && 
                <ImageContainer>
                  <Image source={{ uri: post?.imageUrl }} />
                </ImageContainer>
              }
              
              <ButtonGroup>
                <Button
                  fill='none'
                  color='primary'
                  fontWeight='bold'
                  marginBottom={10}
                  marginTop={10}
                >
                  ALLOW POST
                </Button>
                <Button
                  color='alert'
                  fill='none'
                  fontWeight='bold'
                  marginBottom={10}
                  onPress={() => deletePost({
                    postId: post.postId,
                    uid: post.uid
                  })}
                >
                  DELETE POST
                </Button>
                <Button
                  fill='alert'
                  fontWeight='bold'
                  onPress={() => banUser(post.uid)}
                >
                  BAN USER
                </Button>
              </ButtonGroup>
            </Card>
          )
        })
      }
      </ScrollView>

    </Container>
  )
};

const mapDispatchToProps = (dispatch) => ({
  getReportedUserData: () => dispatch(getReportedData()),
  deletePost: (postId) => dispatch(deleteReportedPost(postId)),
  banUser: (uid) => dispatch(banUser(uid))
}) 

const mapStateToProps = (state) => ({
  data: state.reportedUserData.data,
  isLoading: state.reportedUserData.isLoading,
  error: state.reportedUserData.error,
}) 

export default connect(mapStateToProps, mapDispatchToProps)(ReportedUsers);

const Container = styled.View`
  flex: 1;
  margin-bottom: 30px;;
`;

const Card = styled.View`
  background: ${colors.white};
  border-radius: 4px;
  margin: 10px 10px 0 10px;
  padding: 6px;
`;

const ButtonGroup = styled.View`
`;

const ImageContainer = styled.View`
  margin-top: 10px;   
  height: 200px;
  width: 100%;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ProfileImage = styled.Image`
  height: 44px;
  width: 44px;
  border-radius: 22px;
`;