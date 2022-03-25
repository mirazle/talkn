import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button, { buttonThemeBright, buttonThemeDefault } from 'cover/components/atoms/Button';
import Flex from 'cover/components/atoms/Flex';
import Label from 'cover/components/atoms/Label';
import { NoSetComponens } from 'cover/components/organisms/Contents/Profile/common';
import styles from 'cover/styles';

type Props = {
  type: string;
  isEditable: boolean;
  sexes: string[];
  onChange: (sexes: string[]) => void;
};

export const allSex = { uniqueId: 'All', ja: '全て', en: 'All' };

export const defaultSexes = [
  { uniqueId: '1', ja: '男', en: 'Man' },
  { uniqueId: '2', ja: '女', en: 'Woman' },
];

export const sexesInit = ['1', '2'];

const Component: React.FC<Props> = ({ type, isEditable, sexes: _sexes, onChange }: Props) => {
  const [isActiveAll, setIsActiveAll] = useState(false);
  const [sexes, setSexes] = useState(_sexes);

  const getContent = () => {
    if (isEditable) {
      return (
        <Flex className="sexes" flow="row wrap" alignItems="center">
          <ButtonCustom key={`${type}_${allSex.uniqueId}`} theme={getButtonTheme(isActiveAll)} onClick={handleOnChangeAll}>
            {allSex.ja}
          </ButtonCustom>
          {defaultSexes.map((sex) => (
            <ButtonCustom
              key={`${type}_${sex.uniqueId}`}
              theme={getButtonTheme(sexes.includes(sex.uniqueId))}
              onClick={() => handleOnChange(sex.uniqueId)}>
              {sex.ja}
            </ButtonCustom>
          ))}
        </Flex>
      );
    } else {
      if (sexes.length === 0) {
        return <NoSetComponens />;
      } else {
        return (
          <Flex className="sexes" flow={'row nowrap'} alignItems="center">
            {defaultSexes.map((sex) => {
              return (
                sexes.includes(sex.uniqueId) && (
                  <ButtonCustom key={`${type}_${sex.uniqueId}`} theme={getButtonTheme()}>
                    {sex.ja}
                  </ButtonCustom>
                )
              );
            })}
          </Flex>
        );
      }
    }
  };

  const handleOnChangeAll = () => {
    const updateSexes = !isActiveAll ? getFullSexes() : new Array();
    setIsActiveAll(!isActiveAll);
    setSexes(updateSexes);
    onChange(updateSexes);
  };

  const handleOnChange = (clickedUniqueId) => {
    let updateSexes = [...sexes];
    if (sexes.includes(clickedUniqueId)) {
      updateSexes = sexes.filter((uniqueId) => uniqueId !== clickedUniqueId);
    } else {
      updateSexes.push(clickedUniqueId);
    }
    setIsActiveAll(updateSexes.length === defaultSexes.length);
    setSexes(updateSexes);
    onChange(updateSexes);
  };

  useEffect(() => {
    const updateIsActiveAll = _sexes.length === defaultSexes.length;
    const updateSexes = updateIsActiveAll ? getFullSexes() : [..._sexes];
    setIsActiveAll(updateIsActiveAll);
    setSexes(updateSexes);
  }, [_sexes]);

  return (
    <Flex flow="column wrap">
      <Label bottomMargin>Sex</Label>
      {getContent()}
    </Flex>
  );
};

export default Component;

const getFullSexes = () => defaultSexes.map((language) => language.uniqueId);
const getButtonTheme = (condition = true) => (condition ? buttonThemeDefault : buttonThemeBright);

const ButtonCustom = styled(Button)`
  margin-top: 0;
  margin-right: ${styles.doubleMargin}px;
  margin-bottom: ${styles.doubleMargin}px;
  margin-left: 0;
`;
