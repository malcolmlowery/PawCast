import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import Card from '../components/Card';
import Text from '../components/Text';
import { createNewPost } from '../redux/actions/createPostAction';
import { fetchPosts } from '../redux/actions/getPostAction';
import { colors } from '../utils/theme';

const Newsfeed: React.FC<any> = ({ createPost, getPosts }) => {

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Container>
      <AppHeader>
        <Text color='primary' fontSize={28} fontWeight='semi-bold'>Newsfeed</Text>
        <ButtonArea>
          <Button color='white' expand='none' height={35}  width={100} fontSize={14} fill='danger' right={16} onPress={() => createPost()}>
            New Post
          </Button>
          <Icon source={{ uri: 'https://scontent.fmia1-2.fna.fbcdn.net/v/t1.0-9/48417117_10218162259391995_2600251369403187200_o.jpg?_nc_cat=100&ccb=2&_nc_sid=8bfeb9&_nc_ohc=yedBXjrPqM8AX960e2c&_nc_ht=scontent.fmia1-2.fna&oh=516e2a1ef08c51e59da99ad55795adf4&oe=5FCF05F7' }} />
        </ButtonArea>
      </AppHeader>

        <ScrollView>
      <Content>
        <Card />
      </Content>
        </ScrollView>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => ({
  createPost: () => dispatch(createNewPost()),
  getPosts: () => dispatch(fetchPosts())
});

export default connect(null, mapDispatchToProps)(Newsfeed);

const Container = styled.View`
  flex: 1;
`;

const ButtonArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Icon = styled.Image`
  height: 38px;
  width: 38px;
  border-radius: 19px;
  background: ${colors.primary};
`;

const Content = styled.View`
  position: relative;
  z-index: 9;
`;