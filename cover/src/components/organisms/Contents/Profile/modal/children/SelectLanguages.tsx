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
  languages: string[];
  onChange: (language: string[]) => void;
};

export const allLanguage = { uniqueId: 'All', ja: '全て', en: 'All' };

export const defaultLanguages = [
  { uniqueId: '1', ja: '英語', en: 'English' },
  { uniqueId: '2', ja: '中国語', en: 'German' },
  { uniqueId: '3', ja: '日本語', en: 'Japanease' },
  { uniqueId: '4', ja: 'イギリス語', en: 'British' },
  { uniqueId: '5', ja: 'ヒンドゥー語', en: 'Hindu' },
];

export const languagesInit = defaultLanguages.map((language) => language.uniqueId);

const Component: React.FC<Props> = ({ type, isEditable, languages: _languages, onChange }: Props) => {
  const [isActiveAll, setIsActiveAll] = useState(false);
  const [languages, setLanguages] = useState(_languages);

  const getContent = () => {
    if (isEditable) {
      return (
        <Flex className="languages" flow={'row wrap'} alignItems="center">
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
        </Flex>
      );
    } else {
      if (languages.length === 0) {
        return <NoSetComponens />;
      } else {
        return (
          <Flex className="languages" flow={'row wrap'} alignItems="center">
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
          </Flex>
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
      <Flex flow="column nowrap">
        <Label bottomMargin>Language</Label>
        {getContent()}
      </Flex>
    );
  } else {
    return null;
  }
};

export default Component;

const getFullLanguages = () => defaultLanguages.map((language) => language.uniqueId);
const getButtonTheme = (condition = true) => (condition ? buttonThemeDefault : buttonThemeBright);

const ButtonCustom = styled(Button)`
  margin-top: 0;
  margin-right: ${styles.doubleMargin}px;
  margin-bottom: ${styles.doubleMargin}px;
  margin-left: 0;
`;
