import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import Card from '../components/Card';
import CreatePostForm from '../components/CreatePostForm';
import Text from '../components/Text';
import { fireAuth } from '../firebase/firebase';
import { createNewPost } from '../redux/actions/createPostAction';
import { fetchPosts } from '../redux/actions/getPostAction';
import { colors } from '../utils/theme';

const Newsfeed: React.FC<any> = ({ 
  getPosts, 
  navigation,
  posts, 
  setShowOptions, 
  setCommentMode, 
  setEditPost,
}) => {

  useEffect(() => {
    getPosts()
  }, [])

  const [postFormVisible, setPostFormVisible] = useState(false);

  return (
    <>

      { postFormVisible && <CreatePostForm onPress={() => setPostFormVisible(!postFormVisible)} /> }

      <Container>
        <AppHeader>
          <Text color='primary' fontSize={28} fontWeight='semi-bold'>Newsfeed</Text>
          <ButtonArea>
            <Button color='white' expand='none' height={35}  width={100} fontSize={14} fill='danger' right={16} onPress={() => setPostFormVisible(!postFormVisible)}>
              New Post
            </Button>
            <ProfileButton onPress={() => navigation.navigate('profile')}>
              <Icon source={{ uri: fireAuth.currentUser.photoURL }} />
            </ProfileButton>
          </ButtonArea>
        </AppHeader>

        <ScrollView>
          <Content>
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
                  profileImage={postOwner.profileImage}
                />
              )
            })
          }
          </Content>
        </ScrollView>
      </Container>
    </>
  )
};

const mapStateToProps = (state) => ({
  posts: state.posts.data,
  profileImage: state.userProfile.profileImage,
})

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(fetchPosts()),
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

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);

const Container = styled.View`
  flex: 1;
`;

const ButtonArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const ProfileButton = styled.TouchableOpacity`
  box-shadow: 0 4px 12px rgba(0,0,0, 0.15); 
  height: 38px;
  width: 38px;
`;

const Icon = styled.Image`
  border-radius: 19px;
  background: ${colors.primary};
  border-width: 1px;
  border-color: ${colors.white};
  height: 38px;
  width: 38px;
`;

const Content = styled.View`
  position: relative;
  z-index: 9;
`;