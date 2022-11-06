import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import styles from 'cover/styles';

const ThemeGreen = 'green';
const ThemeDark = 'dark';
type ThemeTypes = typeof ThemeGreen | typeof ThemeDark;
type Props = {
  label: string;
  className?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  href?: string;
  theme?: ThemeTypes;
};

const Labels: FunctionComponent<{ label: string }> = (props) => {
  return (
    <>
      <label>{props.label}</label>
      <div className="lamp">&nbsp;</div>
    </>
  );
};

const Button: FunctionComponent<Props> = (props) => {
  return (
    <button onClick={(e) => props.onClick && props.onClick(e)}>
      <Labels label={props.label} />
    </button>
  );
};

const Anchor: FunctionComponent<Props> = (props) => {
  return (
    <a href={props.href}>
      <Labels label={props.label} />
    </a>
  );
};

const Content: FunctionComponent<Props> = (props) => {
  return props.href ? <Anchor {...props} /> : <Button {...props} />;
};

const BoxList: FunctionComponent<Props> = (props) => {
  const addClassName = props.className ? props.className : '';
  const className = props.active ? `${addClassName} active` : addClassName;
  return (
    <Container key={props.label} theme={props.theme} className={className}>
      <Content {...props} />
    </Container>
  );
};

BoxList.defaultProps = {
  active: false,
  theme: ThemeGreen,
};

export default BoxList;

type ContainerPropType = {
  theme: ThemeTypes;
};

const Container = styled.li<ContainerPropType>`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 180px;
  height: 70px;
  padding: ${styles.basePadding}px;
  margin: ${styles.baseMargin}px;
  button {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: inherit;
    color: ${(props) => (props.theme === ThemeGreen ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)')};
    cursor: pointer;
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(255, 255, 255, 1)' : 'rgba(68, 68, 68, 1)')};
    border: 0;
    outline: 0;
    transition: ${styles.transitionDuration}ms;
  }
  a {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: inherit;
    padding: 15px;
    color: #ddd;
    cursor: pointer;
    transition: ${styles.transitionDuration}ms;
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(255, 255, 255, 1)' : 'rgba(68, 68, 68, 1)')};
    text-decoration: none;
  }
  a:hover,
  button:hover {
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(245, 245, 245, 1)' : 'rgba(98, 98, 98, 1)')};
  }
  .lamp {
    position: relative;
    width: 50%;
    max-width: 50px;
    height: 10px;
    max-height: 10px;
    cursor: pointer;
    background: ${(props) => (props.theme === ThemeGreen ? styles.markupColor : 'rgba(155, 155, 155, 1)')};
    border-radius: 10px;
    transition: ${styles.transitionDuration}ms;
  }
  label {
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;
  }

  &.active div.lamp {
    cursor: pointer;
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(79, 174, 159, 1)' : 'rgba(79, 174, 159, 1)')};
  }
`;
