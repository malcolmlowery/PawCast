import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import Text from '../components/Text';
import { ScrollView } from 'react-native-gesture-handler';

const PostDetails = ({ navigation, route }) =>  { 

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
  } = route.params.post;

  return (
    <Container>
      <AppHeader>
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
        <Banner>
          <PostOwner onPress={() => navigation.push('profile', { uid: postOwner.uid })}>
            <PostOwnerIcon source={{ uri: postOwner.profileImage }} />
            <Text fontWeight='semi-bold'>{postOwner.name}</Text>
          </PostOwner>
          <Likes>
            <Text fontWeight='semi-bold'>{likes} likes</Text>
          </Likes>
          <BannerImage source={{ uri: imageUrl }} />

          <Description>
            <Text>{description}</Text>
          </Description>
          <ActionButtons>

            <Button color='primary' fill='none' fontWeight='bold'>Like</Button>
              <Button 
                color='primary' 
                fill='none' 
                fontWeight='bold' 
                onPress={() => {}} 
                width={40}>
                  Comment
            </Button>
          </ActionButtons>
        </Banner>

        <Comments>
          { comments ? 
            comments.map((comment, index) => {
              return (
                <Comment> 
                  <CommentOwner onPress={() => navigation.push('profile', { uid: comment.commentOwner.uid })}>
                    <PostOwnerIcon source={{ uri: comment.commentOwner.profileImage }} />
                    <Text fontWeight='semi-bold'>{comment.commentOwner.name}</Text>
                  </CommentOwner>
                  <CommentDesc>
                    <Text>{comment.comment}</Text>
                  </CommentDesc>
                </Comment>
              )
            })
            :
            <Comment>
              <Text>No Comments</Text>
            </Comment>
          }
        </Comments>
      </ScrollView>
    </Container>
  )
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);

const Container = styled.View`
  flex: 1;
`;

const TitleArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Banner = styled.View`
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0, 0.05);
  margin-bottom: 10px;
`;

const BannerImage = styled.Image`
  height: 250px;
`;

const Description = styled.View`
  background: #fff;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  padding: 16px 10px;
`;

const ActionButtons = styled.View`
border-top-width: 1px;
border-color: #ebebeb;
  flex-direction: row;
`;

const Likes = styled.View`
  background: #fff;
  border-radius: 20px;
  padding: 6px 10px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 999;
`;

const PostOwner = styled.TouchableOpacity`
  align-items: center;
  background: #fff;
  border-radius: 30px;
  flex-direction: row;
  left: 10px;
  opacity: .85;
  padding: 8px 10px;
  position: absolute;
  top: 10px;
  z-index: 999;
`;

const PostOwnerIcon = styled.Image`
  border-radius: 25px;    
  margin-right: 8px;
  height: 24px;
  width: 24px;
`;

const Comments = styled.View`
  margin: 0 10px;
  box-shadow: 0 4px 12px rgba(0,0,0, 0.05);
`;

const Comment = styled.View`
  background: #fff;
  border-radius: 16px;
  margin-top: 10px;
`;

const CommentOwner = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 8px 10px;
`;

const CommentDesc = styled.View`
  margin: 0 10px;
  padding-bottom: 12px;
`;