import React, { useEffect, useState, useMemo } from 'react';
import styled, { css } from 'styled-components';

import conf from 'common/conf';
import util from 'common/util';

import api from 'cover/api';
import Button, { buttonThemeBright, buttonThemeHot } from 'cover/components/atoms/Button';
import Flex from 'cover/components/atoms/Flex';
import H from 'cover/components/atoms/H';
import Input from 'cover/components/atoms/input';
import { imageBg, imageIcon } from 'cover/components/atoms/input/DropImage';
import Checmmark from 'cover/components/atoms/svg/Checmmark';
import { UserModalOptionType, tagParentProfile } from 'cover/components/organisms/Contents/Profile';
import { Profiles } from 'cover/components/organisms/Contents/Profile/common';
import Modal from 'cover/components/organisms/Modal';
import { useGlobalContext, GlobalContextType } from 'cover/container';
import styles from 'cover/styles';
import { GoogleSessionType, UserTagsType } from 'cover/talkn.cover';

export type FixValuesType = {
  bg: string;
  icon: string;
  sexes: string[];
  languages: string[];
  birthday: string;
};

export const fixValuesInit: FixValuesType = {
  bg: '',
  icon: '',
  sexes: [],
  languages: [],
  birthday: '',
};

const tagParentKey = tagParentProfile.toLocaleLowerCase();

const Mark: React.FC<{ label: string; cnt: number }> = ({ label }) => (
  <MarkContainer>
    <span className="label">{label}</span>
    {/*<span className="cnt">({cnt})</span>*/}
  </MarkContainer>
);

type Props = {
  ch: string;
  isMyPage: boolean;
  session: GoogleSessionType;
  userModalOptions: UserModalOptionType;
  userTags: UserTagsType;
  userTagsInit: UserTagsType;
  ogImage: string;
  eyeCatchWidth: number;
  eyeCatchHeight: number;
  setUserTags: React.Dispatch<React.SetStateAction<UserTagsType>>;
  setUserTagsInit: React.Dispatch<React.SetStateAction<UserTagsType>>;
  setSelectProfileModalOption: React.Dispatch<React.SetStateAction<UserModalOptionType>>;
  ogpImageRef: React.MutableRefObject<HTMLElement>;
};

const Component: React.FC<Props> = ({
  isMyPage,
  session,
  userModalOptions,
  userTags,
  setUserTags,
  setUserTagsInit,
  setSelectProfileModalOption,
}) => {
  const { innerWidth, innerHeight }: GlobalContextType = useGlobalContext();
  const [isSavedAnimation, setIsSavedAnimation] = useState(false);
  const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bgFormData, setBgFromData] = useState<FormData>(new FormData());
  const [iconFormData, setIconFormData] = useState<FormData>(new FormData());
  const [fixValues, setFixValues] = useState<FixValuesType>(fixValuesInit);
  const email = userTags && userTags.email ? userTags.email : '';
  const controlHeight = getControlHeight(innerWidth, innerHeight);

  const handleOnChangeBg = (formData, bg) => {
    setBgFromData(formData);
    setFixValues({ ...fixValues, bg });
  };

  const handleOnChangeIcon = (formData, icon) => {
    setIconFormData(formData);
    setFixValues({ ...fixValues, icon });
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
    const bg = fixValues.bg;
    const icon = fixValues.icon;
    let isUpdateImage = false;
    const updateUserTags = {
      ...userTags,
      [tagParentKey]: {
        ...userTags[tagParentKey],
        bg: fixValues.bg,
        icon: fixValues.icon,
        languages: fixValues.languages,
        sexes: fixValues.sexes,
        birthday: fixValues.birthday,
      },
    };
    setUserTags(updateUserTags);
    setUserTagsInit(updateUserTags);
    setSelectProfileModalOption({
      ...userModalOptions,
      bg,
      icon,
      languages: updateUserTags.profile.languages,
      sexes: updateUserTags.profile.sexes,
      birthday: updateUserTags.profile.birthday,
    });

    if (iconFormData.has('icon')) {
      isUpdateImage = true;
      iconFormData.set('email', email);
      promises.push(api.formData('saveUserIcon', updateUserTags.email, iconFormData));
    }

    if (bgFormData.has('bg')) {
      isUpdateImage = true;
      bgFormData.set('email', email);
      promises.push(api.formData('saveUserBg', updateUserTags.email, bgFormData));
    }

    const saveUserValues = util.deepCopy(updateUserTags);
    delete saveUserValues.profile.icon;
    delete saveUserValues.profile.bg;

    promises.push(api.json('saveUser', saveUserValues));

    if (isUpdateImage) {
      // TOOD: Profileモーダルを更新した際にuserTagsがhookされて、components/organisms/Contents/Profile/index.tsxのuserTgas hookメソッドが実行される。
      // その際にsetIsChangeUserTagsが更新されsaveボタンがviewになってしまう不具合が存在する
      window.location.reload();
    } else {
      Promise.all(promises).then(() => {
        setIsSavedAnimation(true);
        setTimeout(() => {
          setIsSavedAnimation(false);
        }, 2000);
      });
    }
  };

  const bgMemo = useMemo(() => {
    return <Background email={email} image={userModalOptions.bg} isHover={isHover} controlHeight={controlHeight} />;
  }, [userModalOptions.bg, isHover, controlHeight]);

  const containerMemo = useMemo(() => {
    return (
      <Container
        className="EyeCatchMainContainer"
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => isMyPage && setShowModal(!showModal)}
        flow="row nowrap"
        alignItems="center"
        justifyContent="center"
        controlHeight={controlHeight}>
        <ProfileContent className="ProfileContent" flow="row nowrap" alignItems="flex-start" justifyContent="flex-start">
          <UserIcon email={email} image={userModalOptions.icon} />
          {session && session.name && (
            <Flex className="userData" flow="column nowrap" upperMargin upperPadding sideMargin sidePadding>
              <div className="name">{session.name}</div>
              <div className="age">AGE: {util.getAgeByBirthday(userModalOptions.birthday)}</div>
              <Flex className="userTags" flow="row wrap" upperMargin>
                {userTags &&
                  Object.keys(userTags.self).map(
                    (key) => userTags.self[key].length > 0 && <Mark key={key} label={key} cnt={userTags.self[key].length} />
                  )}
              </Flex>
            </Flex>
          )}
        </ProfileContent>
        {isSavedAnimation && <Checmmark />}
      </Container>
    );
  }, [showModal, controlHeight, userModalOptions.icon, userModalOptions.birthday, session.name, isSavedAnimation]);

  useEffect(() => {
    if (fixValues.languages.length > 0 && fixValues.sexes.length > 0 && fixValues.birthday !== '') {
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
    if (userModalOptions.languages !== fixValuesInit.languages && userModalOptions.sexes !== fixValuesInit.sexes) {
      setDidMount(true);
    }
  }, [userModalOptions]);

  return (
    <>
      {bgMemo}
      {didMount && containerMemo}

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

type BackgroundPropsType = {
  email: string;
  isHover: boolean;
  controlHeight: number;
  image?: string;
};

const backgroundHoverCss = css`
  transform: scale(1.03);
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    transform: scale(1);
  }
`;

const Background = styled.div<BackgroundPropsType>`
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: ${styles.eyeCatchVwValue}vw;
  height: ${(props) => props.controlHeight}px;
  min-height: ${styles.eyeCatchMinHeightPxValue}px;
  background-size: cover;
  background-image: url(${(props) => getBackgroundImage({ email: props.email, image: props.image })});
  background-position: center;
  color: ${styles.whiteColor};
  opacity: 1;
  transition: ${styles.transitionDuration}ms;
  transform: scale(1);
  ${(props) => props.isHover && backgroundHoverCss};
  :before {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: ' ';
    backdrop-filter: blur(${(props) => (props.isHover ? 2 : 0)}px) brightness(${(props) => (props.isHover ? 0.7 : 1)});
    transition: ${styles.transitionDuration}ms;
  }

  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    height: ${styles.eyeCatchVhValue}vh;
    min-height: unset;
    transition: 0ms;
  }
`;

type ContainerPropsType = {
  controlHeight: number;
  onMouseOver: () => void;
  onMouseLeave: () => void;
};

const Container = styled(Flex)<ContainerPropsType>`
  width: ${styles.eyeCatchVwValue}vw;
  height: ${(props) => props.controlHeight}px;
  min-height: ${styles.eyeCatchMinHeightPxValue}px;
  margin-top: -${(props) => props.controlHeight}px;
  z-index: ${styles.zIndex.eyeCatch};
  cursor: pointer;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    height: ${styles.eyeCatchVhValue}vh;
    min-height: unset;
    transition: 0ms;
  }
`;

const ProfileContent = styled(Flex)`
  width: 100%;
  max-width: ${styles.appWidth}px;
  margin-left: 90px;
  color: ${styles.whiteColor};
  .name {
    font-weight: 500;
    font-size: 35px;
  }

  .age {
    font-size: 20px;
  }

  .userTags {
    margin-left: -${styles.baseMargin}px;
  }

  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    align-items: center;
    margin-left: 5vw;
    font-weight: 300;
    font-size: 25px;
    .userData {
      padding: 0;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 10px;
    }
  }
`;

type UserIconPropsType = {
  email: string;
  image: string;
};

const UserIcon = styled.div<UserIconPropsType>`
  width: 120px;
  height: 120px;
  background-size: cover;
  background-image: url(${(props) => getBackgroundImage({ email: props.email, image: props.image })});
  background-position: center;
  border-radius: 50%;
  transition: ${styles.transitionDuration}ms;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 60px;
    height: 60px;
  }
`;

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

const getControlHeight = (innerWidth, innerHeight) => {
  const { spLayoutStrictWidth, eyeCatchMinHeightPxValue } = styles;
  let controlHeight = Math.floor(innerHeight * (styles.eyeCatchVhValue / 100));
  if (innerWidth < spLayoutStrictWidth) {
    return controlHeight;
  } else {
    return controlHeight < eyeCatchMinHeightPxValue ? eyeCatchMinHeightPxValue : controlHeight;
  }
};

const getBackgroundImage = ({ email, image }) => {
  if (image && image !== '') {
    return `https://${conf.assetsCoverPath}${email}/${image}`;
  } else {
    return 'none';
  }
};
