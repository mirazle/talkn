import { HookProps } from 'components/container/Thread/GlobalContext';

export type Type = {
  screen: React.MutableRefObject<any>;
  footer: React.MutableRefObject<any>;
  posts: React.MutableRefObject<any>;
  postTextarea: React.MutableRefObject<any>;
  tuneInput: React.MutableRefObject<HTMLInputElement>;
  timelines: React.MutableRefObject<any>;
  menu: React.MutableRefObject<any>;
  detail: React.MutableRefObject<any>;
};

export const init: Type = {
  screen: { current: null },
  footer: { current: null },
  posts: { current: null },
  postTextarea: { current: null },
  tuneInput: { current: null },
  timelines: { current: {} },
  menu: { current: null },
  detail: { current: null },
};

export const dataset = {
  'stamp-id': 'stampid',
} as const;

export type DatasetType = valueOf<typeof dataset>;

export default (props: HookProps) => {};
