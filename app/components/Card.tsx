import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import Text from './Text';
import Button from './Button';

interface CardI {
  setShowOptions: () => void
  setEditPost: () => void
  setCommentMode: () => void
  posts: Array<any>
  description: string
  comments: any
  commentMode: boolean
  editPost: boolean
  imageUrl: string
  likes: number
  postOwner: string
  postId: string
  showOptions: boolean
  username: string
  handleShowOptions: () => void
  profileImage,
}

const Card: React.FC<CardI> = ({
  setEditPost,
  username,
  commentMode,
  comments,
  editPost,
  description, 
  imageUrl,
  likes,
  postId,
  showOptions,
  handleShowOptions,
  setCommentMode,
  profileImage,
}) => {
  return (
    <Container>
      <Header>
        <GroupItem>
          <Icon source={{ uri: profileImage }} />
          <Text fontSize={16} left={10} fontWeight='semi-bold'>{username ? username : 'N/A'}</Text>
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
                onPress={() => setEditPost()} 
                width={80}>
                  Edit
              </Button>
            </OptionsButtonGroup>
          }
          <Ionicons 
            color={colors.primary} 
            name='ios-options' 
            size={24} 
            onPress={() => handleShowOptions()} 
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
          onPress={() => setCommentMode()} 
          width={40}>
            Comment
        </Button>
      </ActionButtons>

      <CommentSection>
        <GroupItem>
          { !commentMode ?
            <>
              { comments
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
};

export default Card;

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
  border-radius: 19px;
  background: ${colors.primary};
  height: 38px;
  width: 38px;
`;

const Content = styled.View`

`;

const Description = styled.Text`
  line-height: 19px;
  margin: 10px 0;
  padding-left: 10px;
  padding-right: 10px;
`;

const ImagesContainer = styled.View`
  background: #ebebeb;
  margin-top: 2px;
`;

const Image = styled.Image`
  height: 300px;
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