export const configUserCategoryChLimit = 10;
export const configCreatorsLimit = 10;
export type CreatorsIndexType = {
  title: string;
  eyeCatch: string;
  interview: string;
  ch?: string;
  no?: number;
};

export type ConfigType = {
  version: string;
  creatorsIndex: CreatorsIndexType[];
  userCategoryChs: string[];
  favicon: string;
  ogpImage: string;
  iamTags: string[];
  relationTags: string[];
};

export const configInit: ConfigType = {
  version: '1.0.0',
  creatorsIndex: [],
  userCategoryChs: [],
  favicon: '',
  ogpImage: '',
  iamTags: [],
  relationTags: [],
};

export const creatorsIndexInit: CreatorsIndexType = {
  title: '',
  eyeCatch: '',
  interview: '',
};
