import { BoxLayoutPropsType } from '../entity/BoxLayout';
import { ContentProps } from '../entity/Content';
import { OnHandleType } from '../entity/OnHandle';
import { ReactOptionsType } from '../entity/Options';

export type FlexBoxLayoutPropsType = {
  display?: string;
  flow?: string;
  alignItems?: string;
  justifyContent?: string;
  select?: boolean;
  pointer?: boolean;
};

type AltType = 'upper' | 'bottom' | 'upper right' | 'upper left' | 'bottom right' | 'bottom left';
export type AltPropsType =
  | undefined
  | string
  | {
      label: string;
      type: AltType;
    };

export type CorePropsType = {
  children?: React.ReactNode;
  ref?: any;
  id?: string;
  className?: string;
  src?: string;
  href?: string;
  htmlFor?: string;
  select?: boolean;
  pointer?: boolean;
  alt?: AltPropsType;
  mouted?: (elm: HTMLElement) => void;
};

export type Props = CorePropsType & OnHandleType & BoxLayoutPropsType & FlexBoxLayoutPropsType & ContentProps & ReactOptionsType;
export type InteractiveProps = CorePropsType & OnHandleType & BoxLayoutPropsType & FlexBoxLayoutPropsType & ContentProps & ReactOptionsType;

export type FlexesOptionType = {
  width?: string;
  height?: string;
  clientWidth?: number;
  clientHeight?: number;
};
