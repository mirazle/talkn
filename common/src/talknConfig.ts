export const configUserCategoryChLimit = 10;
export const configStoriesLimit = 10;
export type StoriesIndexType = {
  title: string;
  eyeCatch: string;
  interview: string;
  ch?: string;
  no?: number;
};

export type ConfigType = {
  version: string;
  storiesIndex: StoriesIndexType[];
  userCategoryChs: string[];
  favicon: string;
  ogpImage: string;
  iamTags: string[];
  relationTags: string[];
};

export const configInit: ConfigType = {
  version: '1.0.0',
  storiesIndex: [],
  userCategoryChs: [],
  favicon: '',
  ogpImage: '',
  iamTags: [],
  relationTags: [],
};

export const storiesIndexInit: StoriesIndexType = {
  title: '',
  eyeCatch: '',
  interview: '',
};
