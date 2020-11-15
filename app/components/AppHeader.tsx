import React from 'react';
import styled from 'styled-components/native';

interface AppHeaderI {
  children: React.ReactNode
  height?: number
}

const AppHeader: React.FC<AppHeaderI> = ({ children, height= 120 }) => {
  return (
    <Container style={{ height }}>
      <Content>
        {children}
      </Content>
    </Container>
  )
};

export default AppHeader;

const Container = styled.View`
  background: #fff;
  box-shadow: 0 4px 24px rgba(0,0,0, 0.05);
  padding-top: 30px;
  position: relative;
  z-index: 10;
`;

const Content = styled.View`
  align-items: center;
  bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  padding: 0 12px;
  width: 100%;
`;