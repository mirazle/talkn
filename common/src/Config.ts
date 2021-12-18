export type CreatorsIndexType = {
  title: string;
  eyeCatch: string;
  creator: string;
  no?: number;
};

export type ConfigType = {
  version: string;
  css: string;
  creatorsIndex: CreatorsIndexType[];
  userCategoryChs: string[];
  iamTags: string[];
  relationTags: string[];
};

export const configInit: ConfigType = {
  version: '1.0.0',
  css: '',
  creatorsIndex: [],
  userCategoryChs: [],
  iamTags: [],
  relationTags: [],
};
