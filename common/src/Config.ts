export const configUserCategoryChLimit = 10;
export const configCreatorsLimit = 10;
export type CreatorsIndexType = {
  title: string;
  eyeCatch: string;
  interview: string;
  no?: number;
};

export type ConfigType = {
  version: string;
  creatorsIndex: CreatorsIndexType[];
  userCategoryChs: string[];
  iamTags: string[];
  relationTags: string[];
};

export const configInit: ConfigType = {
  version: '1.0.0',
  creatorsIndex: [],
  userCategoryChs: [],
  iamTags: [],
  relationTags: [],
};

export const creatorsIndexInit: CreatorsIndexType = {
  title: '',
  eyeCatch: '',
  interview: '',
};
