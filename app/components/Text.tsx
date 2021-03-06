import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../utils/theme';

interface TextI {
  bottom?: number
  color?: 'primary' | 'secondary' | 'alert' | 'danger' | 'white' | 'darkText' | 'lightGray'
  children: any
  fontWeight?: 'normal' | 'semi-bold' | 'bold'
  fontSize?: number
  left?: number
  marginLeft?: number
  marginRight?: number
  position?: 'relative' | 'absolute'
  right?: number
  top?: number
  onPress?: () => void
}

const Text: React.FC<TextI> = ({ 
  bottom,
  color,
  children,
  fontWeight,
  fontSize,
  left,
  marginLeft,
  marginRight,
  position,
  right,
  top,
  onPress
}) => {

  const fntWeight = () => {
    switch(fontWeight) {
      case 'bold': return '700'
      case 'semi-bold': return '500'
      case 'normal': return '400'
    }
  }

  const fontColor = () => {
    switch(color) {
      case 'primary': return colors.primary
      case 'secondary': return colors.secondary
      case 'alert': return colors.alert
      case 'danger': return colors.danger
      case 'white': return colors.white
      case 'darkText': return colors.darkText
      case 'lightGray': return colors.lightGray
    }
  }

  return (
    <TextComp 
      style={{
        bottom,
        color: fontColor(),
        fontSize,
        fontWeight: fntWeight(),
        left,
        position,
        right,
        top,
      }}
      onPress={onPress}
    >
      {children}
    </TextComp>
  )
};

export default Text;

const TextComp = styled.Text`
  font-size: 28px;
  font-weight: 500;
`;