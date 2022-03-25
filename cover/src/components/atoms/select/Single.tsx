import React from 'react';
import styled from 'styled-components';

import { getNoSelectOption, noSelectOptionLabel } from 'cover/components/atoms/select';
import styles from 'cover/styles';

import { InputCss } from './common';

type Props = {
  name: string;
  value: string;
  children: React.ReactNode[];
  disabled?: boolean;
  label?: string;
  width?: string;
  noSelectOption?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};

const Component: React.FC<Props> = ({
  name,
  value,
  className = 'Select',
  disabled = false,
  noSelectOption = false,
  width = 'auto',
  onChange,
  children,
}) => {
  const handleOnChange = (e) => {
    const value = e.target.value === noSelectOptionLabel ? '' : String(e.target.value);
    onChange && onChange(value);
  };
  return (
    <Container className={className} name={name} onChange={handleOnChange} disabled={disabled} value={value} width={width}>
      {noSelectOption && getNoSelectOption()}
      {children}
    </Container>
  );
};

export default Component;

type ContainerType = {
  width: string;
};

const Container = styled.select<ContainerType>`
  ${InputCss};
  width: ${(props) => props.width};
  margin: 0 ${styles.baseMargin}px ${styles.baseMargin}px 0;
`;
