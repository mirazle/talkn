export const configUserCategoryChLimit = 10;
export const configStoriesLimit = 10;
export type StoriesType = {
  title: string;
  eyeCatch: string;
  interview: string;
  ch?: string;
  no?: number;
};

export type ConfigType = {
  version: string;
  stories: StoriesType[];
  categoryChs: string[];
  favicon: string;
  ogpImage: string;
  iamTags: string[];
  relationTags: string[];
};

export const configInit: ConfigType = {
  version: '1.0.0',
  stories: [],
  categoryChs: [],
  favicon: '',
  ogpImage: '',
  iamTags: [],
  relationTags: [],
};

export const storiesInit: StoriesType = {
  title: '',
  eyeCatch: '',
  interview: '',
};
