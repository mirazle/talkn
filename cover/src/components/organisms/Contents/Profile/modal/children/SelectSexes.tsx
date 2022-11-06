import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button, { buttonThemeBright, buttonThemeDefault } from 'cover/components/atoms/Button';
import { NoSetComponens } from 'cover/components/organisms/Contents/Profile/common';
import Flex, { Label } from 'cover/flexes';
import { allSex, defaultSexes } from 'cover/model/userTags/Profile';
import styles from 'cover/styles';

type Props = {
  type: string;
  isEditable: boolean;
  sexes: string[];
  onChange: (sexes: string[]) => void;
  isHorizon?: boolean;
  width?: string;
};

const Component: React.FC<Props> = ({ type, isEditable, sexes: _sexes, onChange, isHorizon, width = 'auto' }: Props) => {
  const [isActiveAll, setIsActiveAll] = useState(false);
  const [sexes, setSexes] = useState(_sexes);

  const getContent = () => {
    if (isEditable) {
      return (
        <Container className="languages" flow={'row wrap'} alignItems="center" isHorizon={isHorizon}>
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
        </Container>
      );
    } else {
      if (sexes.length === 0) {
        return <NoSetComponens />;
      } else {
        return (
          <Container className="languages" flow={'row wrap'} alignItems="center" isHorizon={isHorizon}>
            {defaultSexes.map((sex) => {
              return (
                sexes.includes(sex.uniqueId) && (
                  <ButtonCustom key={`${type}_${sex.uniqueId}`} theme={getButtonTheme()}>
                    {sex.ja}
                  </ButtonCustom>
                )
              );
            })}
          </Container>
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
    if (_sexes) {
      const updateIsActiveAll = _sexes.length === defaultSexes.length;
      const updateSexes = updateIsActiveAll ? getFullSexes() : [..._sexes];
      setIsActiveAll(updateIsActiveAll);
      setSexes(updateSexes);
    }
  }, [_sexes]);

  if (sexes) {
    return (
      <Flex flow="column wrap">
        <Label bottomMargin>Sex</Label>
        {getContent()}
      </Flex>
    );
  } else {
    return null;
  }
};

export default Component;

type ContainerPropsType = {
  isHorizon: boolean;
};

const Container = styled(Flex)<ContainerPropsType>`
  flex-flow: ${(props) => (props.isHorizon ? 'row nowrap' : 'row wrap')};
`;

const getFullSexes = () => defaultSexes.map((language) => language.uniqueId);
const getButtonTheme = (condition = true) => (condition ? buttonThemeDefault : buttonThemeBright);

const ButtonCustom = styled(Button)`
  margin-top: 0;
  margin-right: ${styles.doubleMargin}px;
  margin-bottom: ${styles.doubleMargin}px;
  margin-left: 0;
`;
