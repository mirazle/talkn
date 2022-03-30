import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import conf from 'common/conf';
import util from 'common/util';

import Flex from 'cover/components/atoms/Flex';
import Checkmark from 'cover/components/atoms/svg/Checkmark';
import { useGlobalContext, GlobalContextType } from 'cover/container';
import styles from 'cover/styles';
import { UserType } from 'cover/talkn.cover';

export const hoverAnimationBoxShadow = 'shadow';
export const hoverAnimationBlur = 'blur';
export const hoverAnimationDefault = hoverAnimationBlur;
export type HoverAnimationType = typeof hoverAnimationBoxShadow | typeof hoverAnimationBlur;

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

const Mark: React.FC<{ label: string }> = ({ label }) => (
  <MarkContainer>
    <span className="label">{label}</span>
  </MarkContainer>
);

type Props = {
  user?: UserType;
  handleOnClick?: () => void;
  isSavedAnimation?: boolean;
  hoverAnimationType?: HoverAnimationType;
  fullWidth?: boolean;
};

const Component: React.FC<Props> = ({
  user = {},
  handleOnClick,
  isSavedAnimation,
  hoverAnimationType = hoverAnimationDefault,
  fullWidth = true,
}) => {
  const { innerWidth, innerHeight }: GlobalContextType = useGlobalContext();
  const [isHover, setIsHover] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const controlHeight = getControlHeight(innerWidth, innerHeight);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <Container>
      <Background
        email={user.email}
        image={user.bg}
        isHover={isHover}
        hoverAnimationType={hoverAnimationType}
        controlHeight={controlHeight}
        fullWidth={fullWidth}
      />
      {didMount && (
        <Body
          className="EyeCatchMainBody"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleOnClick && handleOnClick}
          fullWidth={fullWidth}
          flow="row nowrap"
          alignItems="center"
          justifyContent="center"
          controlHeight={controlHeight}>
          <ProfileContent className="ProfileContent" flow="row nowrap" alignItems="flex-start" justifyContent="flex-start">
            <UserIcon email={user.email} image={user.icon} />
            <Flex className="userData" flow="column nowrap" sideMargin sidePadding>
              <div className="name">{user.name}</div>
              <div className="age">AGE: {util.getAgeByBirthday(user.birthday)}</div>
              <Flex className="userTags" flow="row wrap" upperMargin>
                {user &&
                  user.hasSelfTags &&
                  Object.keys(user.hasSelfTags).map((key) => user.hasSelfTags[key] && <Mark key={key} label={key} />)}
              </Flex>
              <Flex className="selfIntro" flow="row wrap" upperMargin>
                Self Introduction Text......
              </Flex>
            </Flex>
          </ProfileContent>
          {isSavedAnimation && <Checkmark />}
        </Body>
      )}
    </Container>
  );
};

export default Component;

const Container = styled.section`
  display: contents;
`;

type BackgroundPropsType = {
  email: string;
  isHover: boolean;
  hoverAnimationType: HoverAnimationType;
  controlHeight: number;
  fullWidth: boolean;
  image?: string;
};

const Background = styled.div<BackgroundPropsType>`
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: ${(props) => (props.fullWidth ? `${styles.eyeCatchVwValue}vw` : '100%')};
  height: ${(props) => props.controlHeight}px;
  min-height: ${styles.eyeCatchMinHeightPxValue}px;
  background-size: cover;
  background-image: url(${(props) => getBackgroundImage({ email: props.email, image: props.image })});
  background-position: center;
  color: ${styles.whiteColor};
  opacity: 1;
  box-shadow: ${(props) => getBoxShadow(props)};
  transition: ${styles.transitionDuration}ms;
  transform: ${(props) => getBackgroundTransform(props)};
  :before {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: ' ';
    backdrop-filter: ${(props) => getBackdropFilter(props)};
    transition: ${styles.transitionDuration}ms;
  }

  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    height: ${styles.eyeCatchVhValue}vh;
    min-height: unset;
  }
`;

type BodyPropsType = {
  controlHeight: number;
  fullWidth: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
};

const Body = styled(Flex)<BodyPropsType>`
  width: ${(props) => (props.fullWidth ? `${styles.eyeCatchVwValue}vw` : '100%')};
  height: ${(props) => props.controlHeight}px;
  min-height: ${styles.eyeCatchMinHeightPxValue}px;
  margin-top: -${(props) => props.controlHeight}px;
  z-index: ${styles.zIndex.eyeCatch};
  cursor: pointer;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    height: ${styles.eyeCatchVhValue}vh;
    min-height: unset;
  }
`;

const ProfileContent = styled(Flex)`
  width: 100%;
  max-width: ${styles.appWidth}px;
  margin-left: 5%;
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
    font-size: 20px;
  }

  .selfIntro {
    font-size: 20px;
  }

  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    align-items: center;
    margin-left: 5vw;
    font-weight: 300;
    .userData {
      padding: 0;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 10px;
    }

    .name {
      font-weight: 500;
      font-size: 25px;
    }

    .age {
      font-size: 12px;
    }

    .userTags {
      margin-left: -${styles.baseMargin}px;
      font-size: 12px;
    }

    .selfIntro {
      font-size: 12px;
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

const MarkContainer = styled.div`
  background: ${styles.themeColor};
  padding: ${styles.basePadding}px ${styles.basePadding * 2}px;
  margin-right: ${styles.doubleMargin}px;
  color: ${styles.whiteColor};
  border-radius: 30px;
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

const getBackgroundTransform = (props: BackgroundPropsType): string => {
  if (props.isHover) {
    if (props.hoverAnimationType === hoverAnimationBlur) {
      return `scale(1.03)`;
    } else if (props.hoverAnimationType === hoverAnimationBoxShadow) {
      return `scale(1)`;
    } else {
      return `scale(1)`;
    }
  } else {
    return 'scale(1)';
  }
};

const getBackdropFilter = (props: BackgroundPropsType): string => {
  if (props.isHover) {
    return `blur(2px) brightness(0.7)`;
  } else {
    return `blur(0) brightness(1)`;
  }
};

const getBoxShadow = (props: BackgroundPropsType): string => {
  if (props.isHover && props.hoverAnimationType === hoverAnimationBoxShadow) {
    return styles.shadowHorizonBase;
  } else {
    return `none`;
  }
};
