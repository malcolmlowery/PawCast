import React from 'react';
import styled from 'styled-components/native';

interface TextInputI {
  label?: string
  onChangeText?: (_) => void
  onFocus?: () => void
  secureTextEntry?: boolean
  value?: string
  styles?: any
  placeholder?: string
}

const TextInput: React.FC<TextInputI> = ({
  label,
  onChangeText,
  onFocus,
  placeholder,
  secureTextEntry = false,
  styles,
  value,
}) => {
  return (
    <InputItem>
      <InputItemText>{label}</InputItemText>
      <Input style={styles} value={value} onChangeText={onChangeText} onFocus={onFocus} secureTextEntry={secureTextEntry} placeholder={placeholder} />
    </InputItem>
  )
};

export default TextInput;

const InputItem = styled.View`
  background: #fff;
`;

const InputItemText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  padding: 8px;
`;

const Input = styled.TextInput`
  background: #f4f4f4;
  border-radius: 2px;
  padding: 10px 8px;
`;