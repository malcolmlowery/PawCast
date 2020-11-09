import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../utils/theme';

interface ButtonI {
  color?: 'primary' | 'secondary' | 'alert' | 'danger' | 'white'
  children: string,
  expand?: 'block' | 'none'
  fill?: 'primary' | 'secondary' | 'alert' | 'danger' | 'none'
  fontSize?: number
  fontWeight?: 'normal' | 'semi-bold' | 'bold'
  marginTop?: number
  marginBottom?: number
  onPress?: () => void
  width?: number
}

const Button: React.FC<ButtonI> = ({
  children,
  color = 'white',
  expand = 'block',
  fill = 'primary',
  fontSize = 12,
  fontWeight = 'semi-bold',
  marginTop, 
  marginBottom,
  onPress,
  width,
}) => {

  const fntWeight = () => {
    switch(fontWeight) {
      case 'bold': return '700'
      case 'semi-bold': return '500'
      case 'normal': return '400'
    }
  }

  const expandWidth = () => {
    switch(expand) {
      case 'block': return 1
    }
  }

  const fillColor = () => {
    switch(fill) {
      case 'primary': return colors.primary
      case 'secondary': return colors.secondary
      case 'alert': return colors.alert
      case 'danger': return colors.danger
      case 'none': return colors.none
    }
  }

  const fontColor = () => {
    switch(color) {
      case 'primary': return colors.primary
      case 'secondary': return colors.secondary
      case 'alert': return colors.alert
      case 'danger': return colors.danger
      case 'white': return colors.white
    }
  }

  return (
    <TouchableOpacityButton 
      onPress={onPress}
      style={{ 
        backgroundColor: fillColor(),
        flexGrow: expandWidth(),
        marginTop, 
        marginBottom,
        width
      }}
    >
      <Text 
        style={{
          color: fontColor(),
          fontSize,
          fontWeight: fntWeight()
        }}
      >
        {children}
      </Text>
    </TouchableOpacityButton>
  )
};

export default Button;

const TouchableOpacityButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 3px;
  padding: 10px 0;
`

const Text = styled.Text`
  font-weight: 500;
  font-size: 14px;
`