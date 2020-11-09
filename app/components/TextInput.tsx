import React from 'react';
import styled from 'styled-components/native';

interface TextInputI {
  label: string
  onChangeText: (_) => void
  onFocus?: () => void
  secureTextEntry?: boolean
  value: string
}

const TextInput: React.FC<TextInputI> = ({
  label,
  onChangeText,
  onFocus,
  secureTextEntry = false,
  value
}) => {
  return (
    <InputItem>
      <InputItemText>{label}</InputItemText>
      <Input value={value} onChangeText={onChangeText} onFocus={onFocus} secureTextEntry={secureTextEntry}/>
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