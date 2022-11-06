import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import util from 'common/util';

import Input from 'cover/components/atoms/input';
import { NoSetComponens } from 'cover/components/organisms/Contents/Profile/common';
import Flex, { Label, P } from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  type: string;
  isEditable: boolean;
  birthday: number;
  onChange: (birthday: string) => void;
  isHorizon?: boolean;
  width?: string;
};

type AgePropsType = {
  value: number | '-';
};

const Age: React.FC<AgePropsType> = ({ value }: AgePropsType) => {
  return <AgeParams className="AgeParam">AGE: {value}</AgeParams>;
};

const Component: React.FC<Props> = ({ type, isEditable, birthday: _birthday, onChange, isHorizon, width }: Props) => {
  const [birthday, setBirthday] = useState(_birthday);
  const [age, setAge] = useState(util.getAgeByBirthday(birthday));
  const handleOnChange = (value) => {
    setBirthday(value);
    setAge(util.getAgeByBirthday(value));
    onChange(value);
  };
  useEffect(() => {
    setBirthday(_birthday);
    setAge(util.getAgeByBirthday(_birthday));
  }, [_birthday]);

  if (isEditable) {
    return (
      <Flex flow="column nowrap">
        <Label bottomMargin>Birthday</Label>
        <Flex flow="row wrap" alignItems="center">
          <Input.Date name={type} onChange={handleOnChange} value={birthday} disabled={!isEditable} />
          {birthday !== 0 && <Age value={age} />}
        </Flex>
      </Flex>
    );
  } else {
    if (birthday === 0) {
      return (
        <Flex flow="column nowrap">
          <Label bottomMargin>Birthday</Label>
          <NoSetComponens />
        </Flex>
      );
    } else {
      return (
        <Flex flow="column nowrap">
          <Label bottomMargin>Birthday</Label>
          <Flex flow="row wrap" alignItems="center">
            <Input.Date name={type} onChange={handleOnChange} value={birthday} disabled={!isEditable} />
            {birthday !== 0 && <Age value={age} />}
          </Flex>
        </Flex>
      );
    }
  }
};

export default Component;

const AgeParams = styled(P)`
  text-indent: ${styles.doubleSize}px;
`;
