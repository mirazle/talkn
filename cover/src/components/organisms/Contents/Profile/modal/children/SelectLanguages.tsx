import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button, { buttonThemeBright, buttonThemeDefault } from 'cover/components/atoms/Button';
import { NoSetComponens } from 'cover/components/organisms/Contents/Profile/common';
import Flex, { Label } from 'cover/flexes';
import { allLanguage, defaultLanguages } from 'cover/model/userTags/Profile';
import styles from 'cover/styles';

type Props = {
  type: string;
  isEditable: boolean;
  languages: string[];
  onChange: (language: string[]) => void;
  isHorizon?: boolean;
  width?: string;
};

export const languagesInit = defaultLanguages.map((language) => language.uniqueId);

const Component: React.FC<Props> = ({ type, isEditable, languages: _languages, onChange, isHorizon = false, width = 'auto' }: Props) => {
  const [isActiveAll, setIsActiveAll] = useState(false);
  const [languages, setLanguages] = useState(_languages);

  const getContent = () => {
    if (isEditable) {
      return (
        <Container className="languages" alignItems="center" overflow="scroll hidden" isHorizon={isHorizon} width={width}>
          <ButtonCustom
            key={`${type}_${allLanguage.uniqueId}`}
            className={`ButtonCustom${type}_${allLanguage.uniqueId}`}
            theme={getButtonTheme(isActiveAll)}
            onClick={handleOnChangeAll}>
            {allLanguage.ja}
          </ButtonCustom>

          {defaultLanguages.map((language) => (
            <ButtonCustom
              key={`${type}_${language.uniqueId}`}
              className={`ButtonCustom${type}_${allLanguage.uniqueId}`}
              theme={getButtonTheme(languages.includes(language.uniqueId))}
              onClick={() => handleOnChange(language.uniqueId)}>
              {language.ja}
            </ButtonCustom>
          ))}
        </Container>
      );
    } else {
      if (languages.length === 0) {
        return <NoSetComponens />;
      } else {
        return (
          <Container className="languages" alignItems="center" overflow="scroll hidden" isHorizon={isHorizon} width={width}>
            {defaultLanguages.map((language) => {
              return (
                languages.includes(language.uniqueId) && (
                  <ButtonCustom
                    key={`${type}_${language.uniqueId}`}
                    className={`ButtonCustom${type}_${allLanguage.uniqueId}`}
                    theme={getButtonTheme()}>
                    {language.ja}
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
    const updateLanguages = !isActiveAll ? getFullLanguages() : new Array();
    setIsActiveAll(!isActiveAll);
    setLanguages(updateLanguages);
    onChange(updateLanguages);
  };

  const handleOnChange = (clickedUniqueId) => {
    let updateLanguages = [...languages];
    if (languages.includes(clickedUniqueId)) {
      updateLanguages = languages.filter((uniqueId) => uniqueId !== clickedUniqueId);
    } else {
      updateLanguages.push(clickedUniqueId);
    }
    setIsActiveAll(updateLanguages.length === defaultLanguages.length);
    setLanguages(updateLanguages);
    onChange(updateLanguages);
  };

  useEffect(() => {
    if (_languages) {
      const updateIsActiveAll = _languages.length === defaultLanguages.length;
      const updateLanguages = updateIsActiveAll ? getFullLanguages() : [..._languages];
      setIsActiveAll(updateIsActiveAll);
      setLanguages(updateLanguages);
    }
  }, [_languages]);

  if (languages) {
    return (
      <Flex flow="column nowrap" overflow="hidden">
        <Label bottomMargin>Language</Label>
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
  width?: string;
};

const Container = styled(Flex)<ContainerPropsType>`
  flex-flow: ${(props) => (props.isHorizon ? 'row nowrap' : 'row wrap')};

  width: ${(props) => (props.isHorizon ? `${styles.menuPcWidth - styles.doubleMargin * 2}px` : 'auto')};
`;

const getFullLanguages = () => defaultLanguages.map((language) => language.uniqueId);
const getButtonTheme = (condition = true) => (condition ? buttonThemeDefault : buttonThemeBright);

const ButtonCustom = styled(Button)`
  margin-top: 0;
  margin-right: ${styles.doubleMargin}px;
  margin-bottom: ${styles.doubleMargin}px;
  margin-left: 0;
`;
