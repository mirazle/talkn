import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import util from 'common/util';

import Checkmark from 'cover/components/atoms/svg/Checkmark';
import Flex, { FlexBoxLayoutPropsType, useFlexesContext, FlexesContextType } from 'cover/flexes';
import { GoogleSessionType } from 'cover/model/Google';
import User, { UserHasSelfTagsType } from 'cover/model/User';
import styles from 'cover/styles';

export const layoutTop = 'top';
export const layoutSearch = 'search';
export const layoutDefault = layoutTop;
export type LayoutType = typeof layoutTop | typeof layoutSearch;

export const hoverAnimationBoxShadow = 'shadow';
export const hoverAnimationBlur = 'blur';
export const hoverAnimationDefault = hoverAnimationBlur;
export type HoverAnimationType = typeof hoverAnimationBoxShadow | typeof hoverAnimationBlur;

const Mark: React.FC<{ label: string }> = ({ label }) => <MarkContainer className="mark">{label}</MarkContainer>;

type Props = {
  className?: string;
  user?: User;
  layout?: LayoutType;
  isSavedAnimation?: boolean;
  hoverAnimationType?: HoverAnimationType;
  fullWidth?: boolean;
  handleOnClick?: () => void;
};

const Component: React.FC<Props> = ({
  className = 'UserContent',
  user,
  layout = layoutDefault,
  isSavedAnimation,
  hoverAnimationType = hoverAnimationDefault,
  fullWidth = true,
  handleOnClick,
}) => {
  const { innerWidth, innerHeight }: FlexesContextType = useFlexesContext();
  const [isHover, setIsHover] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const controlHeight = getControlHeight(innerWidth, innerHeight);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <>
      <Background
        className={className}
        id={user.id}
        image={user.bg}
        isHover={isHover}
        hoverAnimationType={hoverAnimationType}
        controlHeight={controlHeight}
        fullWidth={fullWidth}
        pointer
        overflow="hidden"
        flow="row nowrap"
        alignItems="flex-start"
        justifyContent="flex-start"
      />
      {didMount && (
        <Body
          className="UserContentBody"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          isHover={isHover}
          hoverAnimationType={hoverAnimationType}
          onClick={handleOnClick && handleOnClick}
          fullWidth={fullWidth}
          pointer
          alignItems="center"
          justifyContent="center"
          controlHeight={controlHeight}>
          <ProfileContent
            className={`ProfileContent ${layout}`}
            flow="row wrap"
            alignItems="center"
            justifyContent="flex-start"
            id={user.id}
            image={user.icon}>
            <div className="userIcon" />
            <Flex className="userDataWrap" flow="column nowrap">
              <Flex className="userData" flow="column nowrap">
                <div className="name">{user.name}</div>
                <div className="age">AGE: {util.getAgeByBirthday(user.birthday)}</div>
              </Flex>
              <Flex className="userDetailData" flow="column nowrap">
                <Flex className="userTags" flow="row wrap" upperMargin>
                  {Object.keys(user.hasSelfTags).map((key) => user.hasSelfTags[key] && <Mark key={key} label={util.getHeadUpper(key)} />)}
                </Flex>
                <Flex className="selfIntro" flow="row wrap" upperMargin>
                  {user.description}
                </Flex>
              </Flex>
            </Flex>
          </ProfileContent>
          {isSavedAnimation && <Checkmark />}
        </Body>
      )}
    </>
  );
};

export default Component;

type BackgroundPropsType = {
  id: string;
  isHover: boolean;
  hoverAnimationType: HoverAnimationType;
  controlHeight: number;
  fullWidth: boolean;
  image?: string;
};

const Background = styled(Flex)<BackgroundPropsType>`
  width: ${(props) => (props.fullWidth ? `${styles.eyeCatchVwValue}vw` : '100%')};
  height: ${(props) => props.controlHeight}px;
  min-height: ${styles.eyeCatchMinHeightPxValue}px;
  max-height: ${styles.eyeCatchMinHeightPxValue}px;
  background-size: cover;
  background-image: ${(props) => getBackgroundImage({ id: props.id, image: props.image })};
  background-position: center;
  color: ${styles.whiteColor};
  opacity: 1;
  box-shadow: ${(props) => getBoxShadow(props)};
  transition: ${styles.transitionDuration}ms;
  transform: ${(props) => getBackgroundTransform(props)};
  :before {
    ${styles.beforeBlur};
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    height: ${styles.eyeCatchVhValue}vh;
    min-height: unset;
  }
`;

type BodyPropsType = {
  isHover: boolean;
  hoverAnimationType: HoverAnimationType;
  controlHeight: number;
  fullWidth: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
};

const Body = styled(Flex)<BodyPropsType>`
  overflow: hidden;
  width: ${(props) => (props.fullWidth ? `${styles.eyeCatchVwValue}vw` : '100%')};
  height: ${(props) => props.controlHeight}px;
  min-height: ${styles.eyeCatchMinHeightPxValue}px;
  margin-top: -${(props) => props.controlHeight}px;
  z-index: ${styles.zIndex.eyeCatch};
  cursor: pointer;
  backdrop-filter: ${(props) => getBackdropFilter(props)};
  transition: ${styles.transitionDuration}ms;
  transform: ${(props) => getBackgroundTransform(props)};
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: ${styles.eyeCatchVhValue}vh;
    min-height: unset;
  }
`;

type ProfileContentPropsType = {
  id: string;
  image: string;
} & FlexBoxLayoutPropsType;

const ProfileContent = styled(Flex)<ProfileContentPropsType>`
  width: 100%;
  min-width: unset;
  max-width: ${styles.appWidth}px;
  color: ${styles.whiteColor};
  .userDataWrap {
    flex: 1 1 auto;
  }
  .userIcon {
    flex: 1 1 120px;
    width: 120px;
    min-width: 120px;
    max-width: 120px;
    height: 120px;
    min-height: 120px;
    max-height: 120px;
    margin: 0 30px;
    background-size: cover;
    background-image: ${(props) => getBackgroundImage({ id: props.id, image: props.image })};
    background-position: center;
    border-radius: 50%;
  }
  .name {
    font-weight: 500;
    font-size: 175%;
  }
  .age {
    margin-top: ${styles.baseMargin}px;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    .userIcon {
      margin: 0 30px;
    }
    .name {
      font-weight: 400;
      font-size: 150%;
    }
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    align-items: center;
    font-weight: 300;
    .userDataWrap {
      display: contents;
    }
    .userIcon {
      flex: 1 1 60px;
      width: 60px;
      min-width: 60px;
      max-width: 60px;
      height: 60px;
      min-height: 60px;
      max-height: 60px;
      margin: 0 0 0 20px;
    }
    .userData {
      margin: 0 0 0 20px;
    }
    .userDetailData {
      margin: 0 0 0 20px;
    }
    .name {
      font-weight: 500;
      font-size: 150%;
    }
    .userTags {
      font-size: 90%;
    }
    .selfIntro {
      margin-top: ${styles.baseMargin}px;
      font-size: 90%;
    }
    .mark {
      padding: ${styles.basePadding / 2}px ${styles.doublePadding}px;
    }
  }
`;

const MarkContainer = styled(Flex)`
  background: ${styles.themeColor};
  padding: ${styles.basePadding}px ${styles.basePadding * 2}px;
  margin-right: ${styles.doubleMargin}px;
  color: ${styles.whiteColor};
  border-radius: 30px;
  line-height: 26px;
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

const getBackgroundImage = ({ id, image }) => {
  if (image && image !== '') {
    return `url(https://${conf.assetsCoverPath}${id}/${image}), url(https://${conf.assetsCoverPath}${image}) `;
  } else {
    return `https://${conf.assetsCoverPath}/${image}`;
  }
};

const getBackgroundTransform = (props: BodyPropsType | BackgroundPropsType): string => {
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

const getBackdropFilter = ({ isHover }): string => {
  if (isHover) {
    return `blur(3px) brightness(0.7)`;
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
