import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Flex, { Label } from 'cover/flexes';

import { InputCss } from './common';

type Props = {
  name: string;
  value: number;
  label?: string;
  disabled?: boolean;
  width?: string;
  className?: string;
  onChange?: (value: number) => void;
};

const Component: React.FC<Props> = ({
  name,
  value: _unixtine = 0,
  label,
  disabled = false,
  width = 'auto',
  className = 'InputDate',
  onChange,
}) => {
  const relationId = `InputDate${name}`;
  const [value, setValue] = useState(getUnittimeToYmd(_unixtine));
  const handleOnChange = (e) => {
    const ymd = e.target.value;
    const unixtime = new Date(ymd).getTime();
    setValue(ymd);
    onChange && onChange(unixtime);
  };
  useEffect(() => {
    const ymd = getUnittimeToYmd(_unixtine);
    setValue(ymd);
  }, [_unixtine]);

  return (
    <FlexCustom className={className ? className : name} width={width} flow="row wrap" alignItems="center" justifyContent="flex-start">
      {label && (
        <Label htmlFor={relationId} display="inline" sideMargin>
          {label}
        </Label>
      )}
      <Input type="date" id={relationId} name={name} className={className} value={value} onChange={handleOnChange} disabled={disabled} />
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
`;

const getUnittimeToYmd = (unixtime: number) => {
  const date = new Date(unixtime);
  var y = date.getFullYear();
  var m = ('00' + (date.getMonth() + 1)).slice(-2);
  var d = ('00' + date.getDate()).slice(-2);
  return y + '-' + m + '-' + d;
};
