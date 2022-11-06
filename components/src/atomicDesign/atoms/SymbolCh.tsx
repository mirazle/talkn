import { css } from '@emotion/react';
import React from 'react';

type Props = {
  size?: string;
};

const SpinnerIcon: React.FC<Props> = ({ size = '60' }) => {
  return (
    <div css={styles.container}>
      <div css={styles.c} />
      <div css={styles.cSpace} />
      <div css={styles.cCircle1} />
      <div css={styles.cCircle2} />
      <div css={styles.h1} />
      <div css={styles.h2} />
      <div css={styles.h3} />
    </div>
  );
};

const styles = {
  container: css`
    display: flex;
    width: 46px;
    min-width: 46px;
    height: 46px;
    min-height: 46px;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    transform: translate(0, 0);
  `,
  c: css`
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    width: 44%;
    height: 44%;
    min-width: auto;
    min-height: auto;
    max-width: inherit;
    max-height: inherit;
    padding: 0px;
    margin: 0px;
    line-height: 1;
    list-style: none;
    user-select: none;
    text-decoration: none;
    vertical-align: baseline;
    border-collapse: collapse;
    border-spacing: 0px;
    border: 4px solid rgb(211, 211, 211);
    border-radius: 100%;
    z-index: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: absolute;
    top: 30%;
    left: 3%;
  `,
  cSpace: css`
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    width: 30%;
    height: 30%;
    min-width: auto;
    min-height: auto;
    max-width: inherit;
    max-height: inherit;
    padding: 0px;
    margin: 0px;
    line-height: 1;
    list-style: none;
    user-select: none;
    text-decoration: none;
    vertical-align: baseline;
    border-collapse: collapse;
    border-spacing: 0px;
    border: 0px;
    border-radius: 0px;
    z-index: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: absolute;
    top: 35%;
    left: 30%;
    background: rgb(245, 245, 245);
    transform: rotate(45deg);
  `,
  cCircle1: css`
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    width: 9%;
    height: 9%;
    min-width: auto;
    min-height: auto;
    max-width: inherit;
    max-height: inherit;
    padding: 0px;
    margin: 0px;
    line-height: 1;
    list-style: none;
    user-select: none;
    text-decoration: none;
    vertical-align: baseline;
    border-collapse: collapse;
    border-spacing: 0px;
    border: 0px;
    border-radius: 100%;
    z-index: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: absolute;
    top: 37%;
    left: 33%;
    background: rgb(211, 211, 211);
    transform: scale(1) translate(-32%, -60%);
  `,
  cCircle2: css`
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    width: 9%;
    height: 9%;
    min-width: auto;
    min-height: auto;
    max-width: inherit;
    max-height: inherit;
    padding: 0px;
    margin: 0px;
    line-height: 1;
    list-style: none;
    user-select: none;
    text-decoration: none;
    vertical-align: baseline;
    border-collapse: collapse;
    border-spacing: 0px;
    border: 0px;
    border-radius: 100%;
    z-index: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: absolute;
    top: 59%;
    left: 33%;
    background: rgb(211, 211, 211);
    transform: scale(1) translate(-7%, 30%);
  `,
  h1: css`
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    width: 10%;
    height: 43%;
    min-width: auto;
    min-height: auto;
    max-width: inherit;
    max-height: inherit;
    padding: 0px;
    margin: 0px;
    line-height: 1;
    list-style: none;
    user-select: none;
    text-decoration: none;
    vertical-align: baseline;
    border-collapse: collapse;
    border-spacing: 0px;
    border: 0px;
    border-radius: 23%;
    z-index: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: absolute;
    top: 30%;
    left: 53%;
    background: rgb(211, 211, 211);
  `,
  h2: css`
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    width: 10%;
    height: 43%;
    min-width: auto;
    min-height: auto;
    max-width: inherit;
    max-height: inherit;
    padding: 0px;
    margin: 0px;
    line-height: 1;
    list-style: none;
    user-select: none;
    text-decoration: none;
    vertical-align: baseline;
    border-collapse: collapse;
    border-spacing: 0px;
    border: 0px;
    border-radius: 23%;
    z-index: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: absolute;
    top: 30%;
    left: 79%;
    background: rgb(211, 211, 211);
  `,
  h3: css`
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    width: 36%;
    height: 9%;
    min-width: auto;
    min-height: auto;
    max-width: inherit;
    max-height: inherit;
    padding: 0px;
    margin: 0px;
    line-height: 1;
    list-style: none;
    user-select: none;
    text-decoration: none;
    vertical-align: baseline;
    border-collapse: collapse;
    border-spacing: 0px;
    border: 0px;
    border-radius: 0px;
    z-index: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: absolute;
    top: 47%;
    left: 53%;
    background: rgb(211, 211, 211);
  `,
};
export default SpinnerIcon;
