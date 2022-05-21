import React from 'react';
import styled from 'styled-components';

import Flex from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  onClick: () => void;
  isEditable: boolean;
  isChangeUserTag: boolean;
};

const Component: React.FC<Props> = ({ onClick, isEditable, isChangeUserTag }) => {
  let label = 'EDIT';
  if (isChangeUserTag && isEditable) {
    label = 'SAVE';
  } else if (isEditable) {
    label = 'VIEW';
  }

  return (
    <Container onClick={onClick} isEditable={isEditable} isChangeUserTag={isChangeUserTag} sideMargin="small">
      {label}
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  isEditable: boolean;
  isChangeUserTag: boolean;
};

const Container = styled(Flex)<ContainerPropsType>`
  padding: ${styles.doublePadding}px;
  border-radius: 5px;
  cursor: pointer;
  transition: ${styles.transitionDuration}ms;
  ${(props) => getDesign(props)};
`;

const getDesign = (props: ContainerPropsType) => {
  if (props.isChangeUserTag && props.isEditable) {
    return `
      color: #fff;
      background: ${styles.saveColor};
      border: 1px solid ${styles.saveColor};
      :hover {
        box-shadow: ${styles.shadowHorizonBright};
      }
    `;
  } else if (props.isEditable) {
    return `
      color: #fff;
      background:  ${styles.tagBgColor};
      border: 1px solid ${styles.tagBgColor};
      :hover {
        color: #fff;
        background:  ${styles.tagBgColor};
        box-shadow: ${styles.shadowHorizonBright};
      }
    `;
  }
  return `
      color: #fff;
      background: ${styles.themeColor};
      border: 1px solid ${styles.themeColor};
      :hover {
        background: ${styles.themeColor};
        color: #fff;
        box-shadow: ${styles.shadowHorizonBright};
      }
    `;
};
