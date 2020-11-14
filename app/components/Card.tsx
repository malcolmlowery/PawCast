import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import Text from './Text';
import Button from './Button';
import { connect } from 'react-redux';

interface CardI {
  setShowOptions: (a , b) => void
  setEditPost: (a , b) => void
  setCommentMode: (a , b) => void
  posts: Array<any>
}

const Card: React.FC<CardI> = ({
  setShowOptions,
  setEditPost,
  setCommentMode,
  posts,
}) => {
  return (
    <>
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

        // console.log(post)
        
        return (
          <Container key={index}>
            <Header>
              <GroupItem>
                <Icon />
                <Text fontSize={16} left={10} fontWeight='semi-bold'>{postOwner ? postOwner.name : 'N/A'}</Text>
              </GroupItem>
    
              <GroupItem>
                { !showOptions ?
                  <Text fontSize={14} fontWeight='semi-bold' right={10}>{likes} Likes</Text>
                  :
                  <OptionsButtonGroup>
                    <Button color='danger' expand='none' fill='none' fontSize={13} width={50}>Delete</Button>
                    <Button 
                      color='danger' 
                      expand='none' 
                      fill='none' 
                      fontSize={13} 
                      onPress={() => setEditPost(editPost, postId)} 
                      width={80}>
                        Edit
                    </Button>
                  </OptionsButtonGroup>
                }
                <Ionicons 
                  color={colors.primary} 
                  name='ios-options' 
                  size={24} 
                  onPress={() => setShowOptions(showOptions, postId)} 
                />
              </GroupItem>
            </Header>
    
            <Content>
              { !editPost ?
                <Description>{description}</Description>
                :
                <EditDescriptionGroup>
                  <DescriptionTextInput multiline={true} value={description} />
                  <Button>Update</Button>
                </EditDescriptionGroup>
              }
              <ImagesContainer>
                <Image source={{ uri: imageUrl }} />
              </ImagesContainer>
            </Content>
    
            <ActionButtons>
              <Button color='primary' fill='none' fontWeight='bold'>Like</Button>
              <Button 
                color='primary' 
                fill='none' 
                fontWeight='bold' 
                onPress={() => setCommentMode(commentMode, postId)} 
                width={40}>
                  Comment
              </Button>
            </ActionButtons>
    
            <CommentSection>
              <GroupItem>
                { !commentMode ?
                  <>
                    { comments[0]
                      ?
                      <>
                        <CommentIcon />
                        <CommentInfo>
                          <Text fontSize={13} left={10} fontWeight='semi-bold'>{comments[0]?.commentOwner.name}</Text>
                          <Text fontSize={13} left={10}>{comments[0]?.comment}</Text>
                        </CommentInfo>
                      </>
                      :
                      <Text>No Comments</Text>
                    }
                  </>
                  :
                  <>
                    <AddCommentContainer>
                      <TextInput multiline={true} />
                      <Button expand='none' height={36} width={80}>Post</Button>
                    </AddCommentContainer>
                  </>
                  
                }
              </GroupItem>
            </CommentSection>
    
          </Container>
        )
      })
    }
    </>
  )
};

const mapStateToProps = (state) => ({
  posts: state.posts.data
})

const mapDispatchToProps = (dispatch) => ({
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);

const Container = styled.View`
  background: ${colors.white};
  box-shadow: 0 4px 24px rgba(0,0,0, 0.05);
  border-radius: 8px;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

const GroupItem = styled.View`
  align-items: center;
  flex-direction: row;
`;

const OptionsButtonGroup = styled.View`
  flex-direction: row;
`;

const Icon = styled.Image`
  height: 38px;
  width: 38px;
  border-radius: 19px;
  background: ${colors.primary};
`;

const Content = styled.View`

`;

const Description = styled.Text`
  line-height: 17px;
  margin: 10px 0;
  padding-left: 10px;
  padding-right: 10px;
`;

const ImagesContainer = styled.View`
  background: #ebebeb;
  margin-top: 2px;
`;

const Image = styled.Image`
  height: 200px;
`;

const ActionButtons = styled.View`
  flex-direction: row;
`;

const CommentSection = styled.View`
  border-top-width: 1px;
  border-color: #ebebeb;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const CommentIcon = styled.Image`
  height: 28px;
  width: 28px;
  border-radius: 14px;
  background: ${colors.primary};
`;

const CommentInfo = styled.View`
`;

const AddCommentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const TextInput = styled.TextInput`
  background: #ebebeb;
  border-radius: 8px;
  max-height: 120px;
  padding: 10px 10px;
  width: 75%;
`;

const EditDescriptionGroup = styled.View`
  margin: 10px 0;
  padding-left: 10px;
  padding-right: 10px;
`;

const DescriptionTextInput = styled.TextInput`
  background: #ebebeb;
  border-radius: 8px;
  max-height: 120px;
  margin-bottom: 10px;
  padding: 10px 10px;
`;