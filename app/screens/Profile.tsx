import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import Text from '../components/Text';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import Card from '../components/Card';
import { ScrollView } from 'react-native-gesture-handler';
import CreatePostForm from '../components/CreatePostForm';
import { connect } from 'react-redux';
import { fetchUserPosts } from '../redux/actions/userProfileAction';
import AddDogForm from '../components/AddDogForm';

const Profile = ({ 
  navigation, 
  getUserPosts, 
  posts, 
  setShowOptions, 
  setCommentMode, 
  setEditPost,
  profileImage,
}) => {

  useEffect(() => {
    getUserPosts()
  }, [])

  const [postFormVisible, setPostFormVisible] = useState(false);
  const [addDogFormVisible, setAddDogFormVisible] = useState(false);

  return (
    <>
    { addDogFormVisible && <AddDogForm onPress={() => setAddDogFormVisible(!addDogFormVisible)} /> }
    { postFormVisible && <CreatePostForm onPress={() => setPostFormVisible(!postFormVisible)} /> }
      <Container>
        <AppHeader height={100}>
          <TitleArea onStartShouldSetResponder={() => navigation.pop()}>
            <Ionicons 
              color={colors.primary} 
              name='ios-arrow-back' 
              size={30} 
            />
            <Text color='primary' fontSize={18} fontWeight='semi-bold' left={10}>Newsfeed</Text>
          </TitleArea>
          <Ionicons 
            color={colors.primary} 
            name='ios-mail' 
            size={32} 
            onPress={() => navigation.navigate('profile')}
          />
        </AppHeader>

        <ScrollView style={{ marginBottom: 40 }}>
          <Content>
            <Banner>
              <BannerImage />
            </Banner>

            <ProfileImageContainer>
              <ProfileImage source={{ uri: profileImage }} />
            </ProfileImageContainer>

            <UserInfo>
              <Text color='darkText' fontSize={28} fontWeight='semi-bold'>Malcolm Lowery</Text>
              <Location>
                <Text color='darkText' fontSize={16} fontWeight='semi-bold'>Fort Lauderdale, FL</Text>
              </Location>
            </UserInfo>

            <ButtonGroup>
              <Button color='white' expand='none' fill='primary' fontSize={14} width={170} onPress={() => setAddDogFormVisible(!addDogFormVisible)}>Add a Pet</Button>
              <Button color='white' expand='none' fill='danger' fontSize={14} width={170}  onPress={() => setPostFormVisible(!postFormVisible)}>New Post</Button>
            </ButtonGroup>

            <PetsContainer>
              <Text fontSize={18} fontWeight='semi-bold' left={10}>My Pets</Text>
              <ScrollView horizontal={true} style={{ height: 130 }}>
                <PetItem>
                  <PatImage />
                  <Text top={6}>Name</Text>
                </PetItem>
              </ScrollView>
            </PetsContainer>

            <PostsContainer>
              { posts &&
                posts.map((post, index) => {

                  const { 
                    comments,
                    commentMode,
                    editPost,
                    description, 
                    imageUrl,
                    likes,
                    postOwner,
                    postId,
                    showOptions,
                  }: any = post;

                  return (
                    <Card 
                      key={index}
                      description={description}
                      username={postOwner.name}
                      imageUrl={imageUrl}
                      likes={likes}
                      commentMode={commentMode}
                      editPost={editPost}
                      showOptions={showOptions}
                      handleShowOptions={() => setShowOptions(showOptions, postId)}
                      comments={comments[0]}
                      setCommentMode={() => setCommentMode(commentMode, postId)}
                      setEditPost={() => setEditPost(editPost, postId)}
                    />
                  )
                })
              }
            </PostsContainer>
          </Content>
        </ScrollView>
      </Container>
    </>
  )
};

const mapStateToProps = (state) => ({
  profileImage: state.userProfile.profileImage,
  posts: state.userProfile.data,
});

const mapDispatchToProps = (dispatch) => ({
  getUserPosts: () => dispatch(fetchUserPosts()),
  setShowOptions: (showOptions, postId) => dispatch({
    type: 'SHOW_OPTIONS_MODE',
    payload: { showOptions, postId }
  }),
  setEditPost: (editPost, postId) => dispatch({
    type: 'EDIT_DESC_MODE',
    payload: { editPost, postId }
  }),
  setCommentMode: (commentMode, postId) => dispatch({
    type: 'COMMENT_MODE',
    payload: { commentMode, postId }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const Container = styled.View`
  flex: 1;
`;

const TitleArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Content = styled.View`

`;

const Banner = styled.View`
  background: ${colors.primary};
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  height: 200px;
`;

const BannerImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const ProfileImageContainer = styled.View`
  align-items: center;
  height: 100px;
  position: absolute;
  top: 150px;
  width: 100%;
`;

const ProfileImage = styled.Image`
  background: ${colors.darkText};
  box-shadow: 0 4px 12px rgba(0,0,0, 0.15);
  border-radius: 100px;
  border-width: 3px;
  border-color: ${colors.white};
  height: 100px;
  width: 100px;
`;

const UserInfo = styled.View`
  align-items: center;
  height: 70px;
  justify-content: center;
  margin-top: 50px;
`;

const Location = styled.View`
  align-items: center;
  flex-direction: row;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  padding: 10px;
  justify-content: space-evenly;
`;

const PetsContainer = styled.View`
  padding-top: 10px;
`;

const PetItem = styled.View`
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0, 0.15);
  width: 150px;
  margin-top: 10px;
  margin-left: 10px;
`;

const PatImage = styled.Image`
  background: ${colors.primary};
  border-radius: 16px;
  height: 90px;
  width: 150px;
`;

const PostsContainer = styled.View`

`;