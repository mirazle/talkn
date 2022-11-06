import React, { useState } from 'react';
import styled from 'styled-components';

import Button, { buttonThemeCold } from 'cover/components/atoms/Button';
import SelectBirthday from 'cover/components/organisms/Contents/Profile/modal/children/SelectBirthday';
import SelectLanguages from 'cover/components/organisms/Contents/Profile/modal/children/SelectLanguages';
import SelectSexes from 'cover/components/organisms/Contents/Profile/modal/children/SelectSexes';
import Flex from 'cover/flexes';
import styles from 'cover/styles';

export type TagValueType = {
  id: string;
  label: string;
};
export const noSelectOptionLabel = '-';

export const NoSetComponens: React.FC = () => (
  <Button className="NoSetButton" disabled bottomMargin>
    NO SET
  </Button>
);
export const getNoSelectOption = (): React.ReactNode => {
  return <option value={undefined}>{noSelectOptionLabel}</option>;
};

export const TagId = styled(Flex)`
  margin-top: ${styles.doubleMargin}px;
  font-size: 12px;
  font-weight: 300;
  user-select: text;
`;

type ProfilesPropsType = {
  type: string;
  isEditable: boolean;

  sexes: string[];
  languages: string[];
  birthday: number;
  handleOnChangeLanguages: (languages: string[]) => void;
  handleOnChangeSexes: (sexes: string[]) => void;
  handleOnChangeBirthday: (birthday: string) => void;
  id?: string;
  underline?: boolean;
  isHorizon?: boolean;
};

export const Profiles: React.FC<ProfilesPropsType> = ({
  type = 'Profiles',
  id,
  isEditable = false,
  sexes,
  languages,
  birthday,
  handleOnChangeLanguages,
  handleOnChangeSexes,
  handleOnChangeBirthday,
  underline = false,
  isHorizon,
}: ProfilesPropsType) => {
  const [width, setWidth] = useState('');
  const handleOnMonted = (elm: HTMLElement) => {
    if (isHorizon) {
      setWidth(String(elm.clientWidth));
    }
  };

  return (
    <Flex flow="column nowrap" width="100%" border={underline ? 'underline' : undefined} mouted={handleOnMonted} bottomPadding bottomMargin>
      <SelectSexes type={type} isEditable={isEditable} isHorizon={isHorizon} sexes={sexes} onChange={handleOnChangeSexes} />
      <SelectLanguages
        type={type}
        isEditable={isEditable}
        isHorizon={isHorizon}
        languages={languages}
        onChange={handleOnChangeLanguages}
        width={width}
      />
      <SelectBirthday type={type} isEditable={isEditable} isHorizon={isHorizon} birthday={birthday} onChange={handleOnChangeBirthday} />
      {id && id !== '' && (
        <TagId className="TagId" select>
          ID: {id !== '' ? id : '-'}
        </TagId>
      )}
    </Flex>
  );
};

type ModalFooterType = {
  isMyPage: boolean;
  handleOnClickRemove: () => void;
  handleOnClickSave?: () => void;
};

export const ModalFooter: React.FC<ModalFooterType> = ({ isMyPage, handleOnClickRemove, handleOnClickSave }) => {
  return (
    <Flex flow="row nowrap" width="100%" alignItems="center" justifyContent="space-between">
      {isMyPage && (
        <>
          <Button disabled={false} theme={buttonThemeCold} onClick={handleOnClickRemove} sideMargin>
            REMOVE
          </Button>
          <Button disabled={false} onClick={handleOnClickSave} sideMargin>
            EDIT
          </Button>
        </>
      )}
    </Flex>
  );
};

export const getAllFillInputs = (fixValues, tagType) => {
  return !Object.keys(fixValues).find((key) => {
    switch (typeof fixValues[key]) {
      case 'object':
        return fixValues[key].length === 0;
      case 'string':
        return fixValues[key] === '' || fixValues[key] === '-';
      case 'number':
        return fixValues[key] === 0 || isNaN(fixValues[key]);
      default:
        console.warn(`Confirm type ${key} ${fixValues[key]} ${typeof fixValues[key]}`);
        return true;
    }
  });
};
