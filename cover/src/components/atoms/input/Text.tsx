import React, { useState } from 'react';
import styled from 'styled-components';

import Flex, { Label } from 'cover/flexes';
import styles from 'cover/styles';

import { InputCss } from './common';

type Props = {
  name: string;
  value: string;
  label?: string;
  width?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const Component: React.FC<Props> = ({ name, value: _value = '', label, width = 'auto', className = 'InputText', onChange }) => {
  const relationId = `InputText${name}`;
  const [value, setValue] = useState(_value);
  const handleOnChange = (e) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };
  return (
    <FlexCustom className={className ? className : name} width={width} flow="row wrap" alignItems="center" justifyContent="flex-start">
      {label && (
        <Label htmlFor={relationId} sideMargin>
          {label}
        </Label>
      )}
      <Input type="text" id={relationId} name={name} className={className} value={value} onChange={handleOnChange} />
    </FlexCustom>
  );
};

export default Component;

const FlexCustom = styled((props) => <Flex {...props} />)`
  label {
    flex: 1 1 auto;
  }
  input {
    flex: 1 1 auto;
  }
`;

const Input = styled.input`
  ${InputCss};
  appearance: none;
  -webkit-appearance: none;
  margin: ${styles.baseMargin}px 0;
`;
