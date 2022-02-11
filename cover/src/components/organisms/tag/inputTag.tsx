import React, { useState, useRef } from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import * as styles from 'cover/styles';

import { InputCss } from './common';

type Props = {
  name: string;
  label: string;
  dataId: string;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (uniqueId: string, label: string) => void;
};

const Component: React.FC<Props> = ({ name, label = '', dataId, onClick = () => {} }: Props) => {
  return <TagInput key={`SelectTag-${name}`} name={name} defaultValue={label} autoComplete="off" onClick={() => {}} data-id={dataId} />;
};

export default Component;

const TagInput = styled.input`
  ${InputCss};
  width: 26%;
  margin-bottom: ${styles.baseMargin}px;
`;
