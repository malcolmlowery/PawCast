import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import Button from './Button';
import Text from './Text';
import { createNewPost } from '../redux/actions/createPostAction';

const CreatePostForm = ({ createPost, creatingPost, visible }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    let result: any = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    
    if(permissionResult.granted === false) {
      return (
        Alert.alert(
          'Permission Denied',
          'Permission to access camera roll is required!'
        )
      )
    }
        
    if(!result.cancelled) {
      setImage(result.uri)
    }
  }

  const onSubmit = async () => {
    const userInput = { description, image };
    createPost(userInput).then(() => visible(false))
  }

  return (
    <>
      <Backdrop />
      <Container onStartShouldSetResponder={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior='position' contentContainerStyle={{ paddingBottom: 30 }}>
          <Card>
            <CardHeader>
              <Text color='primary' fontSize={18} fontWeight='semi-bold'>New Post</Text>
            </CardHeader>

            <Content>
              <TextInput multiline={true} onChangeText={(text) => setDescription(text)} value={description} />
              <ImageSection>
                <Icon onPress={() => openImagePicker()}>
                  <Text fontSize={12}>Add Image</Text>
                  <Ionicons color={colors.primary} name='ios-add-circle' size={48} />
                </Icon>
                { image !== null ?
                  <ImagePreview source={{ uri: image }} />  
                  :
                  <ImagePreview />  
                }
              </ImageSection>
            </Content>

            { creatingPost == true ?
                <Wait>
                  <Text>Creating post...</Text>
                </Wait>
              :
                <ButtonGroup>
                  <Button
                    color='white' 
                    fill='danger' 
                    expand='none'
                    height={34}
                    onPress={visible}
                    width={145}>
                      Cancel
                  </Button>
                  <Button 
                    color='white' 
                    fill='primary' 
                    expand='none'
                    height={34}
                    marginBottom={10}
                    onPress={() => onSubmit()}
                    width={145}>
                      Post
                  </Button>
                </ButtonGroup>
            }
            
          </Card>
        </KeyboardAvoidingView>
      </Container>
    </>
  )
};

const mapStateToProps = (state) => ({
  creatingPost: state.posts.creatingPost
})

const mapDispatchToProps = (dispatch) => ({
  createPost: (userInput) => dispatch(createNewPost(userInput)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostForm);

const Backdrop = styled.View`
  background: #000;
  flex: 1;
  height: 100%;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  z-index: 10;
`;
const Container = styled.View`
  align-items: center;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 11;
`;

const Card = styled.View`
  align-items: center;
  background: ${colors.white};
  box-shadow: 0 4px 24px rgba(0,0,0, 0.05);
  border-radius: 8px;
  padding: 10px;
  width: 320px;
`;

const CardHeader = styled.View`
  align-items: center;
`;

const Content = styled.View`
  width: 100%;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const TextInput = styled.TextInput`
  background: #ebebeb;
  border-radius: 8px;
  height: 140px;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
`;

const Icon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 70px;
`;

const ImageSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
  width: 100%;
`;

const ImagePreview = styled.Image`
  background: #ebebeb;
  border-radius: 8px;
  height: 100px;
  width: 100px;
`

const Wait = styled.View`
  align-items: center;
  height: 40px;
  justify-content: center
`;