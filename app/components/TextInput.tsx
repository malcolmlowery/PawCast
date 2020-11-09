import React from 'react';
import styled from 'styled-components/native';

interface TextInputI {
  label: string
  onChangeText: (_) => void
  onFocus?: () => void
  value: string
}

const TextInput: React.FC<TextInputI> = ({
  label,
  onChangeText,
  onFocus,
  value
}) => {
  return (
    <InputItem>
      <InputItemText>{label}</InputItemText>
      <Input value={value} onChangeText={onChangeText} onFocus={onFocus}/>
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