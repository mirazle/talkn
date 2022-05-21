import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import util from 'common/util';

import api from 'cover/api';
import Button, { buttonThemeBright, buttonThemeHot } from 'cover/components/atoms/Button';
import Input from 'cover/components/atoms/input';
import { imageBg, imageIcon } from 'cover/components/atoms/input/DropImage';
import { Profiles } from 'cover/components/organisms/Contents/Profile/common';
import Modal from 'cover/components/organisms/Modal';
import UserContent from 'cover/components/organisms/User/Content';
import Flex, { H5 } from 'cover/flexes';
import { GoogleSessionType } from 'cover/model/Google';
import { UserType } from 'cover/model/User';
import { tagParentSelf, OpenModalOptionType } from 'cover/model/userTags';

export type FixValuesType = {
  bg: string;
  icon: string;
  sexes: string[];
  languages: string[];
  birthday: number;
};

export const fixValuesInit: FixValuesType = {
  bg: '',
  icon: '',
  sexes: [],
  languages: [],
  birthday: conf.defaultBirthdayUnixtime,
};

type Props = {
  isMyPage: boolean;
  openModalOptions: OpenModalOptionType;
  session: GoogleSessionType;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  setShowProfileModalOption: React.Dispatch<React.SetStateAction<OpenModalOptionType>>;
};

const Component: React.FC<Props> = ({ isMyPage, openModalOptions, session, user, setUser, setShowProfileModalOption }) => {
  const [isSavedAnimation, setIsSavedAnimation] = useState(false);
  const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bgFormData, setBgFromData] = useState<FormData>(new FormData());
  const [iconFormData, setIconFormData] = useState<FormData>(new FormData());
  const [fixValues, setFixValues] = useState<FixValuesType>(fixValuesInit);
  const userId = user && user._id ? user._id : '';

  const handleOnChangeBg = (formData, fileName) => {
    setBgFromData(formData);
    setFixValues({ ...fixValues, bg: fileName });
  };

  const handleOnChangeIcon = (formData, fileName) => {
    setIconFormData(formData);
    setFixValues({ ...fixValues, icon: fileName });
  };

  const handleOnChangeBirthday = (birthday) => {
    setFixValues({ ...fixValues, birthday });
  };

  const handleOnChangeLanguages = (languages) => {
    setFixValues({ ...fixValues, languages });
  };

  const handleOnChangeSexes = (sexes) => {
    setFixValues({ ...fixValues, sexes });
  };

  const handleOnSave = () => {
    const promises = [];
    const updateUser = {
      ...user,
      bg: fixValues.bg,
      icon: fixValues.icon,
      languages: fixValues.languages,
      sexes: fixValues.sexes,
      birthday: fixValues.birthday,
    };
    let isUpdateImage = false;

    setUser(updateUser);
    setShowProfileModalOption({
      ...openModalOptions,
      bg: updateUser.bg,
      icon: updateUser.icon,
      languages: updateUser.languages,
      sexes: updateUser.sexes,
      birthday: updateUser.birthday,
    });

    if (iconFormData.has('icon')) {
      isUpdateImage = true;
      iconFormData.set('userId', userId);
      promises.push(api.formData('saveUserIcon', userId, iconFormData));
    }

    if (bgFormData.has('bg')) {
      isUpdateImage = true;
      bgFormData.set('userId', userId);
      promises.push(api.formData('saveUserBg', userId, bgFormData));
    }

    promises.push(api.json('saveUser', updateUser));

    Promise.all(promises).then(() => {
      setIsSavedAnimation(true);
      setTimeout(() => {
        window.location.reload();
        setIsSavedAnimation(false);
      }, 1000);
    });
  };

  useEffect(() => {
    if (
      fixValues &&
      fixValues.languages &&
      fixValues.sexes &&
      fixValues.icon !== '' &&
      fixValues.bg !== '' &&
      fixValues.languages.length > 0 &&
      fixValues.sexes.length > 0 &&
      fixValues.birthday !== 0
    ) {
      setIsDisabledSaveButton(false);
    } else {
      setIsDisabledSaveButton(true);
    }
  }, [fixValues]);

  useEffect(() => {
    setFixValues({
      ...fixValues,
      bg: openModalOptions.bg,
      icon: openModalOptions.icon,
      languages: openModalOptions.languages,
      sexes: openModalOptions.sexes,
      birthday: openModalOptions.birthday,
    });
  }, [openModalOptions]);

  return (
    <>
      <UserContent
        id={user && user._id ? user._id : ''}
        className={'MainContent'}
        name={user && user.name ? user.name : ''}
        birthday={user && user.birthday ? util.getAgeByBirthday(user.birthday) : '-'}
        bg={user && user.bg ? user.bg : ''}
        icon={user && user.icon ? user.icon : ''}
        tags={user && user.hasSelfTags ? user.hasSelfTags : {}}
        description={'Self Introduction Text......'}
        handleOnClick={() => isMyPage && setShowModal(!showModal)}
        isSavedAnimation={isSavedAnimation}
      />

      <Modal.Structure
        show={showModal}
        closeModal={() => setShowModal(false)}
        header={<H5>Profile</H5>}
        content={
          <Flex flow="column nowrap">
            <Input.DropImage
              type={imageBg}
              id={userId}
              className="InputDropImageBg"
              onChange={handleOnChangeBg}
              value={openModalOptions.bg}
            />
            <InputDropImageIcon
              type={imageIcon}
              id={userId}
              className="InputDropImageIcon"
              onChange={handleOnChangeIcon}
              value={openModalOptions.icon}
            />
            <br />
            <Profiles
              type="UserTop"
              id={userId}
              isEditable={openModalOptions.tagParentType === tagParentSelf ? false : true}
              sexes={fixValues.sexes}
              languages={fixValues.languages}
              birthday={fixValues.birthday}
              handleOnChangeLanguages={handleOnChangeLanguages}
              handleOnChangeSexes={handleOnChangeSexes}
              handleOnChangeBirthday={handleOnChangeBirthday}
            />
          </Flex>
        }
        footer={
          <>
            <Button disabled={false} theme={buttonThemeBright} onClick={() => setShowModal(false)} sideMargin>
              CLOSE
            </Button>
            <Button
              disabled={isDisabledSaveButton}
              theme={isDisabledSaveButton ? buttonThemeHot : buttonThemeHot}
              onClick={() => {
                handleOnSave();
                setShowModal(false);
              }}
              sideMargin>
              SAVE
            </Button>
          </>
        }
      />
    </>
  );
};

export default Component;

const InputDropImageIcon = styled(Input.DropImage)`
  margin-top: -190px;
  margin-left: 32px;
  margin-bottom: 100px;
`;
