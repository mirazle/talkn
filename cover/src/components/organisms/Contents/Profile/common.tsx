import React from 'react';

import util from 'common/util';

import api from 'cover/api';
import Button, { buttonThemeBright } from 'cover/components/atoms/Button';
import Flex from 'cover/components/atoms/Flex';
import { UserModalOptionType } from 'cover/components/organisms/Contents/Profile/index';
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

type ProfilesPropsType = {
  userModalOptions: UserModalOptionType;
  handleOnChangeLanguages: (languages: string[]) => void;
  handleOnChangeSexes: (sexes: string[]) => void;
  handleOnChangeBirthday: (birthday: string) => void;
  underline?: boolean;
};

export const Profiles: React.FC<ProfilesPropsType> = ({
  userModalOptions,
  handleOnChangeLanguages,
  handleOnChangeSexes,
  handleOnChangeBirthday,
  underline = false,
}: ProfilesPropsType) => {
  return (
    <Flex flow="column nowrap" width="100%" border={underline ? 'underline' : undefined} bottomPadding bottomMargin>
      <SelectSexes
        type={`${userModalOptions.tagParentType}_${userModalOptions.tagType}`}
        isEditable={userModalOptions.isEditable}
        sexes={userModalOptions.sexes}
        onChange={handleOnChangeSexes}
      />
      <SelectLanguages
        type={`${userModalOptions.tagParentType}_${userModalOptions.tagType}`}
        isEditable={userModalOptions.isEditable}
        languages={userModalOptions.languages}
        onChange={handleOnChangeLanguages}
      />
      <SelectBirthday
        type={`${userModalOptions.tagParentType}_${userModalOptions.tagType}`}
        isEditable={userModalOptions.isEditable}
        birthday={userModalOptions.birthday}
        onChange={handleOnChangeBirthday}
      />
    </Flex>
  );
};

type ModalFooterType = {
  isEditable: boolean;
  rightButtonDisabeld: boolean;
  onClickRightButton: () => void;
  handleOnClose: () => void;
};

export const ModalFooter: React.FC<ModalFooterType> = ({ isEditable, rightButtonDisabeld = false, onClickRightButton, handleOnClose }) => {
  return (
    <>
      <Button disabled={false} theme={buttonThemeBright} onClick={handleOnClose} sideMargin>
        {isEditable ? 'CANCEL' : 'CLOSE'}
      </Button>
      <Button
        disabled={rightButtonDisabeld}
        onClick={() => {
          onClickRightButton();
          handleOnClose();
        }}
        sideMargin>
        {isEditable ? 'OK' : 'SEARCH'}
      </Button>
    </>
  );
};

export const handleOnSearch = (userModalOptions) => {
  const requestJson = util.deepCopy(userModalOptions);
  delete requestJson.icon;
  delete requestJson.bg;
  api.json('search', requestJson);
};
