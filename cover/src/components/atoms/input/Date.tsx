import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Flex from 'cover/components/atoms/Flex';
import Label from 'cover/components/atoms/Label';

import { InputCss } from './common';

type Props = {
  name: string;
  value: string;
  label?: string;
  disabled?: boolean;
  width?: string;
  className?: string;
  onChange?: (value: string) => void;
};

const Component: React.FC<Props> = ({
  name,
  value: _value = '',
  label,
  disabled = false,
  width = 'auto',
  className = 'InputDate',
  onChange,
}) => {
  const relationId = `InputDate${name}`;
  const [value, setValue] = useState(_value);
  const handleOnChange = (e) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };
  useEffect(() => {
    setValue(_value);
  }, [_value]);
  return (
    <FlexCustom className={className ? className : name} width={width} flow="row wrap" alignItems="center" justifyContent="flex-start">
      {label && (
        <Label htmlFor={relationId} inline sideMargin>
          {label}
        </Label>
      )}
      <Input type="date" id={relationId} name={name} className={className} value={value} onChange={handleOnChange} disabled={disabled} />
    </FlexCustom>
  );
};

export default Component;

const FlexCustom = styled(Flex)`
  label {
    flex: 1 1 auto;
  }
  input {
    flex: 1 1 auto;
  }
`;

const Input = styled.input`
  ${InputCss};
`;
