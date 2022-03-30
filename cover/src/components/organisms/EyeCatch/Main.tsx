import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import conf from 'common/conf';

import api from 'cover/api';
import Button, { buttonThemeBright, buttonThemeHot } from 'cover/components/atoms/Button';
import Flex from 'cover/components/atoms/Flex';
import H from 'cover/components/atoms/H';
import Input from 'cover/components/atoms/input';
import { imageBg, imageIcon } from 'cover/components/atoms/input/DropImage';
import { Profiles } from 'cover/components/organisms/Contents/Profile/common';
import { UserModalOptionType } from 'cover/components/organisms/Contents/Profile/index';
import Content from 'cover/components/organisms/EyeCatch/Content';
import Modal from 'cover/components/organisms/Modal';
import { useGlobalContext, GlobalContextType } from 'cover/container';
import styles from 'cover/styles';
import { UserType, UserTagsType } from 'cover/talkn.cover';

export type FixValuesType = {
  email: string;
  bg: string;
  icon: string;
  sexes: string[];
  languages: string[];
  birthday: number;
};

export const fixValuesInit: FixValuesType = {
  email: '',
  bg: '',
  icon: '',
  sexes: [],
  languages: [],
  birthday: conf.defaultBirthdayUnixtime,
};

const Mark: React.FC<{ label: string; cnt: number }> = ({ label }) => (
  <MarkContainer>
    <span className="label">{label}</span>
  </MarkContainer>
);

type Props = {
  isMyPage: boolean;
  userModalOptions: UserModalOptionType;
  user: UserType;
  userTags: UserTagsType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  setSelectProfileModalOption: React.Dispatch<React.SetStateAction<UserModalOptionType>>;
};

const Component: React.FC<Props> = ({ isMyPage, userTags, userModalOptions, user, setUser, setSelectProfileModalOption }) => {
  const [isSavedAnimation, setIsSavedAnimation] = useState(false);
  const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bgFormData, setBgFromData] = useState<FormData>(new FormData());
  const [iconFormData, setIconFormData] = useState<FormData>(new FormData());
  const [fixValues, setFixValues] = useState<FixValuesType>(fixValuesInit);
  const email = user && user.email ? user.email : '';

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
    const email = user.email;
    const updateUser = {
      ...user,
      email,
      bg: fixValues.bg,
      icon: fixValues.icon,
      languages: fixValues.languages,
      sexes: fixValues.sexes,
      birthday: fixValues.birthday,
    };
    let isUpdateImage = false;

    setUser(updateUser);
    setSelectProfileModalOption({
      ...userModalOptions,
      bg: updateUser.bg,
      icon: updateUser.icon,
      languages: updateUser.languages,
      sexes: updateUser.sexes,
      birthday: updateUser.birthday,
    });

    if (iconFormData.has('icon')) {
      isUpdateImage = true;
      iconFormData.set('email', email);
      promises.push(api.formData('saveUserIcon', email, iconFormData));
    }

    if (bgFormData.has('bg')) {
      isUpdateImage = true;
      bgFormData.set('email', email);
      promises.push(api.formData('saveUserBg', email, bgFormData));
    }

    promises.push(api.json('saveUser', updateUser));

    Promise.all(promises).then(() => {
      if (isUpdateImage) {
        window.location.reload();
      } else {
        setIsSavedAnimation(true);
        setTimeout(() => {
          setIsSavedAnimation(false);
        }, 2000);
      }
    });
  };

  useEffect(() => {
    if (
      fixValues.languages &&
      fixValues.sexes &&
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
      bg: userModalOptions.bg,
      icon: userModalOptions.icon,
      languages: userModalOptions.languages,
      sexes: userModalOptions.sexes,
      birthday: userModalOptions.birthday,
    });
  }, [userModalOptions]);

  return (
    <>
      <Content user={user} handleOnClick={() => isMyPage && setShowModal(!showModal)} isSavedAnimation={isSavedAnimation} />

      <Modal.Structure
        show={showModal}
        closeModal={() => setShowModal(false)}
        header={<H.Five>Profile(Edit)</H.Five>}
        content={
          <Flex flow="column nowrap">
            <Input.DropImage
              type={imageBg}
              email={email}
              className="InputDropImageBg"
              onChange={handleOnChangeBg}
              value={userModalOptions.bg}
            />
            <InputDropImageIcon
              type={imageIcon}
              email={email}
              className="InputDropImageIcon"
              onChange={handleOnChangeIcon}
              value={userModalOptions.icon}
            />
            <br />
            <Profiles
              type="EyeCatchMain"
              userModalOptions={{ ...userModalOptions, isEditable: true }}
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

const MarkContainer = styled.div`
  background: ${styles.themeColor};
  padding: 10px ${styles.doublePadding * 1.5}px;
  margin-right: ${styles.doubleMargin}px;
  color: ${styles.whiteColor};
  border-radius: 30px;
  .cnt {
    font-size: 15px;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    font-size: 16px;
  }
`;
