import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
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
import { fireAuth, fireStorage, fireStore } from '../firebase/firebase';
import uuid from 'react-uuid';
import { addCommentToPost } from '../redux/actions/getPostAction';
import { deletePost, likePost, updatePost } from '../redux/actions/createPostAction';

const Profile = ({ 
  dogs,
  navigation, 
  getUserPosts, 
  isLoading,
  posts, 
  setShowOptions, 
  setCommentMode, 
  setEditPost,
  userInfo,
  route,
  addComment,
  updatePost,
  likePost,
}) => {

  useEffect(() => {
    getUserPosts(route.params.uid)
  }, [])

  const [postFormVisible, setPostFormVisible] = useState(false);
  const [addDogFormVisible, setAddDogFormVisible] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);

  const openImagePicker = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      base64: true
    })

    if(!result.cancelled) {
      const imageBlob = await fetch(result.uri).then(res => res.blob());

      fireStorage
        .ref()
        .child(`banners/bannerImg-${uuid()}`)
        .put(imageBlob)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL()
        })
        .then(url => {
          fireStore.collection('users').where('userId', '==', userInfo?.userId).get().then(snapshot => {
            snapshot.forEach(doc => doc.ref.update({ bannerImage: url }))
          })
          setBannerImage(url)
        })
    }
  }

  return (
    <>
    { addDogFormVisible && <AddDogForm dogCreated={() => setAddDogFormVisible(!addDogFormVisible)} onPress={() => setAddDogFormVisible(!addDogFormVisible)} /> }
    { postFormVisible && <CreatePostForm onPress={() => setPostFormVisible(!postFormVisible)} /> }
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
              <BannerImage source={{ uri: bannerImage !== null ? bannerImage : userInfo?.bannerImage  }} />
              { route.params.uid === fireAuth.currentUser.uid &&
                <BannerButton onPress={() => openImagePicker()}>
                  <Ionicons 
                    color={colors.primary} 
                    name='ios-camera'
                    size={34} 
                    onPress={() => {}}
                  />
                </BannerButton>
              }
            </Banner>
            
            { !isLoading ?
              <ProfileImageContainer>
                <ProfileImage source={{ uri: userInfo?.profileImage }} />
              </ProfileImageContainer>
              :
              <ProfileImageContainer>
                <ProfileImage source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pawcast-app-6daf2.appspot.com/o/empty-profile.png?alt=media&token=4675b524-e098-4876-9f38-dabddc0bafac' }} />
              </ProfileImageContainer>
            }

            { !isLoading ?
              <UserInfo>
                { userInfo?.firstName ?
                  <Text color='darkText' fontSize={28} fontWeight='semi-bold'>{userInfo?.firstName} {userInfo?.lastName}</Text> 
                  :
                  <Text color='darkText' fontSize={28} fontWeight='semi-bold'>{fireAuth.currentUser.displayName}</Text>
                }
                <Location>
                  <Text color='darkText' fontSize={16} fontWeight='semi-bold'>{userInfo.city}, {userInfo.state} - {userInfo?.zipcode}</Text>
                </Location>
              </UserInfo>
              :
              <UserInfo>
                <Text>Loading...</Text>
              </UserInfo>
            }

            { route.params.uid === fireAuth.currentUser.uid &&
              <ButtonGroup>
                <Button color='white' expand='none' fill='primary' fontSize={14} width={170} onPress={() => setAddDogFormVisible(!addDogFormVisible)}>Add a Pet</Button>
                <Button color='white' expand='none' fill='danger' fontSize={14} width={170}  onPress={() => setPostFormVisible(!postFormVisible)}>New Post</Button>
              </ButtonGroup>
            }

            <PetsContainer>
              <Text fontSize={18} fontWeight='semi-bold' left={10}>My Pets</Text>
              <ScrollView horizontal={true} style={{ height: 130 }} showsHorizontalScrollIndicator={false}>
                { dogs ?
                  dogs.map((dog, index) => {
                    return (
                      <PetItem key={index} onPress={() => navigation.push('petDetails', {
                        dog
                      })}>
                        <PatImage source={{ uri: dog.images[0] }} />
                        <Text top={6}>{dog.name}</Text>
                      </PetItem>
                    )
                  })
                  :
                  <PetItem>
                    <PatImage style={{ backgroundColor: colors.danger }} />
                    <Text top={6}>No pets listed</Text>
                  </PetItem>
                }
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
                    likesByUsers,
                    likedByCurrentUser,
                  }: any = post;
                  
                  const liked = () => {
                    const userLike = likesByUsers.find(userLike => userLike == fireAuth.currentUser.uid) 
                    if(userLike == likedByCurrentUser) {
                      console.log(false)
                      return false
                    }
                    if(userLike !== likedByCurrentUser) {
                      console.log(true)
                      return true
                    }
                  }

                  return (
                    <Card 
                      key={index}
                      description={description}
                      username={postOwner.name}
                      imageUrl={imageUrl}
                      likes={likes}
                      onLikePost={() => likePost(postId)}
                      commentMode={commentMode}
                      addCommentToPost={(text) => addComment({postId, comment: text})}
                      editPost={editPost}
                      showOptions={showOptions}
                      handleShowOptions={() => setShowOptions(showOptions, postId)}
                      comments={comments[0]}
                      setCommentMode={() => setCommentMode(commentMode, postId)}
                      setEditPost={() => setEditPost(editPost, postId)}
                      profileImage={postOwner.profileImage}
                      navigateToPostDetails={() => navigation.push('postDetails', {
                        post: post
                      })}
                      navigateToUserProfile={() => navigation.push('profile', { uid: postOwner.uid })}
                      onPressDelete={() => deletePost(postId)}
                      onUpdatePost={(text) => updatePost({ description: text, postId })}
                      liked={liked}
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
  isLoading: state.userProfile.isLoading,
  dogs: state.userProfile.dogs,
  dogCreated: state.userProfile.dogCreated,
  userInfo: state.userProfile.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserPosts: (uid) => dispatch(fetchUserPosts(uid)),
  addComment: (commentData) => dispatch(addCommentToPost(commentData)),
  deletePost: (postId) => dispatch(deletePost(postId)),
  likePost: (postId) => dispatch(likePost(postId)),
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
  }),
  updatePost: (userInput) => dispatch(updatePost(userInput))
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
  padding-bottom: 20px;
`;

const Banner = styled.View`
  background: ${colors.primary};
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
  padding-top: 12px;
`;

const PetItem = styled.TouchableOpacity`
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

const BannerButton = styled.TouchableOpacity`
  align-items: center;
  background: #fff;
  border-radius: 25px;
  bottom: 10px;
  height: 50px;
  justify-content: center;
  position: absolute; 
  right: 10px;
  width: 50px;
`;