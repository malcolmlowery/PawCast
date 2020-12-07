import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../components/Button';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const PrivacyPolicy = ({ cancel }) => {

  const [data, setData] = useState('')

  useEffect(() => {
    fetch('https://www.iubenda.com/api/privacy-policy/34071821')
      .then(data => data.json())
      .then(res => {
        setData(res.content)
      })
      .catch(error => {console.log(error)})
  }, [])

  return (
    <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
        <Content>
          <WebView 
            originWhitelist={['*']}
            source={{ html: data }}
            style={{ 
              width: width - 10,
              borderRadius: 16,
              flex: 1,
              marginBottom: 10
            }}
          />
          <Button marginTop={10} expand='none' fill='alert' width={300} height={45} onPress={() => cancel()}>
            Close
          </Button>
        </Content>
      </ScrollView>
    </Container>
  )
};

export default PrivacyPolicy;

const Container = styled.View`
  height: ${height};
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const Content = styled.View`
  border-radius: 16px;
  background: #fff;
  height: ${height};
  width: 100%;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-top: 16px;
  padding-bottom: 10px;
`;