import React from 'react';
import styled from 'styled-components';

import util from 'common/util';

import api from 'cover/api';
import Button, { buttonThemeBright } from 'cover/components/atoms/Button';
import Flex from 'cover/components/atoms/Flex';
import { UserModalOptionType } from 'cover/components/organisms/Contents/Profile';
import SelectBirthday from 'cover/components/organisms/Contents/Profile/modal/children/SelectBirthday';
import SelectLanguages from 'cover/components/organisms/Contents/Profile/modal/children/SelectLanguages';
import SelectSexes from 'cover/components/organisms/Contents/Profile/modal/children/SelectSexes';

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

export const TagId = styled.div`
  font-size: 12px;
  font-weight: 300;
`;

type ProfilesPropsType = {
  type: string;
  userModalOptions: UserModalOptionType;
  handleOnChangeLanguages: (languages: string[]) => void;
  handleOnChangeSexes: (sexes: string[]) => void;
  handleOnChangeBirthday: (birthday: string) => void;
  underline?: boolean;
};

export const Profiles: React.FC<ProfilesPropsType> = ({
  type = 'Profiles',
  userModalOptions,
  handleOnChangeLanguages,
  handleOnChangeSexes,
  handleOnChangeBirthday,
  underline = false,
}: ProfilesPropsType) => {
  return (
    <Flex flow="column nowrap" width="100%" border={underline ? 'underline' : undefined} bottomPadding bottomMargin>
      <SelectSexes type={type} isEditable={userModalOptions.isEditable} sexes={userModalOptions.sexes} onChange={handleOnChangeSexes} />
      <SelectLanguages
        type={type}
        isEditable={userModalOptions.isEditable}
        languages={userModalOptions.languages}
        onChange={handleOnChangeLanguages}
      />
      <SelectBirthday
        type={type}
        isEditable={userModalOptions.isEditable}
        birthday={userModalOptions.birthday}
        onChange={handleOnChangeBirthday}
      />
    </Flex>
  );
};

type ModalFooterType = {
  userModalOptions: UserModalOptionType;
  handleOnClose: () => void;
  positiveDisabeld?: boolean;
  onClickPositive?: () => void;
  showPositive?: boolean;
};

export const ModalFooter: React.FC<ModalFooterType> = ({
  userModalOptions,
  onClickPositive,
  handleOnClose,
  positiveDisabeld = false,
  showPositive = true,
}) => {
  const isEditable = userModalOptions.isEditable;
  return (
    <>
      <Button disabled={false} theme={buttonThemeBright} onClick={handleOnClose} sideMargin>
        {isEditable ? 'CANCEL' : 'CLOSE'}
      </Button>
      {showPositive && (
        <Button
          disabled={positiveDisabeld}
          onClick={() => {
            onClickPositive && onClickPositive();
            handleOnClose();
          }}
          sideMargin>
          {isEditable ? 'OK' : 'SEARCH'}
        </Button>
      )}
    </>
  );
};

export const handleOnSearch = (userModalOptions) => {
  const requestJson = util.deepCopy(userModalOptions);
  delete requestJson.isEditable;
  delete requestJson.index;
  api.json('search', requestJson);
};

export const getIsDisabled = (fixValues) => {
  return Boolean(
    Object.keys(fixValues).find((key) => {
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
    })
  );
};
